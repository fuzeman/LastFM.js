export class RequestError extends Error {
    constructor(response, message) {
        super(message);

        this.response = response;
        this.responseCode = response.status;
    }
}

export class ApiError extends RequestError {
    constructor(response, data) {
        super(response, data.message);

        this.code = data.error;
    }
}

export class NetworkError extends RequestError {
    constructor(response) {
        super(response, response.statusText || 'Unknown Error');
    }
}
