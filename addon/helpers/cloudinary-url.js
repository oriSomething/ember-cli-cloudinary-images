import Ember from 'ember';
const { computed, inject, typeOf } = Ember;


export default Ember.Helper.extend({
  cloudinary: inject.service(),

  /** @property {String[]} concatenatedTransforms */
  concatenatedTransforms: computed('cloudinary.config.CONCATENATED_TRANSFORMS', function() {
    // Protection from Strings
    const concatenatedTransforms = this.get('cloudinary.config.CONCATENATED_TRANSFORMS') || [];
    return Array.isArray(concatenatedTransforms) ? concatenatedTransforms : [concatenatedTransforms];
  }),
  /** @property {String[]} defaultTransforms */
  defaultTransforms: computed.readOnly('cloudinary.config.DEFAULT_TRANSFORMS'),
  /** @property {String} defaultImageFormat */
  defaultImageFormat: computed.readOnly('cloudinary.config.DEFAULT_IMAGE_FORMAT'),

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
  compute([publicId] = [], hash = {}) {
    /** @validation */
    if (!publicId) {
      return '';
    }

    let {
      cloudName,
      width,
      height,
      version,
      domain,
      subDomain,
      cdnDistribution,
      secure,
      resourceType,
      type,
      format,
      transforms
    } = hash;
    // Default params
    if (typeOf(resourceType) === 'undefined') { resourceType = 'image'; }
    if (typeOf(type) === 'undefined') { type = 'upload'; }
    if (typeOf(format) === 'undefined') { format = this.get('defaultImageFormat'); }
    if (typeOf(transforms) === 'undefined') { transforms = this.get('defaultTransforms'); }


    /** @type {String[]} Transforms to concatenate */
    const concatenatedTransforms = this.get('concatenatedTransforms');
    /** Convert transforms to array if the given param was string **/
    transforms = Array.isArray(transforms) ? transforms : transforms || [];
    /** Adds concatenated transforms **/
    transforms = concatenatedTransforms.concat(transforms);
    /** Adds width if exists **/
    transforms = width || width === 0 ? [`w_${width}`].concat(transforms) : transforms;
    /** Adds height if exists **/
    transforms = height || height === 0 ? [`h_${height}`].concat(transforms) : transforms;

    /** Encoding */
    publicId = encodeURIComponent(decodeURIComponent(publicId)).replace(/%3A/g, ":").replace(/%2F/g, "/");
    /** Add format if exists */
    publicId = format ? `${publicId}.${format}` : publicId;

    /** @type {Ember.Service} */
    const cloudinary = this.get('cloudinary');
    /** @type {String} */
    const urlPrefix = cloudinary.publicIdURLPrefix(publicId, {
      cloudName,
      subDomain,
      domain,
      cdnDistribution,
      secure
    });

    /** @type {String} Transforms in String form */
    const sTransforms = transforms.join(',');

    return (
      urlPrefix + '/' +
      `${resourceType}/${type}/` +
      (sTransforms ? sTransforms + '/' : '') +
      (version ? `v${version}/` : '') +
      publicId
    );
  }
});
