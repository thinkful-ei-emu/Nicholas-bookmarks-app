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
  
  const setItemIsCondensed = function(id) {
    const item = this.findById(id);
    if (item.isCondensed === undefined){
      item.isCondensed = false;
    } else {
      item.isCondensed = !item.isCondensed;  
    }  
  };
  
  
  return {
    items: [],
    isAdding: false,
    errorKey : '',
    isFiltering: 1,
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
    setItemIsCondensed,
  };
    
}());
  
console.log(store.items);