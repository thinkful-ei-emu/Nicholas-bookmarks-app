'use strict';
/* global  store*/
// eslint-disable-next-line no-unused-vars
const Api = (function(){
  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
          error = { code: res.status };
        }
   
        // In either case, parse the JSON stream:
        return res.json();
      })
   
      .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
   
        // Otherwise give back the data as resolved Promise
        return data;
      });
  }
  
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Nicholas5656/';
  const getItems = function(){
    return listApiFetch(`${BASE_URL}bookmarks`);
  };
  
  const createItem = function(title, url, rating, desc){
    const newItem= JSON.stringify({
      title,
      url,
      rating,
      desc
    });
    const options={
      method:'POST',
      body: newItem,
      headers: new Headers({'Content-Type': 'application/json'})
    };
    return listApiFetch(`${BASE_URL}bookmarks`, options);
  
  };
  
  const updateItem = function(id, objectpatch){
    const updateObject= JSON.stringify(objectpatch);
    const options={
      method:'PATCH',
      body: updateObject,
      headers: new Headers({'Content-Type': 'application/json'})
    };
    return listApiFetch(`${BASE_URL}bookmarks/${id}`, options);
  
  };
  
  const deleteItem = function(id){
    const options = {
      method: 'DELETE'
    };
    return listApiFetch(`${BASE_URL}bookmarks/${id}`, options);
  };
  
  
  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
}());


console.log(Api.getItems());


