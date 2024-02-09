/* 
 * Az adott kórusba tartozó összes tag adatainak lekérése és betöltése 
 */
const requireOption = require("../requireOptions").requireOption


module.exports = function(objectrepository) {
    return function(req, res, next) {
        const memberModel = requireOption(objectrepository, "memberModel")

        const choir = res.locals.choir

        memberModel.find({_choirMember: choir._id}, (err, members) => {
            if(err){
                return next(err);
            }

            res.locals.members = members;
            return next();
        })
    };
};