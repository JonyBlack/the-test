import {IFormsItem} from '../form-item.interface';

class AppSelectFormsComponent {
    private forms: IFormsItem[];
    private ngModel: string[];

    private hasAdd: boolean;
    private selectedForms: IFormsItem[];

    constructor(private $filter: angular.IFilterFunction) {

    }

    $onInit() {
        this.selectedForms = this.forms.filter((x: IFormsItem) => x.required);
        this.setHasAdd();
    }

    private setHasAdd(): void {
        this.hasAdd = true;
        const availavle: IFormsItem[] = this.$filter('uniqueSelected')(this.forms, this.selectedForms);
        this.add(availavle[0]);
    }

    private unsetHasAdd(): void {
        this.hasAdd = false;
    }

    private update(item: IFormsItem, index: number): void {
        this.selectedForms[index] = item;
        this.syncModel();
    }

    private add(item: IFormsItem): void {
        if (item) {
            this.selectedForms.push(item);
            this.unsetHasAdd();
            this.syncModel();
        }
    }

    private remove(item: IFormsItem): void {
        if (!item.required) {
            this.selectedForms = this.selectedForms.filter(x => item !== x);
            this.syncModel();
        }
    }

    private syncModel(): void {
        this.ngModel = this.selectedForms.map((item: IFormsItem) => item.formName);
    }
}

export class SelectForm implements angular.IComponentOptions {
    static readonly selector = 'selectForm';

    static readonly template = require('./select-forms.component.html');
    static readonly bindings = {
        forms: '<',
        ngModel: '='
    };
    static readonly controller = AppSelectFormsComponent;
}
