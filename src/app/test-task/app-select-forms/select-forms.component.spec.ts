import * as angular from 'angular';
import 'angular-mocks';
import {SelectForm} from './select-forms.component';
import {formItems} from '../test-task.form-items';
import {IFormsItem} from '../form-item.interface';
import {uniqueSelected} from '../unique-selected.filter';

describe('SelectForm component', () => {
    beforeEach(() => {
        angular
            .module('app', [])
            .component(SelectForm.selector, SelectForm)
            .filter('uniqueSelected', () => uniqueSelected);
        angular.mock.module('app');
    });

    it('should exist', angular.mock.inject(($componentController: any) => {
        const component = $componentController(SelectForm.selector, {}, {});

        expect(component).toBeDefined();
    }));

    it('should not excluded initial ngModel items after first filling form with requried items', angular.mock.inject(($componentController: any) => {
        // ford is not required in available list.
        // it should not be excluded after form will filling inital required values
        const bindings = {
            forms: formItems,
            ngModel: ['Toyota', 'Mazda', 'Ford'],
        };
        const component = $componentController(SelectForm.selector, {}, bindings);
        component.initialConcat();
        component.syncModel();
        expect(component.ngModel).toEqual([
            'Toyota',
            'Audi',
            'Mazda',
            'Ford',
        ]);
    }));

    it('should sync string[] names from IFormItems[] after add the item', angular.mock.inject(($componentController: any) => {
        const bindings = {
            forms: formItems,
            ngModel: ['Toyota', 'Mazda', 'Ford'],
        };
        const component = $componentController(SelectForm.selector, {}, bindings);
        component.initialConcat();
        component.syncModel();
        component.add(<IFormsItem>{formName: 'Suzuki', required: false});
        expect(component.ngModel).toEqual([
            'Toyota',
            'Audi',
            'Mazda',
            'Ford',
            'Suzuki',
        ]);
    }));

    it('should add next item with unique next available value after press (+)', angular.mock.inject(($componentController: any) => {
        const bindings = {
            forms: formItems,
            ngModel: ['Toyota', 'Mazda', 'Ford'],
        };
        const component = $componentController(SelectForm.selector, {}, bindings);
        component.initialConcat();
        component.syncModel();
        component.setHasAdd();
        expect(component.ngModel).toEqual([
            'Toyota',
            'Audi',
            'Mazda',
            'Ford',
            'Suzuki',
        ]);
    }));

    it('should remove the last item after press (x)', angular.mock.inject(($componentController: any) => {
        const bindings = {
            forms: formItems,
            ngModel: ['Toyota', 'Mazda', 'Ford'],
        };
        const component = $componentController(SelectForm.selector, {}, bindings);
        component.initialConcat();
        component.remove(<IFormsItem>{required: false, formName: 'Suzuki'});
        component.setHasAdd();

        expect(component.ngModel).toEqual([
            'Toyota',
            'Audi',
            'Mazda',
            'Ford',
            'Suzuki',
        ]);
    }));

    it('should not remove the last required item after press (x)', angular.mock.inject(($componentController: any) => {
        const bindings = {
            forms: formItems,
            ngModel: ['Toyota', 'Mazda', 'Ford'],
        };
        const component = $componentController(SelectForm.selector, {}, bindings);
        component.initialConcat();
        component.remove(<IFormsItem>{required: true, formName: 'Suzuki'});
        component.setHasAdd();

        expect(component.ngModel).toEqual([
            'Toyota',
            'Audi',
            'Mazda',
            'Ford',
            'Suzuki',
        ]);
    }));

    it('should update the item', angular.mock.inject(($componentController: any) => {
        const bindings = {
            forms: formItems,
            ngModel: ['Toyota', 'Mazda', 'Ford'],
        };
        const component = $componentController(SelectForm.selector, {}, bindings);
        component.initialConcat();
        component.update(<IFormsItem>{required: false, formName: 'Opel'}, 3);
        component.setHasAdd();

        expect(component.ngModel).toEqual([
            'Toyota',
            'Audi',
            'Mazda',
            'Opel',
            'Suzuki',
        ]);
    }));

    it('should not update the required item', angular.mock.inject(($componentController: any) => {
        const bindings = {
            forms: formItems,
            ngModel: ['Toyota', 'Mazda', 'Ford'],
        };
        const component = $componentController(SelectForm.selector, {}, bindings);
        component.initialConcat();
        component.update(<IFormsItem>{required: false, formName: 'Opel'}, 1);
        component.setHasAdd();

        expect(component.ngModel).toEqual([
            'Toyota',
            'Audi',
            'Mazda',
            'Ford',
            'Suzuki',
        ]);
    }));
});
