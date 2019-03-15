import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { Schema as NgAddOptions } from './schema';
import { addPackageToPackageJson } from '../utils/package';

const version = '^7.4.3';

const packages = [
  {name: '@ang-kit/http', version: version},
  {name: '@ang-kit/auth', version: version},
  {name: '@ang-kit/component', version: version},
  {name: '@ang-kit/util', version: version}
];

export default function (options: NgAddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.http) {
        addPackageToPackageJson(tree, packages[0].name, packages[0].version);
    }
    if (options.auth) {
        addPackageToPackageJson(tree, packages[1].name, packages[0].version);
    }
    if (options.component) {
        addPackageToPackageJson(tree, packages[2].name, packages[0].version);
    }
    if (options.util) {
        addPackageToPackageJson(tree, packages[3].name, packages[0].version);
    }

    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    return tree;
  };
}
