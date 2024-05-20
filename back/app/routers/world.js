import { worldController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

/**
    * GET /worlds
    * @summary Get all worlds
    * @tags World
    * @return {[World]} 200 - Success response - application/json
*/
router.get('/', worldController.getAllWorlds); // pour récupérer tous les univers existants

/**
     * GET /worlds/{id}
     * @summary Get one world
     * @tags World
     * @param {number} id.path.required - world identifier
     * @return {World} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: World not found - application/json
*/
router.get('/:id(\\d+)', worldController.getOneWorld); // pour récupérer un univers en particulier

export default router;