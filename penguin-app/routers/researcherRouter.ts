import { Router } from "express";

export function researcherRouter() {
    const router = Router();

    router.get("/alexbio", async(req, res) => {
        res.render("researcher");
    });

    router.post("/alexbio/update", async(req, res) => {
        res.redirect(`/researchers/alexbio`);
    });



    return router;
}