import { Router } from "express";
import { assignPenguinToResearcher, getAllPenguins } from "../database";
import { SortDirection } from "mongodb";

export function penguinRouter() {
    const router = Router();
    const SORT_FIELDS = ["id", "nickname", "description", "species_id", "island", "gender", "weight", "height", "year", "image", "assigned_to"];

    router.get("/", async(req, res) => {
      

        const q = typeof req.query.q === "string" ? req.query.q : "";
        const sortField = typeof req.query.sortField === "string" ? req.query.sortField : "id";
        const sortDirection = req.query.sortDirection as SortDirection;

        const allPenguins = await getAllPenguins(sortField, sortDirection, q);

        
        res.render("penguins", {
            allPenguins: allPenguins,
            direction: sortDirection,
            field: sortField,
            q:q
        });
    });

    router.post("/:id/assign", async(req, res) => {

        
        const id = parseInt(req.params.id);
        const user = req.session.user?.username;

        try {
            if(!user) throw new Error("error user not find");
            
             await assignPenguinToResearcher(id, user);
    
    
            res.redirect("/penguins");
            
        } catch (error) {
            
        }
    });


    return router;
}