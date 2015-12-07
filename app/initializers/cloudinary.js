import config from '../config/environment';

export function initialize(application) {
  /** @constant {Object} Config from environment */
  const CLOUDINARY = config.CLOUDINARY || {};

  application.register('cloudinary-config:main', CLOUDINARY, { instantiate: false });
  application.inject('service:cloudinary', 'config', 'cloudinary-config:main');
}

export default {
  name: 'cloudinary',
  initialize
};
