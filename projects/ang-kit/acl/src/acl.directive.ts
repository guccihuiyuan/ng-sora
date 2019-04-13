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
    const CLS = 'acl__hide';
    const el = this.el.nativeElement;
    if (this.srv.can(value)) {
      this.renderer.removeClass(el, CLS);
    } else {
      this.renderer.addClass(el, CLS);
    }
    this._value = value;
  }

  ngOnDestroy(): void {
    this._change$.unsubscribe();
  }
}
