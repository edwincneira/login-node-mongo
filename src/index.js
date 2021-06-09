import express from "express"
import expressHBS from "express-handlebars"
import path from "path"
import morgan from "morgan";
import routerIndex from "./routes/index.routes.js"
import routerNotes from "./routes/notes.routes.js"
import flash from "connect-flash"
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const app = express();
//Global
app.set("port", 3000);
const __dirname = path.resolve(path.dirname(''));

//Settings
app.set("views", path.join(__dirname + "/src/views/"));
app.engine(".hbs", expressHBS({
    defaultLayout: "main",
    partialsDir: path.join(app.get("views") + "partials"),
    layoutsDir: path.join(app.get("views") + "layouts"),
    extname: ".hbs",
}));
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname + "/src/public")));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `mongodb://localhost/notes-app`})
}))
app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null;
    next()
})

//routes
app.use(routerIndex);
app.use(routerNotes);

app.listen(app.get("port"), () => {
    console.log('Server Listen, ', app.get("port"));
})