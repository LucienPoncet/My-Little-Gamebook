import { placeController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

/**
    * GET /places
    * @summary Get all places
    * @tags Place
    * @return {[Place]} 200 - Success response - application/json
*/
router.get('/', placeController.getAllPlaces); // pour récupérer tous les lieux existants

/**
     * GET /places/world/{id}
     * @summary Get places by world
     * @tags Place
     * @param {number} id.path.required - world identifier
     * @return {[Place]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Places not found - application/json
*/
router.get('/world/:worldId(\\d+)', placeController.getAllPlacesByWorld); // pour récupérer tous les lieux existants par univers

/**
     * GET /places/{id}
     * @summary Get one place
     * @tags Place
     * @param {number} id.path.required - place identifier
     * @return {Place} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Place not found - application/json
*/
router.get('/:id(\\d+)', placeController.getOnePlace); // pour récupérer un lieu en particulier

export default router;