import {isDefined} from './helpers';

import hex from 'crypto-js/enc-hex';
import md5 from 'crypto-js/md5';
import merge from 'lodash-amd/merge';
import querystring from 'querystring';

export default class HttpClient {
    constructor(client, baseUrl) {
        this._client = client;
        this._baseUrl = baseUrl || 'https://ws.audioscrobbler.com/2.0/';
    }

    get(method, options) {
        options = merge({
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
            this._baseUrl + '?' + querystring.encode(options.params)
        ).then(function(response) {
            // TODO check status code
            return response.json();
        });
    }

    post(method, options) {
        options = merge({
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
            body: querystring.encode(options.params)
        }).then(function(response) {
            // TODO check status code
            return response.json();
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
        return md5(signature).toString(hex);
    }
}
