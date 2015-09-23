/*!
 * filtered-array-to-sentence | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/filtered-array-to-sentence
*/
window.filteredArrayToSentence = function filteredArrayToSentence(arr, options, fn) {
  'use strict';

  if (fn === undefined) {
    fn = options;
    options = {};
  }

  return window.arrayToSentence(window.indexedFilter(arr, fn).map(function(el) {
    return String(el.value) + ' (index: ' + String(el.index) + ')';
  }), options);
};
