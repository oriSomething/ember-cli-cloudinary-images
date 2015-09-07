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

test('it works even when no environment set', function(assert) {
  initialize(registry, application);
  assert.ok('cloudinary-config:main' in registry.registrations);
});
