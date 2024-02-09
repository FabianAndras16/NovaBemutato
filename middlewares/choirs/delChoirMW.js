const requireOption = require("../requireOptions").requireOption

module.exports = function(objectrepository) {
    const choirModel = requireOption(objectrepository, 'choirModel');
    return function(req, res, next) {


        console.log(res.locals.choir)

        if (typeof res.locals.choir === 'undefined') {
            return next();
        }


        res.locals.choir.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/choirs');
        });

    };

};