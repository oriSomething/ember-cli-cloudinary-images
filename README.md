# Ember-cli-cloudinary-images

This addon contains a helper to get images URLs from [Cloudinary](http://cloudinary.com/) easy.
Made by [HappySale](http://www.happysale.com/)

## Installation

* `ember install:addon ember-cli-cloudinary-images`

Required Ember version `2.1.0` and above


## Usage

After installation:
- use the helper `{{cloudinary-url}}` to generate images URLs
- for ease, set `CLOUDINARY` config inside Application environment file

inside `environment.js`:
```js
module.exports = function(environment) {
  var ENV = {
    // ···
    CLOUDINARY: {
      CLOUD_NAME: '···', // "cloud name" in Cloudinary
      SECURE: true, // use https?
      DOMAIN: '···', // dedicated domain if exists
      SUB_DOMAIN: '···', // dedicated sub-domain if exists
      CDN_DISTRIBUTION: false // use CDN distribution if needed
    }
  }
  // ···
};

```

using helper:
```handlebars

It will resolve to the image URL in Cloudinary:
<img src={{cloudinary-url "publicId"}}>

For resized image, use `width` and/or `height` for resizing:
<img src={{cloudinary-url "publicId" width="155" height="50"}}>

For using transforms, use the transforms attribute:
<img src={{cloudinary-url "publicId" transforms="c_fill"}}>

For getting twitter user's avatar:
<img src={{cloudinary-url "iamdevloper" type="twitter_name"}}>

Don't forget! you can unbound:
<img src={{unbound (cloudinary-url "publicId")}}>

```

### Full properties list

- `cloudName` - account name in Cloudinary
- `width` - for resize the image's width
- `height` - for resize the image's height
- `version` - for choosing version of the asset
- `domain` - for choosing dedicated domain if exists
- `subDomain` - for choosing dedicated sub-domain if exists
- `cdnDistribution` - for choosing if it will distribute between CDNs. default to `false`
- `secure` for choosing between `http` to `https`. default to `true`
- `resourceType` - default to `image`
- `type` - the repository of images. default to `upload` but can be replaced with `facebook`, `twitter`, `twitter_name` and so
- `format` - the image file format
- `transforms` - transforms that may apply


### Deprecations

The components `{{c-img}}` and `{{c-avatar}}` where deprecate for using the helper `{{cloudinary-url}}`.

The main reason is for having the ability to `unbound` for performance gains. But the side effects are:
- using images inside `SVG`s
- adding links to the full size images

__NOTE:__ the attributes where change to be more compline with Cloudinary's terminology.

New API:
```handlebars
Old:
{{c-img media="publicId"}}
{{c-avatar network="twitter_name" user="iamdevloper"}}

New:
<img src={{cloudinary-url "publicId"}}>
<img src={{cloudinary-url "iamdevloper" type="twitter_name"}}>

Better:
<img src={{unbound (cloudinary-url "publicId")}}>
<img src={{unbound (cloudinary-url "iamdevloper" type="twitter_name")}}>

```
