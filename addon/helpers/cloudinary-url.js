import Ember from 'ember';
const { inject } = Ember;


export default Ember.Helper.extend({
  cloudinary: inject.service(),

  /**
   * @method compute
   * @param  {String}          [publicId]           Public id of image in Cloudinary
   * @param  {String}          hash.format          File extension)
   * @param  {String}          hash.cloudName
   * @param  {(String|Number)} hash.width
   * @param  {(String|Number)} hash.height
   * @param  {(String|Number)} hash.version
   * @param  {String}          hash.domain
   * @param  {String}          hash.subDomain
   * @param  {Boolean}         hash.cdnDistribution
   * @param  {Boolean}         hash.secure
   * @param  {String}          hash.type
   * @param  {String[]}        hash.transforms
   * @return {String}          URL for image
   */
  compute([publicId] = [], hash = {}) {
    /** @validation */
    if ( !publicId ) {
      return '' ;
    }
    return this.get('cloudinary').getURL(publicId, hash) ;
  }
});
