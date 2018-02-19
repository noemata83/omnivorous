const validateForm = (formIsValid, form) => {
    for (let key in form) {
        if (Array.isArray(form[key])) {
            form[key].forEach(entry => {
                console.log("We're checking: ", entry);
                formIsValid = validateForm(formIsValid, entry) && formIsValid;
                console.log("And the form is: ", formIsValid);
            });
        } else {
            formIsValid = form[key].valid && formIsValid;        
            console.log("Is it valid?: ", formIsValid);
        }
    }
    return formIsValid;
}

export default validateForm;