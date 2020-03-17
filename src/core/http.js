import Hex from 'crypto-js/enc-hex';
import Md5 from 'crypto-js/md5';
import Merge from 'lodash-amd/merge';
import QueryString from 'querystring';

import {ApiError, NetworkError} from './errors';
import {isDefined} from './helpers';


export default class HttpClient {
    constructor(client, baseUrl) {
        this._client = client;
        this._baseUrl = baseUrl || 'https://ws.audioscrobbler.com/2.0/';
    }

    get(method, options) {
        options = Merge({
            params: {},

            authenticated: false,
            sessionKey: this._client.getSessionKey()
        }, options || {});

        options.signed = isDefined(options.signed) ?
            options.signed :
            options.authenticated;

        // Set request parameters
        options.params['api_key'] = this._client.key;
        options.params['format'] = 'json';
        options.params['method'] = method;

        if(options.authenticated) {
            // Add session key
            if(!isDefined(options.sessionKey)) {
                throw new Error('Missing required "sessionKey" parameter');
            }

            options.params['sk'] = options.sessionKey;
        }

        if(options.signed) {
            // Generate signature
            options.params['api_sig'] = this._generateSignature(options.params);
        }

        // Send request
        return fetch(
            this._baseUrl + '?' + QueryString.encode(options.params)
        ).then(function(response) {
            return response.json().catch((err) => {
                if(!response.ok) {
                    throw new NetworkError(response);
                }

                return Promise.reject(err);
            }).then((data) => {
                if(!response.ok) {
                    throw new ApiError(response, data);
                }

                return data;
            });
        });
    }

    post(method, options) {
        options = Merge({
            params: {},

            authenticated: false,
            sessionKey: this._client.getSessionKey()
        }, options || {});

        options.signed = isDefined(options.signed) ?
            options.signed :
            options.authenticated;

        // Set request parameters
        options.params['api_key'] = this._client.key;
        options.params['format'] = 'json';
        options.params['method'] = method;

        if(options.authenticated) {
            // Add session key
            if(!isDefined(options.sessionKey)) {
                throw new Error('Missing required "sessionKey" parameter');
            }

            options.params['sk'] = options.sessionKey;
        }

        if(options.signed) {
            // Generate signature
            options.params['api_sig'] = this._generateSignature(options.params);
        }

        // Send request
        return fetch(this._baseUrl, {
            method: 'POST',
            body: QueryString.encode(options.params)
        }).then(function(response) {
            return response.json().then((data) => {
                if(!response.ok) {
                    throw new ApiError(response, data);
                }

                return data;
            }).catch((err) => {
                if(!response.ok) {
                    throw new NetworkError(response);
                }

                return Promise.reject(err);
            });
        });
    }

    _generateSignature(params) {
        var signature = '';

        // Append parameters
        var value;

        Object.keys(params).sort().forEach((key) => {
            if(key === 'format') {
                return;
            }

            // Retrieve value
            value = params[key];

            if(typeof value === 'undefined' || value === null) {
                value = '';
            }

            // Append parameter
            signature += key + value;
        });

        // Append client secret
        signature += this._client.secret;

        // Generate hash
        return Md5(signature).toString(Hex);
    }
}
