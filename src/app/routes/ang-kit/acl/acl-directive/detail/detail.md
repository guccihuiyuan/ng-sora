## 特性

- HTML指令，根据权限控制元素是否显示

## 使用
```angular
<button [acl]="'user'"></button>
<button [acl]="['user', 'manage']"></button>
<button [acl]="{ role: ['user', 'manage'], mode: 'allOf' }"></button>
<button [acl]="10"></button>
<button acl [acl-ability]="'USER-EDIT'"></button>
```
