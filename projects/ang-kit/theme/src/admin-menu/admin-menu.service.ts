import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {share} from 'rxjs/operators';

import {AdminMenu} from './admin-menu.interface';

@Injectable()
export class AdminMenuService implements OnDestroy {
  /**
   * 通知器
   */
  private _notify$: BehaviorSubject<AdminMenu[]> = new BehaviorSubject<AdminMenu[]>([]);

  /**
   * 菜单
   */
  private _menus: AdminMenu[] = [];

  /**
   * 监听变化
   */
  get change(): Observable<AdminMenu[]> {
    return this._notify$.pipe(share());
  }

  /**
   * 设置
   * @param menus 菜单数据
   */
  add(menus: AdminMenu[]) {
    this._menus = menus;
    this.resume();
  }

  /**
   * 获取
   */
  get menus(): AdminMenu[] {
    return this._menus;
  }

  /**
   * 清空
   */
  clear() {
    this._menus = [];
    this._notify$.next(this._menus);
  }

  /**
   * 重制
   */
  resume() {
    this._notify$.next(this._menus);
  }

  ngOnDestroy(): void {
    this._notify$.unsubscribe();
  }
}
