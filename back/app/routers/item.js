import { itemController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

/**
    * GET /items
    * @summary Get all items
    * @tags Item
    * @return {[Item]} 200 - Success response - application/json
*/
router.get('/', itemController.getAllItems); // pour récupérer tous les objets existants

/**
     * GET /items/action/{id}
     * @summary Get items by action
     * @tags Item
     * @param {number} id.path.required - action identifier
     * @return {[Item]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Items not found - application/json
*/
router.get('/action/:actionId(\\d+)', itemController.getAllItemsByAction); // pour récupérer les objets associés à une action spécifique

/**
     * GET /items/{id}
     * @summary Get one item
     * @tags Item
     * @param {number} id.path.required - item identifier
     * @return {Item} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Item not found - application/json
*/
router.get('/:id(\\d+)', itemController.getOneItem); // pour récupérer un objet en particulier


export default router;