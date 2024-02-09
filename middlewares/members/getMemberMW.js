/* 
 * Egy már meglévő kórustag adatainak lekérése és betöltése
 */

const requireOption = require("../requireOptions").requireOption

module.exports = function(objectrepository) {

    const memberModel = requireOption(objectrepository, "memberModel")

    return function(req, res, next) {
        memberModel.findOne({ _id: req.params.memberID }, (err, member) => {
            if (err) {
                return next(err);
            }

            res.locals.member = member;
            return next();
        })
    };
};