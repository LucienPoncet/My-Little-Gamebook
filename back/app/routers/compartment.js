import { compartmentController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

import { isMember } from "../services/security.js";

/**
    * GET /compartments
    * @summary Get all compartments
    * @tags Compartment
    * @return {[Compartment]} 200 - Success response - application/json
*/
router.get('/', isMember, compartmentController.getAllCompartments); // pour récupérer toutes les cases créées dans une histoire

/**
     * GET /compartments/class/{class}
     * @summary Get compartments by class
     * @tags Compartment
     * @param {string} class.path.required - compartment className
     * @return {[Compartment]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad Request - application/json
     * @return {ApiError} 404 - Error: Compartments not found - application/json
*/
router.get('/class/:compartmentClassName', isMember, compartmentController.getAllCompartmentsByClass); // pour récupérer toutes les cases d'une certaine classe

/**
     * GET /compartments/story/{id}
     * @summary Get compartments by story
     * @tags Compartment
     * @param {number} id.path.required - story identifier
     * @return {[Compartment]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Compartments not found - application/json
*/
router.get('/story/:storyId(\\d+)', isMember, compartmentController.getAllCompartmentsByStory); // pour récupérer toutes les cases d'une certaine histoire

/**
     * GET /compartments/story/{id}/class/{class}
     * @summary Get compartments by story and by class
     * @tags Compartment
     * @param {number} id.path.required - story identifier
     * @param {string} class.path.required - compartment className
     * @return {[Compartment]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad Request - application/json
     * @return {ApiError} 404 - Error: Compartments not found - application/json
*/
router.get('/story/:storyId(\\d+)/class/:compartmentClassName', isMember, compartmentController.getAllCompartmentsByStoryAndByClass); // pour récupérer toutes les cases d'une certaine histoire et d'une classe

/**
     * GET /compartments/story/{id}/beginning
     * @summary Get one compartment with class 'beginning'
     * @tags Compartment
     * @param {number} id.path.required - story identifier
     * @return {Compartment} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Compartment not found - application/json
*/
router.get('/story/:storyId(\\d+)/beginning', isMember, compartmentController.getCompartmentByStoryAndByClassBeginning); // pour récupérer une case en particulier

/**
     * GET /compartments/{id}
     * @summary Get one compartment
     * @tags Compartment
     * @param {number} id.path.required - compartment identifier
     * @return {Compartment} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Compartment not found - application/json
*/
router.get('/:id(\\d+)', isMember, compartmentController.getOneCompartment); // pour récupérer une case en particulier

export default router;