instalar los siguientes archivos:

npm i express
npm i express-handlebars --> motor de plantillas
npm i express-session --> sesiones en el servidor
npm i method-override --> otros metodos aparte del delete, get, set
npm i mongoose --> modulo para conectarme con una base de datos (mongo db)
npm i passport  --> logearme
npm i passport-local

npm i bcrypt.js --> modulo para encriptar la clave

npm i connect-flash --> enviar mensajes entre multiples vistas

base de datos:

windows -> mongod
linux -> sudo service mongod start

Leer la base de datos:

Mongodb:

use notes-db-app
show collections
'notes'
db.notes.find().pretty()

me muestran los datps