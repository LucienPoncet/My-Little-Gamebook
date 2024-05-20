// Index des routers pour les centraliser et renvoyer les appels des fonctions vers le router en question souhaité

import { Router } from "express";
// On importe tous les routers existants dans chaque fichier qui porte son nom
import actionRouter from "./action.js";
import compartmentRouter from "./compartment.js";
import genreRouter from "./genre.js";
import itemRouter from "./item.js";
import npcRouter from "./npc.js";
import placeRouter from "./place.js";
import storyRouter from "./story.js";
import userRouter from "./user.js";
import worldRouter from "./world.js";

// On importe Router pour l'utiliser pour chaque router

const router = Router();

// On place le service de gestion d'erreurs
import errorHandler  from "../services/errorHandler/errorHandler.js";

// On renvoie vers tous les routers
router.use("/actions",actionRouter);
router.use("/compartments",compartmentRouter);
router.use("/genres",genreRouter);
router.use("/items",itemRouter);
router.use("/npcs",npcRouter);
router.use("/places",placeRouter);
router.use("/stories",storyRouter);
router.use("/user",userRouter);
router.use("/worlds",worldRouter);

// On utiliser le service de gestion d'erreurs
router.use(errorHandler);

// et on exporte le router pour qu'il soit toujours utilisable
export default router;