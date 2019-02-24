import { WorkspaceProject } from '@angular-devkit/core/src/workspace';
import { Rule, Tree } from '@angular-devkit/schematics';
import {
    addModuleImportToRootModule,
    getProjectFromWorkspace,
    getProjectMainFile,
    hasNgModuleImport
} from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

import { Schema } from '../schema';

const modulesMap: any = {
};

export function addRequiredModules(options: Schema): Rule {
    return (host: Tree) => {
        const workspace = getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);
        const appModulePath = getAppModulePath(host, getProjectMainFile(project));

        if (options.http) {
            modulesMap['AngKitHttpModule'] = '@ang-kit/http';
        }
        if (options.auth) {
            modulesMap['AngKitTokenModule.forRoot()'] = '@ang-kit/auth';
        }
        if (options.util) {
            modulesMap['AngKitUtilModule'] = '@ang-kit/util';
        }
        if (options.component) {
          modulesMap['AngKitComponentModule'] = '@ang-kit/component';
        }

        const allKeys = Object.keys(modulesMap);

        allKeys.forEach(key => {
            addModuleImportToApptModule(host, key, modulesMap[ key ], project, appModulePath);
        });

        return host;
    };
}

function addModuleImportToApptModule(host: Tree, moduleName: string, src: string, project: WorkspaceProject, appModulePath: string): void {
    if (hasNgModuleImport(host, appModulePath, moduleName)) {
        return;
    }
    addModuleImportToRootModule(host, moduleName, src, project);
}
