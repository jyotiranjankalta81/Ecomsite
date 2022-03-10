module.exports = (theFunc) => (req, res, next) => {
    // promise javascript class
    Promise.resolve(theFunc(req, res, next)).catch(next);
};