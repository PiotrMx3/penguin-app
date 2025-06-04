import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { connect } from "./database";
import session from "./session";
import { flashMiddleware } from "./middleware/flashMiddleware";
import { homeRouter } from "./routers/homeRouter";
import { secureMiddleware } from "./middleware/secureMiddleware";
import { authRouter } from "./routers/authRouter";
import { penguinRouter } from "./routers/penguinRouter";
import { researcherRouter } from "./routers/researcherRouter";
import { speciesRouter } from "./routers/speciesRouter";
import {penguinUtility } from "./utils";


dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(session);
app.set("port", process.env.PORT ?? 3000);
app.use(penguinUtility);
app.use(flashMiddleware)

app.use("", authRouter());
app.use("/", secureMiddleware, homeRouter());
app.use("/penguins", secureMiddleware, penguinRouter());
app.use("/species", secureMiddleware, speciesRouter());
app.use("/researchers", secureMiddleware, researcherRouter());

app.listen(app.get("port"), async() => {
    try {
        await connect();
        console.log("Server started on http://localhost:" + app.get("port"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    
});