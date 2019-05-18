import {IFormsItem} from './form-item.interface';

class AppComponent {
    private availableForms: IFormsItem[] = [
        {formName: 'Suzuki', required: false},
        {formName: 'VAS', required: false},
        {formName: 'Ford', required: false},
        {formName: 'Toyota', required: true},
        {formName: 'Opel', required: false},
        {formName: 'Audi', required: true},
        {formName: 'BMW', required: false},
        {formName: 'Mazda', required: true},
        {formName: 'Kia', required: false},
        {formName: 'Nissan', required: false},
    ];
    private selectedForms: string[] = [];
}



export class TestTaskComponent implements angular.IComponentOptions {
    static readonly selector = 'testTask';

    static readonly template = require('./test-task.component.html');
    static readonly controller = AppComponent;
}
