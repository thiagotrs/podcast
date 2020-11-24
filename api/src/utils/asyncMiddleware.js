const asyncMiddleware = fn => (req, res, next) => {
    // eslint-disable-next-line consistent-return
    Promise.resolve(fn(req, res, next = next)).catch(next);
};

module.exports = asyncMiddleware