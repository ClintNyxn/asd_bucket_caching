const db = require("../database/productsDatabase.js")

function readProducts(){
  return db.getProductDb()
}
function readIds(id){
  return db.getIdDb(id)
}

function createProduct(product){
  return db.createProductDb(product)
}
function updateProduct(id, product){
  return db.updateProductDb(id, product)
}
function patchProduct(id, product){
  return db.patchProductDb(id, product)
}
function deleteProduct(id){
  return db.deleteProductDb(id)
}

module.exports = {readProducts, readIds, createProduct, updateProduct, patchProduct, deleteProduct}
