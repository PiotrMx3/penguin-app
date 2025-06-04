import { Router } from "express";

export function homeRouter() {
    const router = Router();

    router.get("/", (req, res) => {
        res.render("index");
    });

    return router;
}