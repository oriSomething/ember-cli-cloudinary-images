import Ember from 'ember';
const { computed, inject, typeOf } = Ember;


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
   * @return {String}                               URL for image
   */
  compute() {
    console.log(JSON.stringify(arguments, null, 2)) ;
    return this.get('cloudinary').computeUrl(arguments) ;
  }
});
