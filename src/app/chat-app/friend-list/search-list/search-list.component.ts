import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { concatMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FriendListComponent } from '../friend-list.component';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchListComponent implements OnInit {
  result: User | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private parent: FriendListComponent
  ) {}

  ngOnInit(): void {
    const getUserPipe = this.activatedRoute.paramMap.pipe(
      concatMap((path) => {
        const username = path.get('username');
        const params = new HttpParams().set('username', username as string);
        return this.httpClient.get(`${environment.apiUrl}/rest/users`, {
          params,
        });
      })
    );
    getUserPipe
      .pipe(
        concatMap((val: any) => {
          this.result = val;
          return this.httpClient.get(
            `${environment.apiUrl}/rest/users/avatar/${val.id}`
          );
        })
      )
      .subscribe({
        next: (val: any) => {
          if (this.result) {
            this.result.avatar = val.content;
          }
        },
        error: () => {
          this.result = undefined;
          setTimeout(() => {
            this.parent.mode = 'friend';
            this.router.navigateByUrl('/app/f');
          }, 700);
        },
      });
  }
}
