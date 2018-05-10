'use strict';

let articles = [];

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.category = rawDataObj.category;
  this.publishedOn = rawDataObj.publishedOn;
  this.publishTime = `about ${parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000)} days ago`;
  this.body = rawDataObj.body;
}

$(function() {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(obj) {
    articles.push(new Article(obj));
  });

  let articleTemplateScript = $('#article-template').html();
  let articleTemplate = Handlebars.compile(articleTemplateScript);
  let compiledHtml = articleTemplate({articles});
  $('#articles').append(compiledHtml);

  addSelectMenus();
});