import { Router } from "express";
import { updateResearcher } from "../database";

export function researcherRouter() {
    const router = Router();

    router.get("/:user", async(req, res) => {
        res.render("researcher");
    });

    router.post("/:user/update", async(req, res) => {
        const userName = req.params.user;
        const {pincode, pincodeConfirm} = req.body;
        try {
        
         if(pincode !== pincodeConfirm) throw new Error("Pincodes zijn niet gelijk");
           req.session.message = {type: 'success', message: `Pincode is gewijzigd`};
           
           await updateResearcher(userName, pincode);
           
            res.redirect(`/penguins`);
        
        
    } catch (error) {
        if(error instanceof Error)
        {
            req.session.message = {type: 'error', message: `${error.message}`}  
            res.redirect(`/researchers/${userName}`);

        } 
            
        }

    });



    return router;
}