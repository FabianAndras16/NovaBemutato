/* 
 * Egy kórustag adatainak mentése (új létrehozásához, 
 *          vagy egy már meglévő adatainak frissítéséhez)
 *  - ha sikeres a létrehozás akkor az új kórusának taglista oldalára navigálok
 *  - ha sikeres az adatok frissítése, akkor visszanavigálás a kórus oldalára
 *  - ellenben hiba üzenet
 */

const requireOption = require("../requireOptions").requireOption

module.exports = function(objectrepository) {
    const memberModel = requireOption(objectrepository, 'memberModel');

    return function(req, res, next) {


        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.email === 'undefined' ||
            typeof req.body.joiningYear === 'undefined'
        ) {
            return next();
        }
        var member = undefined;

        if (typeof res.locals.member !== 'undefined') {
            member = res.locals.member;
            member.name = req.body.name;
            member.email = req.body.email;
            member.joiningYear = req.body.joiningYear;
            member._choirMember = res.locals.choir._id;
            if (req.body.voice) member.voice = req.body.voice;
            if (req.body.folderNumber) member.folderNumber = req.body.folderNumber;
        } else {
            member = new memberModel();
            member.name = req.body.name;
            member.email = req.body.email;
            member.voice = req.body.voice;
            member.folderNumber = req.body.folderNumber;
            member.joiningYear = req.body.joiningYear;
            member._choirMember = res.locals.choir._id;
        }

        // console.log(member);

        member.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect("/members/" + res.locals.choir._id);
        });
    };
};