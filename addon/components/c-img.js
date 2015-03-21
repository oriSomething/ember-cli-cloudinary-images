import Ember from 'ember';
import layout from '../templates/components/c-img';
const {
  computed,
  typeOf,
  isEmpty
} = Ember;

/** @type {String} Default filters if unset */
export const DEFAULT_FILTERS = 'f_auto';

/** @type {Ember.Component} */
export default Ember.Component.extend({
  layout: layout,
  /** @type {Array} HTML attributes binding */
  attributeBindings: ['width', 'height', 'src', 'alt'],
  /** @type {String} The HTML Tag */
  tagName: 'img',

  /** @type {String|Null} Null to prevent empty value in HTML attribute */
  alt: null,
  /** @type {String|Null} Null to prevent 0 value in HTML attribute */
  width: null,
  /** @type {String|Null} Null to prevent 0 value in HTML attribute */
  height: null,

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
  /** @type {String} The media id in Cloudinary */
  media: '',

  /**
   * The filters combined with with and height filters. Combined to a string as
   * needed in the URL
   *
   * @property allFilters
   * @type {String}
   */
  allFilters: computed('filters', 'h', 'w', function() {
    const { h, w } = this.getProperties('h', 'w');
    let filters = this.get('filters') || '';

    if (typeOf(filters) === 'array') {
      filters = filters.join(',');
    }

    if (w > 0) { filters = `${filters},w_${w}`; }
    if (h > 0) { filters = `${filters},h_${h}`; }

    return filters;
  }),

  /** @type {String} HTML src attribute */
  src: computed('account', 'namespace', 'media', 'allFilters', function() {
    const {
      account,
      namespace,
      media,
      allFilters
    } = this.getProperties('account', 'namespace', 'media', 'allFilters');

    /** Makes sure that unneeded request won't be happened */
    if (isEmpty(namespace) || isEmpty(account) || isEmpty(media)) {
      return null;
    }

    return `//res.cloudinary.com/${account}/image/${namespace}/${allFilters}${allFilters ? '/' : ''}${media}`;
  })
});
