import { Router } from "express";

const routerIndex = Router();

routerIndex.get("/", (req, res) => {
    res.render("index");
});

export default routerIndex;
