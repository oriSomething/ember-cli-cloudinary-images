import Ember from 'ember';
import CloudinaryImageMixin from 'ember-cli-cloudinary-images/mixins/cloudinary-image';
import { module, test } from 'qunit';

module('mixin:cloudinary-image');

test('it works', function(assert) {
  var CloudinaryImageObject = Ember.Object.extend(CloudinaryImageMixin);
  var subject = CloudinaryImageObject.create();
  assert.ok(subject);
});

test('allFilters identical to filters', function(assert) {
  assert.expect(1);

  var subject = Ember.Object.extend(CloudinaryImageMixin).create();

  subject.set('filters', 'fl_progressive,c_fill');

  assert.equal(subject.get('allFilters'), 'fl_progressive,c_fill');
});

test('allFilters can handle array filters', function(assert) {
  assert.expect(1);

  var subject = Ember.Object.extend(CloudinaryImageMixin).create();
  subject.set('filters', ['c_fill' , 'fl_progressive']);

  assert.equal(subject.get('allFilters'), 'c_fill,fl_progressive');
});

test('allFilters includes w and h', function(assert) {
  assert.expect(1);

  var subject = Ember.Object.extend(CloudinaryImageMixin).create();
  subject.setProperties({
    filters: 'fl_progressive',
    w: 100,
    h: 50
  });

  assert.equal(subject.get('allFilters'), 'fl_progressive,w_100,h_50');
});
