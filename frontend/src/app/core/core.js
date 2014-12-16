/**
 * Angular module for 'core' component. This component is divided to following logical components:
 *
 *  frontend.core.services
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
    'use strict';

    // Define frontend.core module
    angular.module('frontend.core', [
        'frontend.core.services',
        'frontend.core.models',
        'frontend.core.libraries'
    ]);
}());
