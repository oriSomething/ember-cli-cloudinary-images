import Ember from 'ember';
const { get, merge } = Ember;
import { moduleFor, test } from 'ember-qunit';
import { CLOUDINARY_DOMAIN, CLOUDINARY_SUB_DOMAIN } from 'ember-cli-cloudinary-images/services/cloudinary';


moduleFor('service:cloudinary', 'Unit | Service | cloudinary', {});

test('cloudName is what set in config.CLOUD_NAME', function(assert) {
  const service = this.subject();
  service.set('config', {
    CLOUD_NAME: 'cloud-tester'
  });
  const cloudName = get(service, 'cloudName');

  assert.equal(cloudName, 'cloud-tester');
});

test('domain is what set in config.DOMAIN', function(assert) {
  const service = this.subject();
  service.set('config', {
    DOMAIN: 'hello.com'
  });
  const domain = get(service, 'domain');

  assert.equal(domain, 'hello.com');
});

test('domain returns by default cloudinary.com', function(assert) {
  const service = this.subject();
  const domain = get(service, 'domain');

  assert.equal(domain, CLOUDINARY_DOMAIN);
});

test('subDomain is what set in config.SUB_DOMAIN', function(assert) {
  const service = this.subject();
  service.set('config', {
    SUB_DOMAIN: 'hello'
  });
  const subDomain = get(service, 'subDomain');

  assert.equal(subDomain, 'hello');
});

test('subDomain is default to `res` when domain is cloudinary.com', function(assert) {
  const service = this.subject();
  service.set('config', {
    DOMAIN: 'cloudinary.com'
  });
  const subDomain = get(service, 'subDomain');

  assert.equal(subDomain, CLOUDINARY_SUB_DOMAIN);
});

test('secure is what set in config.SECURE', function(assert) {
  const service = this.subject();

  service.set('config', { SECURE: true });
  assert.ok(get(service, 'secure'), 'secure is true');

  service.set('config', { SECURE: false });
  assert.notOk(get(service, 'secure'), 'secure is false');
});

test('cdnDistribution is what set in config.CDN_DISTRIBUTION', function(assert) {
  const service = this.subject();

  service.set('config', { CDN_DISTRIBUTION: true });
  assert.ok(get(service, 'cdnDistribution'), 'cdnDistribution is true');

  service.set('config', { CDN_DISTRIBUTION: false });
  assert.notOk(get(service, 'cdnDistribution'), 'cdnDistribution is false');
});

test('publicIdURLPrefix()', function(assert) {
  const DEFAULTS = Object.freeze({
    cloudName: 'happysale',
    subDomain: '',
    domain: '',
    cdnDistribution: false,
    secure: true
  });
  const props = function props(obj) {
    return merge(merge({}, DEFAULTS), obj);
  };
  const service = this.subject();
  let result;


  result = service.publicIdURLPrefix('', props({
    cloudName: 'happysale'
  }));
  assert.equal(result, 'https://res.cloudinary.com/happysale', 'cloudName is in the end of the path and equal to happysale');

  result = service.publicIdURLPrefix('', props({
    cloudName: ''
  }));
  assert.equal(result, '', 'result empty for no cloudName');

  result = service.publicIdURLPrefix('', props({
    secure: false
  }));
  assert.equal(result, 'http://res.cloudinary.com/happysale', 'secure false to http');

  result = service.publicIdURLPrefix('', props({
    subDomain: 'happysalesub'
  }));
  assert.equal(result, 'https://happysalesub-res.cloudinary.com', 'subDomain works for cloudinary.com');

  result = service.publicIdURLPrefix('', props({
    domain: 'domain.com',
    subDomain: 'happysalesub'
  }));
  assert.equal(result, 'https://happysalesub.domain.com', 'subDomain works non cloudinary domain');

  result = service.publicIdURLPrefix('', props({
    cdnDistribution: true
  }));
  assert.equal(result, 'https://res-1.cloudinary.com/happysale', 'cdnDistribution works for `cloudinary/cloud-name with empty public_id`');

  result = service.publicIdURLPrefix('0', props({
    cdnDistribution: true
  }));
  assert.equal(result, 'https://res-5.cloudinary.com/happysale', 'cdnDistribution works for `cloudinary/cloud-name with pbulic_id=0`');

  result = service.publicIdURLPrefix('', props({
    cdnDistribution: true,
    subDomain: 'happysalesub'
  }));
  assert.equal(result, 'https://a1.happysalesub-res.cloudinary.com', 'cdnDistribution works for private sub domain');

  result = service.publicIdURLPrefix('', props({
    cdnDistribution: true,
    domain: 'domain.com',
    subDomain: 'happysalesub'
  }));
  assert.equal(result, 'https://a1.happysalesub.domain.com', 'cdnDistribution works for domain');
});
