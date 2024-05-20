/**
 * @typedef {object} ApiError
 * @property {string} status - Status
 * @property {string} message - Error message
 */
class APIError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

export default APIError;
