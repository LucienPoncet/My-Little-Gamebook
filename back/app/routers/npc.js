import { npcController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

/**
    * GET /npcs
    * @summary Get all npcs
    * @tags Npc
    * @return {[Npc]} 200 - Success response - application/json
*/
router.get('/', npcController.getAllNpcs); // pour récupérer tous les personnages existants

/**
     * GET /npcs/world/{id}
     * @summary Get npcs by world
     * @tags Npc
     * @param {number} id.path.required - world identifier
     * @return {[Npc]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Npcs not found - application/json
*/
router.get('/world/:worldId(\\d+)', npcController.getAllNpcsByWorld); // pour récupérer tous les personnages existants par univers

/**
     * GET /npcs/{id}
     * @summary Get one npc
     * @tags Npc
     * @param {number} id.path.required - npc identifier
     * @return {Npc} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Npc not found - application/json
*/
router.get('/:id(\\d+)', npcController.getOneNpc); // pour récupérer un personnage en particulier

export default router;