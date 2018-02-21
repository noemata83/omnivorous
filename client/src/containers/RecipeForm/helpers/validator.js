import { flattenForm } from './flattenForm';

export const validator = (formIsValid, form) => {
    const flattenedForm = flattenForm(form);
    return Object.values(flattenedForm).every(element => element.valid);
}