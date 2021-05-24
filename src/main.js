const express = require('express');
const app = express();
const path = require('path')
const express_handlebash = require('express-handlebars')
const override = require('method-override')
const session = require('express-session')
//Init
require('./database')

//config
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname + '/views'))

app.engine('.hbs', express_handlebash({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))

app.set("view engine", ".hbs");

//Static Files
app.use(express.static(path.join(__dirname, 'public')))

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(override('_method')) //metodos como put get delete 
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))


//Global

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Server

app.listen(app.get('port'), function(){
    console.log('Server Listen on port, ', app.get('port'))
})