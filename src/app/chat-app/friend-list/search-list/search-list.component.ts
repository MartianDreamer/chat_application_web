import {HttpClient, HttpParams} from '@angular/common/http';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {concatMap, Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FriendListComponent} from '../friend-list.component';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchListComponent implements OnInit, OnDestroy, AfterViewInit {
  result: User | undefined;
  subscription: Subscription | undefined;
  addedUsername: string | undefined;
  loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private parent: FriendListComponent,
  ) {}

  ngAfterViewInit(): void {
    this.loading = false;
  }

  ngOnInit(): void {
    const getUserPipe = this.activatedRoute.paramMap.pipe(
      concatMap((path) => {
        const username = path.get('username');
        const params = new HttpParams().set('username', username as string);
        return this.httpClient.get(`${environment.apiUrl}/rest/users`, {
          params,
        });
      }),
    );
    this.subscription = getUserPipe
      .pipe(
        concatMap((val: any) => {
          this.result = val;
          return this.httpClient.get(
            `${environment.apiUrl}/rest/users/avatar/${val.id}`,
          );
        }),
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleAdd(username: string | undefined) {
    this.addedUsername = username;
  }
}
