export default (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "You must provide a value.";
    }

    return errors;
}