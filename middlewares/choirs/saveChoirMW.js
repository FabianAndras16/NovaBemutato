const requireOption = require("../requireOptions").requireOption

module.exports = function(objectrepository) {
    const choirModel = requireOption(objectrepository, 'choirModel');

    return function(req, res, next) {
        


        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.maestro === 'undefined' || 
            typeof req.body.foundation === 'undefined' ||
            typeof req.body.numberOfMembers === 'undefined'
        ) {
            return next();
        }


        var choir = undefined;

        if(typeof res.locals.choir !== "undefined"){
            choir = res.locals.choir;
        }else{
            choir = new choirModel()
        }

       choir.name = req.body.name;
       choir.maestro = req.body.maestro;
       choir.foundation = req.body.foundation;
       choir.numberOfMembers = req.body.numberOfMembers


        choir.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect("/choirs/"+choir._id);
        });
    };

};