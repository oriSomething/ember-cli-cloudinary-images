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

  /** @type {String} "facebook" / "gplus" / "twitter" / "twitter_name" */
  network: '',
  /** @type {String} User id in network */
  user: '',

  /** @type {String} */
  src: computed('namespace', 'network', 'user', 'allFilters', function() {
    const {
      namespace,
      network,
      user,
      allFilters
    } = this.getProperties('namespace', 'network', 'user', 'allFilters');

    /** Makes sure that unneeded request won't be happened */
    if (isEmpty(namespace) || isEmpty(network) || isEmpty(user)) {
      return null;
    }

    return `//res.cloudinary.com/${namespace}/image/${network}/${allFilters}${allFilters ? '/' : ''}${user}`;
  })
});
