import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../../../../projects/ang-kit/auth/src/token/token.service';

@Component({
  templateUrl: './token-service.component.html',
})
export class TokenServiceComponent implements OnInit {
  constructor(
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.tokenService.set({token: 'token'});
    this.tokenService.clear();
  }
}
