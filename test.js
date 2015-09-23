'use strong';

const noop = require('nop');
const requireBowerFiles = require('require-bower-files');
const test = require('tape');

function runTest(description, main) {
  test(description, t => {
    t.plan(10);

    t.equal(main.name, 'filteredArrayToSentence', 'should have a function name.');

    t.equal(
      main([Infinity, Object, Math.LOG10E], undefined, () => false),
      '',
      'should filter array elements by the filter function.'
    );

    t.equal(
      main(['foo', null, true, 1], Boolean),
      'foo (index: 0), true (index: 2) and 1 (index: 3)',
      'should create a human-readable string from more than three elements.'
    );

    t.equal(
      main(['foo', true], {}, () => true),
      'foo (index: 0) and true (index: 1)',
      'should create a human-readable string from two elements.'
    );

    t.equal(
      main(['foo'], null, () => true),
      'foo (index: 0)',
      'should create a human-readable string from a element.'
    );

    t.equal(
      main(['a', 'b', 'c'], {separator: '_', lastSeparator: '-'}, v => typeof v === 'string'),
      'a (index: 0)_b (index: 1)-c (index: 2)',
      'should change the separator words in response to the options.'
    );

    t.throws(
      () => main(),
      /TypeError.*undefined is not an array\. Expected an array to be filtered\./,
      'should throw a type error when it takes no arguments.'
    );

    t.throws(
      () => main({0: 'foo', 1: 'bar'}, noop),
      /TypeError.*\[object Object\] is not an array\. Expected an array to be filtered\./,
      'should throw a type error when the first argument is not an array.'
    );

    t.throws(
      () => main([1, 2], {separator: 1}, noop),
      /TypeError.*must be a string/,
      'should throw a type error when `separator` option is not a string.'
    );

    t.throws(
      () => main([1, 2], {lastSeparator: ['']}, noop),
      /TypeError.*must be a string/,
      'should throw a type error when `lastSeparator` option is not a string.'
    );
  });
}

runTest('require(\'filtered-array-to-sentence\')', require('.'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.filteredArrayToSentence', global.window.filteredArrayToSentence);
