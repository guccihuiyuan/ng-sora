## 特性

- 访问控制权限
- 细粒度控制

## 方法

- `set(acl: ACL): void`

- `acl(): ACL`

- `change(): Observable<ACL>`

- `setFull(val: boolean)`

- `setAbilities(abilities: Array<number | string>)`

- `setRole(roles: string[])`

- `attachRoles(roles: string[])`

- `attachAbilities(abilities: Array<number | string>)`

- `removeRoles(roles: string[])`

- `removeAbilities(abilities: Array<number | string>)`

- `can(roleOrAbility: ACLCanType): boolean`

- `canAbility(vvalue: ACLCanType): boolean`

## 注册
```angular
import {AngKitACLModule} from '@ang-kit/acl';

@NgModule({
  imports: [
    AngKitTokenModule
  ]
})
export class AppModule { }
```

## 使用
```angular
constructor(
    private aclService: ACLService
  ) {}
ngOnInit() {
    this.aclService.set({full: 'false', roles: [], abilities: []});
}
```

## ACL
```angular
export interface ACL {
  /**
   * 是否全量
   */
  full?: boolean;
  /**
   * 角色
   */
  roles?: string[];
  /**
   * 权限
   */
  abilities?: Array<number | string>;
}
```

## ACLType
```angular
/**
 * 可传入的配置信息
 */
export interface ACLType {
  /**
   * 校验模式，默认：`oneOf`
   * - `allOf` 表示必须满足所有角色或权限点数组算有效
   * - `oneOf` 表示只须满足角色或权限点数组中的一项算有效
   */
  mode?: 'allOf' | 'oneOf';
}
```
