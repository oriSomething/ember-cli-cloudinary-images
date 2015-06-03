import Ember from 'ember';
import layout from '../templates/components/c-avatar';
import CImg from './c-img';
const {
  assert,
  computed
} = Ember;

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
  profile: computed('network', 'user', {
    get() {
      const { network, user } = this.getProperties('network', 'user');

      return Ember.A([network, user]);
    },

    set(key, value) {
      assert(`profile value is ${typeof value} instead of Array of String`, Ember.isArray(value));
      assert(`profile value.length is ${value.length} instead of 2`, value.length === 2);

      const [network, user] = value;

      this.setProperties({
        network,
        user
      });

      return this.get('profile');
    }
  })
});
