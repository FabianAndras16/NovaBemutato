/* 
 * A kórus azonosító (choirID) alapján egy adott kórus adatainak lekérése 
 */


const requireOption = require("../requireOptions").requireOption

module.exports = function(objectrepository) {
    const choirModel = requireOption(objectrepository, "choirModel")
    const memberModel = requireOption(objectrepository, "memberModel")

    return async function(req, res, next) {

        //console.log(req);

        choirModel.findOne({ _id: req.params.choirID }, (err, choir) => {
            if (err || !choir) {
                return next(err);
            }


            memberModel.countDocuments({ _choirMember: choir._id }, (err, count) => {
                if (res.locals.membersCount === undefined) {
                    res.locals.membersCount = count + 1;
                } else {
                    res.locals.membersCount = count;
                }
                res.locals.choir = choir;
                return next();
            });
            // res.locals.choirLength = choir.length;
        })
    };
};