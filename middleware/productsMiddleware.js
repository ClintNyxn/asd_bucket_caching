let cache = {};
let time = {};

function productsMiddleware(req, res, next) {
    const now = Date.now();
    const key = req.originalUrl;

    if (cache[key] && now - time[key] < 60000) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(cache[key]);
    }

    res.setHeader('X-Cache', 'MISS');
    next();
}

productsMiddleware.cache = cache;
productsMiddleware.time = time;

productsMiddleware.clearCache = function () {
    cache = {};
    time = {};

    productsMiddleware.cache = cache;
    productsMiddleware.time = time;
};

module.exports = productsMiddleware;
