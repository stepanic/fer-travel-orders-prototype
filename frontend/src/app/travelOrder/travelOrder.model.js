/**
 * TravelOrder model
 */
(function() {
    'use strict';

    /**
     * Model for TravelOrder API
     */
    angular.module('frontend')
        .service('TravelOrderModel',
            [
                'ModelFactory',
                function(ModelFactory) {
                    // Endpoint definition for model
                    var endpoint = 'travelorder';

                    // Get model
                    var model = angular.copy(ModelFactory);

                    // Initialize model
                    model.setEndpoint(endpoint);

                    return model;
                }
            ]
        );
}());
