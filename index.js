var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));


// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* 
    Ebben lesz az egész routing struktúra 
*/

require('./routes/routes')(app);

/**
 * Standard hiba kezelés
 */

app.use(function(err, req, res, next) {
    res.status(500).send('Hiba van a mátrixban!');

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(3000, function() {
    console.log("On port: 3000");
});