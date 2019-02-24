import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../../projects/ang-kit/http/src/http/http.service';

@Component({
  templateUrl: './service.component.html',
})
export class ServiceComponent implements OnInit {
  constructor(
    private httpService: HttpService
  ) {}
  ngOnInit() {
    this.httpService.get('/api', {params1: '1', params2: '2'}).subscribe(res => {
    });
  }
}
