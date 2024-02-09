//Az összes létező kórus betöltése 

const requireOption = require("../requireOptions").requireOption

module.exports = function(objectrepository) {
    const choirModel = requireOption(objectrepository, "choirModel")

    return async function(req, res, next) {

        choirModel.find({}, (err, choirs) => {
            res.locals.choirs = choirs;
            return next();
        })
    };
};