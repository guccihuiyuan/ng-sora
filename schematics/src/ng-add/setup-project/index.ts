import {chain, Rule} from '@angular-devkit/schematics';
import {Schema as NgAddOptions} from '../schema';
import {addRequiredModules} from './add-required-modules';

export default function (options: NgAddOptions): Rule {
    return chain([
        addRequiredModules(options),
    ]);
}
