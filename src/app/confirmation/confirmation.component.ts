import { HttpClient } from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {concatMap, Subscription} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}
  isActivated: boolean = false;
  isTrying = true;
  routeSubsription: Subscription | undefined;


  ngOnInit(): void {
    this.routeSubsription = this.activatedRoute.paramMap
      .pipe(
        concatMap((params) => {
          const confirmString = params.get('confirmationString');
          return this.httpClient.get(
            `${environment.apiUrl}/rest/users/confirm/${confirmString}`
          );
        })
      )
      .subscribe({
        next: () => {
          this.isActivated = true;
        },
        error: () => {
          this.isActivated = false;
        },
        complete: () => {
          this.isTrying = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.routeSubsription?.unsubscribe();
  }
}
