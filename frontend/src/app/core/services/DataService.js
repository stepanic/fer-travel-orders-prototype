/**
 * Generic data service to interact with Sails.js backend. This will just
 * wrap $sailsSocket methods to a single service, that is used from application.
 *
 * This is needed because we need to make some common url handling for sails
 * endpoint.
 */
(function() {
    'use strict';

    angular.module('frontend.core.services')
        .factory('DataService',
            [
                '$sailsSocket',
                '_',
                'BackendConfig',
                'Storage',
                function(
                    $sailsSocket,
                    _,
                    BackendConfig,
                    Storage
                ) {
                    function _getAuthHeadersAsParams() {
                        return {
                            username: Storage.get('username'),
                            password: Storage.get('password')
                        };
                    }
                    /**
                     * Helper function to get "proper" end point url for sails backend API.
                     *
                     * @param   {string}    endPoint        Name of the end point
                     * @param   {number}    [identifier]    Identifier of endpoint object
                     *
                     * @returns {string}
                     * @private
                     */
                    function _parseEndPointUrl(endPoint, identifier) {
                        if (!_.isUndefined(identifier)) {
                            endPoint = endPoint + '/' + identifier;
                        }

                        return BackendConfig.url + '/api/' + endPoint;
                    }

                    /**
                     * Helper function to parse used parameters in 'get' and 'count' methods.
                     *
                     * @param   {{}}    parameters  Used query parameters
                     *
                     * @returns {{params: {}}}
                     * @private
                     */
                    function _parseParameters(parameters) {
                        parameters = parameters || {};
                        parameters.headers = _getAuthHeadersAsParams();
                        return {params: parameters};
                    }

                    return {
                        /**
                         * Service method to get count of certain end point objects.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {{}}        parameters  Used query parameters
                         *
                         * @returns {Promise|*}
                         */
                        'count': function getCount(endPoint, parameters) {
                            return $sailsSocket
                                .get(_parseEndPointUrl(endPoint) + '/count/', _parseParameters(parameters));
                        },

                        /**
                         * Service method to get data from certain end point. This will always return a collection
                         * of data.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {{}}        parameters  Used query parameters
                         *
                         * @returns {Promise|*}
                         */
                        'collection': function getCollection(endPoint, parameters) {
                            return $sailsSocket
                                .get(_parseEndPointUrl(endPoint), _parseParameters(parameters));
                        },

                        /**
                         * Service method to get data from certain end point. This will return just a one
                         * record as an object.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {number}    identifier  Identifier of endpoint object
                         * @param   {{}}        parameters  Used query parameters
                         *
                         * @returns {Promise|*}
                         */
                        'fetch': function fetchObject(endPoint, identifier, parameters) {
                            return $sailsSocket
                                .get(_parseEndPointUrl(endPoint, identifier), _parseParameters(parameters));
                        },

                        /**
                         * Service method to create new object to specified end point.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {{}}        data        Data to update
                         *
                         * @returns {Promise|*}
                         */
                        'create': function createObject(endPoint, data) {
                            data.headers = _getAuthHeadersAsParams();
                            return $sailsSocket
                                .post(_parseEndPointUrl(endPoint), data);
                        },

                        /**
                         * Service method to update specified end point object.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {number}    identifier  Identifier of endpoint object
                         * @param   {{}}        data        Data to update
                         *
                         * @returns {Promise|*}
                         */
                        'update': function updateObject(endPoint, identifier, data) {
                            data.headers = _getAuthHeadersAsParams();
                            return $sailsSocket
                                .put(_parseEndPointUrl(endPoint, identifier), data);
                        },

                        /**
                         * Service method to delete specified object.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {number}    identifier  Identifier of endpoint object
                         *
                         * @returns {Promise|*}
                         */
                        'delete': function deleteObject(endPoint, identifier) {
                            return $sailsSocket
                                .delete(_parseEndPointUrl(endPoint, identifier));
                        }
                    };
                }
            ]
        );
}());
