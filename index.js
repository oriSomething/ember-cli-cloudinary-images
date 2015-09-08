/* jshint node: true */
'use strict';

var assign = require('object-assign');

module.exports = {
  name: 'ember-cli-cloudinary-images',

  config: function(environment, appConfig) {
    var CLOUDINARY = appConfig.CLOUDINARY || {};

    return {
      CLOUDINARY: assign({
        /** For future support */
        API_KEY: '',
        /** The user in Cloudinary */
        CLOUD_NAME: '',
        /** Used for private CDN or as for sub-domain for given domain */
        SUB_DOMAIN: '',
        /** The domain of the account if exists (default to shared domain of Cloudinary) */
        DOMAIN: '',
        /** Use HTTPs or HTTP. The default is HTTPs */
        SECURE: true,
        /** Use distributions CDN (example: https://res-[1-5].cloudinary.com) */
        CDN_DISTRIBUTION: false,
        /** Transforms for concatenation with given transforms */
        CONCATENATED_TRANSFORMS: [],
        /** Default transforms that can be override */
        DEFAULT_TRANSFORMS: [],
        /** Default images file extensions */
        DEFAULT_IMAGE_FORMAT: 'jpg'
      }, CLOUDINARY)
    };
  }
};
