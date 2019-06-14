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
  
  
  const setItemIsEditing = function(id, isEditing) {
    const item = this.findById(id);
    item.isEditing = isEditing;
  };
  
  const setSearchTerm = function(term) {
    this.searchTerm = term;
  };
  
  return {
    items: [],
    isAdding: false,
    searchTerm: '',
    errorKey : '',
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
    setSearchTerm,
    setItemIsEditing,
  };
    
}());
  