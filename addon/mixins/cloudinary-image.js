import Ember from 'ember';
const { computed, typeOf } = Ember;

/** @type {String} Default filters if unset */
export const DEFAULT_FILTERS = 'f_auto';

/** @type {Ember.Mixin} */
export default Ember.Mixin.create({
  /** @type {String} */
  namespace: '',
  /** @type {String|Null} Null to prevent 0 value in HTML attribute */
  width: null,
  /** @type {String|Null} Null to prevent 0 value in HTML attribute */
  height: null,
  /** @type {String|Number} */
  h: 0,
  /** @type {String|Number} */
  w: 0,
  /** @type {String|Array} */
  filters: DEFAULT_FILTERS,

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
  })
});
