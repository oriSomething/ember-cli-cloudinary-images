import Ember from 'ember';
import layout from '../templates/components/c-img';
import CloudinaryImageMixin from '../mixins/cloudinary-image';
const { computed, isEmpty } = Ember;

/** @type {Ember.Component} */
export default Ember.Component.extend(CloudinaryImageMixin, {
  layout: layout,
  attributeBindings: ['width', 'height', 'src', 'alt'],
  tagName: 'img',

  /**
   * @param namespace
   * @type {String}
   * @public
   */

  /**
   * @param allFilters
   * @type {String}
   * @public
   */

  /** @type {String} The media id in Cloudinary */
  media: '',

  /** @type {String} */
  src: computed('namespace', 'media', 'allFilters', function() {
    const {
      namespace,
      media,
      allFilters
    } = this.getProperties('namespace', 'media', 'allFilters');

    /** Makes sure that unneeded request won't be happened */
    if (isEmpty(namespace) || isEmpty(media)) {
      return null;
    }

    return `//res.cloudinary.com/${namespace}/image/upload/${allFilters}${allFilters ? '/' : ''}${media}`;
  })
});
