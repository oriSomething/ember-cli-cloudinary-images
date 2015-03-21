import Ember from 'ember';
import layout from '../templates/components/c-avatar';
import CImg from './c-img';
const { computed } = Ember;

/** @type {Ember.Component} */
export default CImg.extend({
  layout: layout,

  /**
   * The source of image. Override parent's.
   * Used for choosing social network.
   *
   * @property
   * @type {String}
   * @override
   */
  namespace: '',

  /** @type {String} "facebook" / "gplus" / "twitter" / "twitter_name" */
  network: computed.alias('namespace'),
  /** @type {String} User id in network */
  user: computed.alias('media'),
  /** @type {Array} User id in network */
  profile: computed('network', 'user', function(key, value) {
    /** Setter */
    if (Ember.isArray(value)) {
      this.setProperties({
        network: value[0],
        user: value[1]
      });
    }

    /** Getter */
    let { network, user } = this.getProperties('network', 'user');

    return Ember.A([network, user]);
  })
});
