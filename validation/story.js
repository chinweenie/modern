const Validator = require('validator');

module.exports = function validateStoryInput(data) {
    let errors = {};
    console.log(data);
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    };

    if (Validator.isEmpty(data.body)) {
        errors.body = 'Body field is required';
    };

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}