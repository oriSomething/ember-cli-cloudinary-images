import Ember from 'ember';
const { run } = Ember;
import { initialize } from '../../../initializers/cloudinary';
import { module, test } from 'qunit';

let registry, application;

module('Unit | Initializer | cloudinary', {
  beforeEach() {
    run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  },

  afterEach() {
    run(application, 'destroy');
  }
});

test('it exists', function(assert) {
  initialize(registry, application);

  assert.ok('cloudinary-config:main' in registry.registrations);
});

test('there are default properties', function(assert) {
  initialize(registry, application);
  const config = application.__container__.lookup('cloudinary-config:main');

  assert.ok('API_KEY' in config, 'API_KEY exists in config');
  assert.ok('CDN_DISTRIBUTION' in config, 'CDN_DISTRIBUTION exists in config');
  assert.ok('CLOUD_NAME' in config, 'CLOUD_NAME exists in config');
  assert.ok('CONCATENATED_TRANSFORMS' in config, 'CONCATENATED_TRANSFORMS exists in config');
  assert.ok('DEFAULT_IMAGE_FORMAT' in config, 'DEFAULT_IMAGE_FORMAT exists in config');
  assert.ok('DEFAULT_TRANSFORMS' in config, 'DEFAULT_TRANSFORMS exists in config');
  assert.ok('DOMAIN' in config, 'DOMAIN exists in config');
  assert.ok('SECURE' in config, 'SECURE exists in config');
  assert.ok('SUB_DOMAIN' in config, 'SUB_DOMAIN exists in config');
});

