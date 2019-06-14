'use strict';
/* global  store, bookmarks, $, Api*/
// eslint-disable-next-line no-unused-vars

const bookmarks = (function () {

  function generateItemElement(item) {
    if (item.isCondensed !== false){
      return `<li class="js-bookmark-element bookmark-element" data-item-id="${item.id}">
          ${item.title}
          <br>
          <p>Rating:${item.rating}</p>
          <div class="bookmark-item-controls">
          <button class="js-item-condense" type="button">
              <span class="button-label">Expand<span>
          </button>
          <button class="js-item-delete" type="button">
              <span class="button-label">Delete<span>
          </button>
          </div>
          </li>
      `;
    }
    return `<li class="js-bookmark-element bookmark-element" data-item-id="${item.id}">
            ${item.title}  <span><a href="${item.url}">Visit Link</a></span>
            <p>Rating:${item.rating}</p>
            <p>${item.desc}</p>
            <div class="bookmark-item-controls">
            <button class="js-item-condense" type="button">
                <span class="button-label">Collapse<span>
            </button>
            <button class="js-item-delete" type="button">
                <span class="button-label">Delete<span>
            </button>
            </div>
            </li>
        `;
  }


  function generateBookmarksString(bookmarks) {
    const items = bookmarks.map((item) => generateItemElement(item));
    return items.join('');
  }


  function render() {
    // Filter item list if store prop is true by item.checked === false
    if (store.errorKey) {
      $('.error-message').append(`${store.errorKey} <br>`);
      $('.error-pop').removeClass('hidden');
    }
    $('.contain-bookmark-form').empty();
    if (store.isAdding){
      $('.contain-bookmark-form').append(
        `<form id="add-item-form">
          Title:
          <input type="text" id="title-input" name="title" required><br>
          Url:
          <input type="text" id="url-input" name="url" required><br>
          Rating:
          <input type="number" id="rating-input" min="1" max="5" required><br>
          Description:
          <input type="text" id="description-input" name="description" required><br>
          <button type="submit">Add to list</button>
      </form>`
      );
    
    }
    let items = [...store.items];


    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarksItemsString = generateBookmarksString(items);
    store.errorKey = '';

    // insert that HTML into the DOM
    $('.js-bookmarks').html(bookmarksItemsString);
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-bookmark-element')
      .data('item-id');
  }

  function expandBookmarkForm() {
    $('#add-bookmark-button-form').submit(event => {
      event.preventDefault();
      store.isAdding = !store.isAdding;
      render();
    });
  }

  function handleItemDelete() {
    $('.bookmarks').on('click', '.js-item-delete', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      Api.deleteItem(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch(error => {
          store.errorKey = `Unable to delete: ${error.message}`;
          render();
        });
    });
  }

  function handleCondensedItem(){
    $('.bookmarks').on('click', '.js-item-condense', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      store.setItemIsCondensed(id);
      render();
    });
  }


  function handleNewItemSubmit() {
    $('body').on('submit', '#add-item-form', event => {
      event.preventDefault();
      const newItemName = $('#title-input').val();
      const newItemUrl = $('#url-input').val();
      const newItemRating = $('#rating-input').val();
      const newItemDescription = $('#description-input').val();
      Api.createItem(newItemName, newItemUrl, newItemRating, newItemDescription)
        .then(response => {
          store.addItem(response);
          store.isAdding = false;
          render();
        })
        .catch(error => {
          store.errorKey = `Unable to add. ${error.message}`;
          $('.contain-bookmark-form').empty();
          render();
        });


    });
  }










  function handleCloseErrorPop() {
    $('.error-pop').on('click', '.error-close', (e) => {
      e.preventDefault();
      console.log($(e.delegateTarget));
      $(e.delegateTarget).addClass('hidden');
      $(e.delegateTarget).children('p').html('');
      store.errorKey = '';
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
    handleCloseErrorPop();
    expandBookmarkForm();
    handleItemDelete();
    handleCondensedItem();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());