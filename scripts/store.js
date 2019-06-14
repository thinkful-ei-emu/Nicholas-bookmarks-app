'use strict';
/* global  store*/
// eslint-disable-next-line no-unused-vars

const store = (function(){
  const addItem = function(item) {
    this.items.push(item);
  };
  
  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };
  
  const findAndUpdate = function(id,newData){
    Object.assign(this.items.find((item)=>item.id===id),newData);
  };
  
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };
  

//   const setItemIsFiltered = function(rating){
//     if (this.items.isFiltered === undefined){
//       this.items.isFiltered = false;
//     }
//     if (this.items.rating < rating){
//       this.items.isFiltered = true;
//     } else {
//       this.items.isFiltered = false;
//     }
//   };
  
  const setItemIsCondensed = function(id) {
    const item = this.findById(id);
    if (item.isCondensed === undefined){
      item.isCondensed = false;
    } else {
      item.isCondensed = !item.isCondensed;  
    }
    
  };
  
  const setSearchTerm = function(term) {
    this.searchTerm = term;
  };
  
  return {
    items: [],
    isAdding: false,
    searchTerm: '',
    errorKey : '',
    // isFiltering: false,
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
    setSearchTerm,
    setItemIsCondensed,
    // setItemIsFiltered
  };
    
}());
  