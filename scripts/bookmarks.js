'use strict';
/* global  store, bookmarks, $, Api*/
// eslint-disable-next-line no-unused-vars

const bookmarks = (function(){

  function generateItemElement(item) {
    
    return `<li class="js-bookmark-element bookmark-element" data-item-id="${item.id}">
            ${item.title}
            <br>
            <a href="${item.url}">Visit Link</a>
            <p>${item.description}</p>
            <div class="bookmark-item-controls>
            <button class="js-item-delete" type="submit">
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
    if(store.errorKey){
      $('.error-message').append(`${store.errorKey} <br>`);
      $('.error-pop').removeClass('hidden');
    }
    let items = [ ...store.items ];
    
    
    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarksItemsString = generateBookmarksString(items);
    store.errorKey='';
    
    // insert that HTML into the DOM
    $('.js-bookmarks').html(bookmarksItemsString);
  }

  function getItemIdFromElement(item){
    return $(item)
      .closest('.js-bookmark-element')
      .data('item-id');
  }

  function expandBookmarkForm(){
    $('#add-bookmark-button-form').submit(event =>{
      event.preventDefault();
      $('.contain-bookmark-form').empty();
      $('.contain-bookmark-form').append( 
        `<form>
          Title:
          <input type="text" name="title" required><br>
          Url:
          <input type="text" name="url" required><br>
          Rating:
          <input type="number" min="1" max="5" required><br>
          Description:
          <input type="text" name="description" required><br>
          <button type="submit">Add to list</button>
      </form>`
      );
      render();
    });
  }

  function handleItemDelete(){
    $('.bookmarks').on('submit', '.js-item-delete', event => {
      event.preventDefault();
      const item = getItemIdFromElement(event.currentTarget);
      console.log(item);
    });
  }
    
    
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      Api.createItem(newItemName)
        .then(response=> {
          store.addItem(response);
          render();
        })
        .catch(error=>{
          store.errorKey=`Unable to add. ${error.message}`;
          render();
        });
          
        
    });
  }
    
  
    


    


  

  function handleCloseErrorPop(){
    $('.error-pop').on('click','.error-close', (e)=>{
      e.preventDefault();
      console.log($(e.delegateTarget));
      $(e.delegateTarget).addClass('hidden');
      $(e.delegateTarget).children('p').html('');
      store.errorKey='';
    });
  }
    
  function bindEventListeners() {
    handleNewItemSubmit();
    handleCloseErrorPop();
    expandBookmarkForm();
    handleItemDelete();
  }
  
  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());