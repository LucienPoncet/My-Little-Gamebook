import { actionController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

/**
    * GET /actions
    * @summary Get all actions
    * @tags Action
    * @return {[Action]} 200 - Success response - application/json
*/
router.get('/', actionController.getAllActions); // pour récupérer toutes les actions existantes

/**
     * GET /actions/npc/{id}
     * @summary Get actions by npc
     * @tags Action
     * @param {number} id.path.required - npc identifier
     * @return {[Action]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Actions not found - application/json
*/
router.get('/npc/:npcId(\\d+)', actionController.getAllActionsByNpc); // pour récupérer toutes les actions associées à un personnage spécifique

/**
     * GET /actions/item/{id}
     * @summary Get actions by item
     * @tags Action
     * @param {number} id.path.required - item identifier
     * @return {[Action]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Actions not found - application/json
*/
router.get('/item/:itemId(\\d+)', actionController.getAllActionsByItem); // pour récupérer toutes les actions associées à un objet spécifique

/**
     * GET /actions/class/{class}
     * @summary Get actions by class
     * @tags Action
     * @param {string} class.path.required - action className
     * @return {[Action]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad Request - application/json
     * @return {ApiError} 404 - Error: Actions not found - application/json
*/
router.get('/class/:actionClassName', actionController.getAllActionsByClass); // pour récupérer toutes les actions d'une certaine classe

/**
     * GET /actions/compartment/{id}
     * @summary Get actions by compartment
     * @tags Action
     * @param {number} id.path.required - compartment identifier
     * @return {[Action]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Actions not found - application/json
*/
router.get('/compartment/:compartmentId(\\d+)', actionController.getAllActionsByCompartment); // pour récupérer toutes les actions associées à une case spécifique

/**
     * GET /actions/{id}
     * @summary Get one action
     * @tags Action
     * @param {number} id.path.required - action identifier
     * @return {Action} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Action not found - application/json
*/
router.get('/:id(\\d+)', actionController.getOneAction); // pour récupérer une action en particulier

export default router;