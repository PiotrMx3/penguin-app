import { Router } from "express";
import { getPenguinsBySpecies, getSpeciesById } from "../database";
import { join } from "path";

export function speciesRouter() {
    const router = Router();

    router.get("/:id", async(req, res) => {
        const id = req.params.id;

        const species = await getSpeciesById(id);
        const penguisBySpecies = await getPenguinsBySpecies(parseInt(id));

        console.log(penguisBySpecies);
    
        if(!species) {
           res.status(404).send("Species not found")
           return;
        }

        res.render("species", {
            species: species,
            allPenguins: penguisBySpecies
        });
    });

    return router;
}