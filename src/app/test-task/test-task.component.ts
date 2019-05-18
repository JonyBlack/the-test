import {IFormsItem} from './form-item.interface';
import {formItems} from './test-task.form-items';

class AppComponent {
    private availableForms: IFormsItem[] = formItems;
    private selectedForms: string[] = ['Toyota', 'Mazda', 'Ford'];
}


export class TestTaskComponent implements angular.IComponentOptions {
    static readonly selector = 'testTask';

    static readonly template = require('./test-task.component.html');
    static readonly controller = AppComponent;
}
