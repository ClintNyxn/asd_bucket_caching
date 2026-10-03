const services = require("../services/productsServices.js");
const productsMiddleware = require('../middleware/productsMiddleware');

const getProduct = (req, res) => {
    const products = services.readProducts();

    productsMiddleware.cache[req.originalUrl] = products;
    productsMiddleware.time[req.originalUrl] = Date.now();

    res.json(products);
};

const getId = (req, res) => {
    const product = services.readIds(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    productsMiddleware.cache[req.originalUrl] = product;
    productsMiddleware.time[req.originalUrl] = Date.now();

    res.json(product);
};

const createProduct = (req, res) => {
    const product = services.createProduct(req.body);
    productsMiddleware.clearCache();
    res.status(201).json(product);
};

const updateProduct = (req, res) => {
    const product = services.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    productsMiddleware.clearCache();
    res.json(product);
};

const patchProduct = (req, res) => {
    const product = services.patchProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    productsMiddleware.clearCache();
    res.json(product);
};

const deleteProduct = (req, res) => {
    const deleted = services.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    productsMiddleware.clearCache();
    res.status(204).end();
};

module.exports = { getProduct, getId, createProduct, updateProduct, patchProduct, deleteProduct };
