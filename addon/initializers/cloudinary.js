export function initialize(container, application = {}) {
  /** @constant {Object} Config from environment */
  const CLOUDINARY = application.CLOUDINARY || {};

  application.register('cloudinary-config:main', CLOUDINARY, { instantiate: false });
  application.inject('service:cloudinary', 'config', 'cloudinary-config:main');
}

export default {
  name: 'cloudinary',
  initialize
};
