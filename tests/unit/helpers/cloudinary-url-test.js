import { moduleFor, test } from 'ember-qunit';


moduleFor('helper:cloudinary-url', 'Unit | Helper | cloudinary url', {
  needs: [
    'service:cloudinary'
  ],

  beforeEach() {
    this.cloudinaryService = this.container.lookup('service:cloudinary');
    this.cloudinaryService.set('config', {
        CLOUD_NAME: 'happysale',
        SUB_DOMAIN: '',
        DOMAIN: '',
        SECURE: true,
        CDN_DISTRIBUTION: false
    });
  }
});

test('return empty sting for empty public id', function(assert) {
  const cloudinaryURL = this.subject();

  assert.strictEqual(cloudinaryURL.compute([]), '', 'undefined');
  assert.strictEqual(cloudinaryURL.compute(['']), '', 'empty string');
});

test('only basic config', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id']);

  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/public-id');
});

test('override cloudName', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id'], {
    cloudName: 'hello'
  });

  assert.strictEqual(result, 'https://res.cloudinary.com/hello/image/upload/public-id');
});

test('sub-domain', function(assert) {
  this.cloudinaryService.set('config.SUB_DOMAIN', 'subsub');
  const cloudinaryURL = this.subject();
  let result;

  result = cloudinaryURL.compute(['public-id'], {});
  assert.strictEqual(result, 'https://subsub-res.cloudinary.com/image/upload/public-id', 'config');

  result = cloudinaryURL.compute(['public-id'], {
    subDomain: 'sababa'
  });
  assert.strictEqual(result, 'https://sababa-res.cloudinary.com/image/upload/public-id', 'attribute');
});

test('domain', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id'], {
    domain: 'domdom.co.il',
    subDomain: 'sababa'
  });

  assert.strictEqual(result, 'https://sababa.domdom.co.il/image/upload/public-id');
});

test('domain config', function(assert) {
  this.cloudinaryService.set('config.SUB_DOMAIN', 'sababa');
  this.cloudinaryService.set('config.DOMAIN', 'domdom.co.il');
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id']);

  assert.strictEqual(result, 'https://sababa.domdom.co.il/image/upload/public-id');
});

test('cdnDistribution config', function(assert) {
  this.cloudinaryService.set('config.CDN_DISTRIBUTION', true);
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id']);

  assert.strictEqual(result, 'https://res-5.cloudinary.com/happysale/image/upload/public-id');
});

test('cdnDistribution', function(assert) {
  const cloudinaryURL = this.subject();
  this.cloudinaryService.set('config.CDN_DISTRIBUTION', false);
  const result = cloudinaryURL.compute(['public-id'], {
    cdnDistribution: true
  });

  assert.strictEqual(result, 'https://res-5.cloudinary.com/happysale/image/upload/public-id');
});

test('cdnDistribution and sub-domain', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id'], {
    cdnDistribution: true,
    subDomain: 'happysub'
  });

  assert.strictEqual(result, 'https://a5.happysub-res.cloudinary.com/image/upload/public-id');
});

test('cdnDistribution and domain', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id'], {
    cdnDistribution: true,
    domain: 'happysale.com',
    subDomain: 'images'
  });

  assert.strictEqual(result, 'https://a5.images.happysale.com/image/upload/public-id');
});

test('width transform', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id'], {
    width: 50
  });

  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/w_50/public-id');
});

test('height transform', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id'], {
    height: 60
  });

  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/h_60/public-id');
});

test('transforms', function(assert) {
  const cloudinaryURL = this.subject();
  let result;

  result = cloudinaryURL.compute(['public-id'], {
    transforms: 'c_fill'
  });
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill/public-id', 'string');

  result = cloudinaryURL.compute(['public-id'], {
    transforms: ['c_fill']
  });
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill/public-id', 'array');

  result = cloudinaryURL.compute(['public-id'], {
    transforms: ['c_fill', 'c_fit']
  });
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill,c_fit/public-id', 'array with multi result');
});

test('transforms + width + height', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['public-id'], {
    width: 50,
    height: 400,
    transforms: ['c_fill', 'c_fit']
  });

  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/h_400,w_50,c_fill,c_fit/public-id');
});

test('default transforms', function(assert) {
  const cloudinaryURL = this.subject();
  let result;

  this.cloudinaryService.set('config.DEFAULT_TRANSFORMS', 'c_fill');
  result = cloudinaryURL.compute(['public-id']);
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill/public-id', 'string');

  this.cloudinaryService.set('config.DEFAULT_TRANSFORMS', ['c_fill']);
  result = cloudinaryURL.compute(['public-id']);
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill/public-id', 'array');

  this.cloudinaryService.set('config.DEFAULT_TRANSFORMS', ['c_fill', 'c_fit']);
  result = cloudinaryURL.compute(['public-id']);
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill,c_fit/public-id', 'array with multi strings');
});

test('concatenated transforms', function(assert) {
  const cloudinaryURL = this.subject();
  let result;

  this.cloudinaryService.set('config.CONCATENATED_TRANSFORMS', 'c_fill');
  result = cloudinaryURL.compute(['public-id']);
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill/public-id', 'string');

  this.cloudinaryService.set('config.CONCATENATED_TRANSFORMS', ['c_fill']);
  result = cloudinaryURL.compute(['public-id']);
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill/public-id', 'array');

  this.cloudinaryService.set('config.CONCATENATED_TRANSFORMS', ['c_fill', 'c_fit']);
  result = cloudinaryURL.compute(['public-id']);
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill,c_fit/public-id', 'array with multi strings');
});

test('concatenated transforms + transforms', function(assert) {
  const cloudinaryURL = this.subject();
  let result;

  this.cloudinaryService.set('config.CONCATENATED_TRANSFORMS', 'c_fill');
  result = cloudinaryURL.compute(['public-id'], {
    transforms: 'c_fit'
  });
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill,c_fit/public-id', 'attributes');

  this.cloudinaryService.set('config.CONCATENATED_TRANSFORMS', 'c_fill');
  this.cloudinaryService.set('config.DEFAULT_TRANSFORMS', 'c_fit');
  result = cloudinaryURL.compute(['public-id'], {});
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/c_fill,c_fit/public-id', 'config');
});

test('format', function(assert) {
  const cloudinaryURL = this.subject();
  let result;

  this.cloudinaryService.set('config.DEFAULT_IMAGE_FORMAT', 'svg');
  result = cloudinaryURL.compute(['public-id']);
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/public-id.svg', 'config');

  result = cloudinaryURL.compute(['public-id'], {
    format: 'jpeg'
  });
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/upload/public-id.jpeg');
});

test('type', function(assert) {
  const cloudinaryURL = this.subject();
  const result = cloudinaryURL.compute(['iamdevloper'], {
    type: 'twitter_name'
  });
  assert.strictEqual(result, 'https://res.cloudinary.com/happysale/image/twitter_name/iamdevloper');
});
