import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './token-interceptor.component.html',
})
export class TokenInterceptorComponent implements OnInit {
  constructor(
    private httpClient: HttpClient
  ) {}
  ngOnInit() {
    this.httpClient.get('/tokenInterceptor').subscribe();
  }
}
