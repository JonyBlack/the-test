import {IFormsItem} from './form-item.interface';

export function uniqueSelected(availableForms: IFormsItem[], selectedForms: IFormsItem[], selectedItem: IFormsItem = null) {
    if (selectedForms) {
        return availableForms.filter((item: IFormsItem) => {
            return (selectedItem != null && item === selectedItem)
                || !selectedForms.filter(x => item === x).shift();
        });
    }

    return availableForms;
}
