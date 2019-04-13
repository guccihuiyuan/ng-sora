import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ACL, ACLCanType, ACLType} from './acl.interface';

@Injectable()
export class ACLService {
  /**
   * 角色
   */
  private _roles: string[] = [];
  /**
   * 权限
   */
  private _abilities: Array<number | string> = [];
  /**
   * 是否全量
   */
  private _full = false;
  /**
   * 通知器
   */
  private _aclChange: BehaviorSubject<ACL> = new BehaviorSubject<ACL>(
    null,
  );

  /**
   * 变更通知
   */
  get change(): Observable<ACL> {
    return this._aclChange.asObservable();
  }

  /**
   * 获取acl
   */
  get acl(): ACL {
    return {
      full: this._full,
      roles: this._roles,
      abilities: this._abilities
    };
  }

  /**
   * 设置acl（会先清除所有）
   */
  set(acl: ACL) {
    this._abilities = [];
    this._roles = [];
    this.add(acl);
    this._aclChange.next(acl);
  }

  /**
   * 设置是否全量
   */
  setFull(val: boolean) {
    this._full = val;
    this._aclChange.next(this.acl);
  }

  /**
   * 设置权限（会先清除所有）
   */
  setAbilities(abilities: Array<number | string>) {
    this.set({abilities: abilities});
  }

  /**
   * 设置角色（会先清除所有）
   */
  setRole(roles: string[]) {
    this.set({roles: roles});
  }

  /**
   * 附加角色
   */
  attachRoles(roles: string[]) {
    for (const val of roles) {
      if (!this._roles.includes(val)) {
        this._roles.push(val);
      }
    }
    this._aclChange.next(this.acl);
  }

  /**
   * 附加权限
   */
  attachAbilities(abilities: Array<number | string>) {
    for (const val of abilities) {
      if (!this._abilities.includes(val)) {
        this._abilities.push(val);
      }
    }
    this._aclChange.next(this.acl);
  }

  /**
   * 移除角色
   */
  removeRoles(roles: string[]) {
    for (const val of roles) {
      const idx = this._roles.indexOf(val);
      if (idx !== -1) {
        this._roles.splice(idx, 1);
      }
    }
    this._aclChange.next(this.acl);
  }

  /**
   * 移除权限
   */
  removeAbilities(abilities: Array<number | string>) {
    for (const val of abilities) {
      const idx = this._abilities.indexOf(val);
      if (idx !== -1) {
        this._abilities.splice(idx, 1);
      }
    }
    this._aclChange.next(this.acl);
  }

  /**
   * 当前用户是否有对应的权限
   */
  can(roleOrAbility: ACLCanType): boolean {
    if (this._full === true || !roleOrAbility) {
      return true;
    }

    let t: ACLType = {};
    if (typeof roleOrAbility === 'number') {
      t = { abilities: [roleOrAbility] };
    } else if (
      Array.isArray(roleOrAbility) &&
      roleOrAbility.length > 0 &&
      typeof roleOrAbility[0] === 'number'
    ) {
      t = { abilities: roleOrAbility };
    } else {
      t = this.parseACLType(roleOrAbility as string | string[] | ACLType);
    }

    if (t.roles) {
      if (t.mode === 'allOf') {
        return t.roles.every(v => this._roles.includes(v));
      } else {
        return t.roles.some(v => this._roles.includes(v));
      }
    }
    if (t.abilities) {
      if (t.mode === 'allOf') {
        return (t.abilities as any[]).every(v => this._abilities.includes(v));
      } else {
        return (t.abilities as any[]).some(v => this._abilities.includes(v));
      }
    }

    return false;
  }

  /**
   * 当前用户是否有对应权限点
   */
  canAbility(value: ACLCanType): boolean {
    return this.can(this.parseAbility(value));
  }

  parseAbility(value: ACLCanType): ACLCanType {
    if (typeof value === 'number' || typeof value === 'string' || Array.isArray(value)) {
      value = { abilities: Array.isArray(value) ? value : [value] } as ACLType;
    }
    delete value.roles;
    return value;
  }

  private parseACLType(val: string | string[] | ACLType): ACLType {
    if (typeof val !== 'string' && !Array.isArray(val)) {
      return val as ACLType;
    }
    if (Array.isArray(val)) {
      return { roles: val as string[] } as ACLType;
    }
    return {
      roles: [val],
    } as ACLType;
  }

  private add(acl: ACL) {
    // 是否全量
    if (acl.full !== null && acl.full !== undefined) {
      this._full = acl.full;
    }
    // 角色
    if (acl.roles && acl.roles.length > 0) {
      this._roles.push(...acl.roles);
    }
    // 权限
    if (acl.abilities && acl.abilities.length > 0) {
      this._abilities.push(...acl.abilities);
    }
  }
}
