import * as angular from 'angular';
import {uniqueSelected} from './unique-selected.filter';
import {TestTaskComponent} from './test-task.component';
import {SelectForm} from './app-select-forms/select-forms.component';


export const module =
    angular
        .module('app', [])

        .filter('uniqueSelected', () => uniqueSelected)

        .component(TestTaskComponent.selector, TestTaskComponent)
        .component(SelectForm.selector, SelectForm)
        .name;
