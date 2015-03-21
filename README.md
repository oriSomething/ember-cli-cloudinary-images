# Ember-cli-cloudinary-images

This addon contains components to make the usage of images from [Cloudinary](http://cloudinary.com/) easy. Made by [HappySale](http://www.happysale.com/)

## Installation

* `ember install:addon ember-cli-cloudinary-images`

## Usage

After installation you have new components: `{{c-img}}` and `{{c-avatar}}`.

The way it can be used:

```handlebars
It will automatically resolve to the right image URL
{{c-img namespace='happysale' media='cdn/common/logo'}}

For resized image, use `w` for width and `h` for height
{{c-img namespace='happysale' w='100' media='cdn/common/logo'}}

For using filters, use the filters attribute
{{c-img namespace='happysale' filters='c_fill' media='cdn/common/logo'}}
```

For getting user profile image use `{{c-avatar}}` component:

```handlebars
{{c-avatar namespace='happysale' network='twitter_name' user='iamdevloper'}}
```

Because usually there is only one Cloudinary account in used, you can create `initializer` for that:
```javascript
import CloudinaryImageMixin from 'ember-cli-cloudinary-images/mixins/cloudinary-image';

export function initialize() {
  CloudinaryImageMixin.reopen({ namespace: 'happysale' });
}

export default {
  name: 'cloudinary',
  initialize: initialize
};
```
