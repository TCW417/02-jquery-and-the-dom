'use strict';

// Builds a sorted array of the values of keyName from the object array objArray.
// This is is a fill-in function for what eventually will be calls to a SQL
// database.
// Returns sorted array of string values.
function selectAll(keyName, objArray) {
  let set = [];
  objArray.forEach(function(obj) {
    if (!set.includes(obj[keyName])) set.push(obj[keyName]);
  });
  return set.sort();
}

// Build's select drop-down html given an array of values, a name for the select,
// and a label (text) for the first element (value will be null).
// Returns a jQ object that is the select statement html.
function buildSelect(values, name, zeroValue) {
  let $select = $('<select>');
  $select.attr('name',name);
  $('<option>').val('null').text(zeroValue).appendTo($select);
  values.forEach(function(value){
    $('<option>').val(value).text(value).appendTo($select);
  });
  return $select;
}

// Adds select statement based on keyName (from articles obj array) to body > header
function addSelectToHeader(keyName) {
  let cat = selectAll(keyName, articles);
  let $sel = buildSelect(cat, keyName, `Select ${keyName}`);
  $('body > header').append($sel);
}

// on select change callback. sets other menu back to it's null value
function selectCallBack() {
  console.log($(this).val());
  console.log($(this).attr('name'));
  if ($(this).attr('name') === 'author') {
    $('select[name="category"]').val('null');
  } else {
    $('select[name="author"]').val('null');
  }
}

function addSelectMenus() {
  addSelectToHeader('author');
  addSelectToHeader('category');
  $('select[name="author"]').on('change', selectCallBack);
  $('select[name="category"]').on('change', selectCallBack);
}

// create teasers. Hide all but first paragraph of each article and all images.
function hideSiblingParagraphs() {
  $('.article-body p').not(':first-child').hide();
  $('.article-body p img').hide();
}