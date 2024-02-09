//A kórustag torlese

const requireOption = require("../requireOptions").requireOption

module.exports = function(objectrepository) {
    const memberModel = requireOption(objectrepository, 'memberModel');
    return function(req, res, next) {


        if (typeof res.locals.member === 'undefined') {
            return next();
        }


        res.locals.member.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/members/' + res.locals.choir._id);
        });

    };

};