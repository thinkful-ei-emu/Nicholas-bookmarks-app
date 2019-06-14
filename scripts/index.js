'use strict';
/* global  store, bookmarks, Api*/
// eslint-disable-next-line no-unused-vars

$(document).ready(function() {
  bookmarks.bindEventListeners();
  bookmarks.render();
  Api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarks.render();
    });
});