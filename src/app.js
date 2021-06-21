import express from "express"
import expressHBS from "express-handlebars"
import path from "path"
import morgan from "morgan";
import routerIndex from "./routes/index.routes.js"
import routerNotes from "./routes/notes.routes.js"
import routerUsers from "./routes/users.routes.js"
import flash from "connect-flash"
import session from "express-session";
import methodOverride from "method-override";
import MongoStore from "connect-mongo";
import passport from "passport";
import createAdminUser from "./libs/createUser"
import "./config/passport"
import configurations from "./config"

const app = express();
createAdminUser();

//Global
app.set("port", configurations.PORT);

//Settings
app.set("views", path.join(__dirname + "/views/"));
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
app.use(methodOverride("_method"));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: configurations.MONGODB_URI })
}))

app.use(passport.initialize())
app.use(passport.session())
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
app.use(routerUsers)
console.log(__dirname)
app.use(express.static(path.join(__dirname + "/public")));

export default app;