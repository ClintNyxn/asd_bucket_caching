const path = require("path")
const fs = require("fs")
const p = path.join(__dirname,'../db.json')

function getProductDb(){
  const read = fs.readFileSync(p,'utf8')
  return JSON.parse(read)
}

function getIdDb(id){
  const read = JSON.parse(fs.readFileSync(p,'utf8'))
  const r = read.find(i => i.id == +id)
  return r
}

function createProductDb(product){
  const products = getProductDb()
  const id = product.id || Math.max(0, ...products.map(i => i.id)) + 1
  const created = {...product, id}
  products.push(created)
  fs.writeFileSync(p, JSON.stringify(products, null, 2))
  return created
}

function updateProductDb(id, product){
  const products = getProductDb()
  const index = products.findIndex(i => i.id == +id)
  if (index === -1) return
  products[index] = {...product, id: products[index].id}
  fs.writeFileSync(p, JSON.stringify(products, null, 2))
  return products[index]
}

function patchProductDb(id, product){
  const products = getProductDb()
  const index = products.findIndex(i => i.id == +id)
  if (index === -1) return
  products[index] = {...products[index], ...product, id: products[index].id}
  fs.writeFileSync(p, JSON.stringify(products, null, 2))
  return products[index]
}

function deleteProductDb(id){
  const products = getProductDb()
  const index = products.findIndex(i => i.id == +id)
  if (index === -1) return false
  products.splice(index, 1)
  fs.writeFileSync(p, JSON.stringify(products, null, 2))
  return true
}

module.exports = {getIdDb, getProductDb, createProductDb, updateProductDb, patchProductDb, deleteProductDb}
