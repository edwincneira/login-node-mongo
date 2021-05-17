const express = require('express');
const app = express();
const path = require('path')
const express_handlebash = require('express-handlebars')
//Init

//config
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname + '/views'))
// app.engine('.hbs', express_handlebash({
//     defaultLayout: 'main.hbs',
//     layoutsDir: ,
//     partialsDir: ,
//     extname: 
// }))
//Static Files

//Middlewares

//Global

//Routes

//Server

app.listen(app.get('port'), function(){
    console.log('Server Listen on port, ', app.get('port'))
})