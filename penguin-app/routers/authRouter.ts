import e, { Router } from "express";
import { getAllResearchers, login } from "../database";

export function authRouter() {
    const router = Router();

    router.get("/login", async(req, res) => {
        const researchers = await getAllResearchers();
        res.render("login", {
            researchers: researchers
        });
    });

    router.post("/login", async(req, res) => {
        const {username, pincode} = req.body;

        try {
         const user = await login(username,pincode);
         if(!user) throw new Error("User not found");
         delete user.pincode;
         req.session.user = user;
         req.session.message = {type:"success", message: `Welcome ${user.username} !` }   
         res.redirect("/")
        } catch (error) {
            if(error instanceof Error) {
                req.session.message = {type:"error", message: `${error.message} !` }
                res.redirect("/login");
            }
            
        }

    });

    router.post("/logout", (req, res) => {  
        

        req.session.message = {type:"success", message: `See you later !` };  
        delete req.session.user;
        res.redirect("/login");
    });
    


    return router;
}