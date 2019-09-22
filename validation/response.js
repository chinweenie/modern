const Validator = require('validator');

module.exports = function validateResponseInput(data) {
    let errors = {};
    if (Validator.isEmpty(data.body)) {
        errors.body = 'Body field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}