const validateForm = (formIsValid, form) => {
    for (let key in form) {
        console.log(key);
        if (Array.isArray(form[key])) {
            form[key].forEach(entry => {
                console.log(entry);
                formIsValid = validateForm(formIsValid, entry) && formIsValid;
                console.log(formIsValid);
            });
        } else {
            formIsValid = form[key].valid && formIsValid;        
            console.log(formIsValid);
        }
    }
    return formIsValid;
}

export default validateForm;