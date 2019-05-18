import * as angular from 'angular';
/**
 * Import Application Modules
 */
import {module as testTaskModule} from './test-task/test-task.module';

export const moduleName =
    angular.module('application', [
        testTaskModule,
    ]).name;
