import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('markdown-to-html', 'MarkdownToHtmlComponent', {
  // specify the other units that are required for this test
  needs: ['component:markdown-to-html']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject(assert);
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  assert.equal(component._state, 'inDOM');
});

test('it produces markdown', function(assert) {
  assert.expect(2);

  var component = this.subject();
  this.append();

  Ember.run(function() {
    component.set('markdown', '##Hello, [world](#)');
  });

  var expectedHtml = '<h2 id="helloworld">Hello, <a href="#">world</a></h2>';

  assert.equal(component.get('html').toString(), expectedHtml);
  assert.equal(component.$().html().toString().trim(), expectedHtml);
});

test('it inserts <br> tag', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.append();

  Ember.run(function() {
    component.set('markdown', 'foo  \nbar');
  });

  var expectedHtml = '<p>foo <br />\nbar</p>';

  assert.equal(component.get('html').toString(), expectedHtml);
});
