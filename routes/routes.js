var renderMW = require('../middlewares/generic/renderMW');

var getChoirsMW = require('../middlewares/choirs/getChoirsMW');
var getChoirMW = require('../middlewares/choirs/getChoirMW');
var saveChoirMW = require('../middlewares/choirs/saveChoirMW');
var delChoirMW = require('../middlewares/choirs/delChoirMW');

var getMembersMW = require('../middlewares/members/getMembersMW');
var getMemberMW = require('../middlewares/members/getMemberMW');
var saveMemberMW = require('../middlewares/members/saveMemberMW');
var delMemberMW = require('../middlewares/members/delMemberMW');


var choirModel = require('../models/choir');
var memberModel = require('../models/member');


module.exports = function(app) {
    var objectRepository = {
        choirModel: choirModel,
        memberModel: memberModel
    };

    /*---------------Choir actions-------------------*/

    app.use('/choirs/new',
        saveChoirMW(objectRepository),
        renderMW(objectRepository, 'newChoir')
    );

    app.post('/choirs/:choirID/edit',
        getChoirMW(objectRepository),
        saveChoirMW(objectRepository),
    );

    app.get('/choirs/:choirID',
        getChoirMW(objectRepository),
        renderMW(objectRepository, 'choirModify')
    );

    app.post('/choirs/del/:choirID',
        getChoirMW(objectRepository),
        delChoirMW(objectRepository)
    );

    app.get('/choirs',
        getChoirsMW(objectRepository),
        renderMW(objectRepository, 'choirs')
    );

    /*---------------Member actions-------------------*/

    app.post('/members/:choirID/new',
        getChoirMW(objectRepository),
        saveMemberMW(objectRepository),
        renderMW(objectRepository, 'newMember')
    );

    app.get("/members/:choirID/new",
        getChoirMW(objectRepository),
        renderMW(objectRepository, 'newMember')
    )

    app.post('/members/:choirID/edit/:memberID',
        getChoirMW(objectRepository),
        getMemberMW(objectRepository),
        saveMemberMW(objectRepository),
        renderMW(objectRepository, 'memberModify')
    );

    app.get('/members/:choirID/edit/:memberID',
        getChoirMW(objectRepository),
        getMemberMW(objectRepository),
        renderMW(objectRepository, 'memberModify')
    );

    app.post('/members/:choirID/del/:memberID',
        getChoirMW(objectRepository),
        getMemberMW(objectRepository),
        delMemberMW(objectRepository),
    );

    app.get('/members/:choirID',
        getChoirMW(objectRepository),
        getMembersMW(objectRepository),
        renderMW(objectRepository, 'members')
    );


    /*---------------------About----------------------*/
    app.get('/about',
        renderMW(objectRepository, 'about')
    );

    app.get('/',
        renderMW(objectRepository, 'index')
    );
};