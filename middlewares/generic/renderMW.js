/* 
 * A sablonokat használva a megfelelő html oldal betöltése 
 */
module.exports = function(objectrepository, viewName) {

    return function(req, res) {
        res.render(viewName, res.locals);
    };

};