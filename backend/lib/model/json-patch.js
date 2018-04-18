/**
 * created on 18.04.2018
 */

const { validate, applyReducer } = require('fast-json-patch');
const { isEmpty, isObject, isArray, isNil } = require('lodash');

/**
 * Patchs a list of operations to a json object doc
 * @param {Object} doc the original json object to be applied the json patch operation
 * @param {Array} patch a list of json patch operation to be applied to the doc
 * @returns a new json document with the new changes
 */
const validateJsonPatch = (doc, patch) => validate(patch, doc);

/**
 * Patchs a list of operations to a json object doc
 * @param {Object} doc the original json object to be applied the json patch operation
 * @param {Array} patch a list of json patch operation to be applied to the doc
 * @returns a new json document with the new changes
 * @throws validation errors by the json patch library #see: https://www.npmjs.com/package/fast-json-patch
 */
module.exports = (doc, patch) => {
    if (isEmpty(doc) || !isObject(doc)) {
        const err = new Error();
        err.name = 'NullData';
        err.message = 'Please provide a valid original_json field. It seems to be empty or not a JSON object';
        err.level = 'error';
        err.status = 400;
        throw err;
    }
    if (isEmpty(patch) || !isArray(patch)) {
        const err = new Error();
        err.name = 'NullData';
        err.message = 'Please provide a valid json_patch field. It should be an Array of JSON objects';
        err.level = 'error';
        err.status = 400;
        throw err;
    }

    const isValid = validateJsonPatch(doc, patch);
    if (!isNil(isValid)) {
        const err = new Error();
        err.name = 'JsonPatchValidationError';
        err.message = 'Error occured while trying to validate your JSON patch operations and the original json object';
        err.level = 'error';
        err.status = 400;
        err.stack = isValid; // Actual errors that occured while validating the json patch //
        throw err;
    }

    return patch.reduce(applyReducer, doc);
};
