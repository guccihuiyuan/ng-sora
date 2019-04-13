import {Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {ACLCanType} from './acl.interface';
import {ACLService} from './acl.service';

@Directive({ selector: '[acl]' })
export class ACLDirective implements OnDestroy {
  private _value: ACLCanType;
  private _change$: Subscription;

  @Input('acl')
  set acl(value: ACLCanType) {
    this.set(value);
  }

  @Input('acl-ability')
  set ability(value: ACLCanType) {
    this.set(this.srv.parseAbility(value));
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private srv: ACLService) {
    this._change$ = this.srv.change.subscribe(() => this.set(this._value));
  }

  private set(value: ACLCanType) {
    if (this.srv.can(value)) {
      this.el.nativeElement.style.display = 'run-in';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
    this._value = value;
  }

  ngOnDestroy(): void {
    this._change$.unsubscribe();
  }
}
