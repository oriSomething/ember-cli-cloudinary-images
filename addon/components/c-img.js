import Ember from 'ember';
import layout from '../templates/components/c-img';
const {
  computed,
  deprecate,
  typeOf,
  isEmpty
} = Ember;

/** @type {String} Default filters if unset */
export const DEFAULT_FILTERS = 'f_auto';

/** @type {Ember.Component} */
export default Ember.Component.extend({
  layout: layout,

  init() {
    this._super(...arguments);

    deprecate(
      'Using {{c-img}} or {{c-avatar}} was deprecated in favor of {{cloudinary-url}} helper',
      false,
      {
        id: 'ember-cli-cloudinary-images.deprecated-components',
        until: '0.6.0',
        url: 'https://github.com/oriSomething/ember-cli-cloudinary-images#deprecations'
      }
    );
  },

  /** @type {Array} HTML attributes binding */
  attributeBindings: ['width', 'height', 'src', 'alt', 'title'],
  /** @type {String} The HTML Tag */
  tagName: 'img',

  /** @type {String|Null} Null to prevent empty value in HTML attribute */
  alt: null,
  /** @type {String|Null} Null to prevent empty value in HTML attribute */
  title: null,
  /** @type {Number|Null} Null to prevent 0 value in HTML attribute */
  width: null,
  /** @type {Number|Null} Null to prevent 0 value in HTML attribute */
  height: null,

  /** @type {String} Protocol: HTTP or HTTPS or empty */
  protocol: '',
  /** @type {String} The user's domain for Cloudinary images if exists */
  cdn: '',
  /** @type {String} The user's account name in Cloudinary */
  account: '',
  /** @type {String} The source of image. "upload" or social networks such as "facebook" */
  namespace: 'upload',
  /** @type {String|Array} */
  filters: DEFAULT_FILTERS,
  /** @type {String|Number} */
  h: 0,
  /** @type {String|Number} */
  w: 0,
  /** @type {String} Version of media */
  version: '',
  /** @type {String} The public id in Cloudinary */
  media: '',

  /**
   * The filters combined with with and height filters. Combined to a string as
   * needed in the URL
   *
   * @property allFilters
   * @type {String}
   */
  allFilters: computed('filters', 'h', 'w', {
    get() {
      const { h, w } = this.getProperties('h', 'w');
      let filters = this.get('filters') || '';

      if (typeOf(filters) === 'array') {
        filters = filters.join(',');
      }

      if (w > 0) { filters = `${filters},w_${w}`; }
      if (h > 0) { filters = `${filters},h_${h}`; }

      return filters;
    }
  }),

  /** @type {String} HTML src attribute */
  src: computed('protocol', 'cdn', 'account', 'namespace', 'version', 'media', 'allFilters', {
    get() {
      const {
        protocol,
        cdn,
        account,
        namespace,
        media,
        version,
        allFilters
      } = this.getProperties('protocol', 'cdn', 'account', 'namespace', 'version', 'media', 'allFilters');

      /** Makes sure that unneeded request won't be happened */
      if (isEmpty(namespace) || (isEmpty(account) && isEmpty(cdn)) || isEmpty(media)) {
        return null;
      }

      /** @type {String} URL's domain */
      const domain = isEmpty(cdn) ? 'res.cloudinary.com' : cdn;

      return `${protocol}${protocol ? ':' : ''}//` +
        `${domain}${cdn ? '' : '/' + account}/image/` +
        `${namespace}` +
        `${allFilters ? '/' : ''}${allFilters}` +
        `${version ? '/v' : ''}${version}/${media}`;
    }
  })
});
