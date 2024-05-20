import { storyController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

/**
    * GET /stories
    * @summary Get all stories
    * @tags Story
    * @return {[Story]} 200 - Success response - application/json
*/
router.get('/', storyController.getAllStories); // pour récupérer toutes les histoires partagées

/**
     * GET /stories/genre/{id}
     * @summary Get stories by genre
     * @tags Story
     * @param {number} id.path.required - genre identifier
     * @return {[Story]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Stories not found - application/json
*/
router.get('/genre/:genreId(\\d+)', storyController.getAllStoriesByGenre); // pour récupérer toutes les histoires partagées par genre

/**
     * GET /stories/level/{id}
     * @summary Get stories by level
     * @tags Story
     * @param {number} id.path.required - level number
     * @return {[Story]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Stories not found - application/json
*/
router.get('/level/:levelId(\\d+)', storyController.getAllStoriesByLevel); // pour récupérer toutes les histoires partagées par niveau

/**
     * GET /stories/{id}
     * @summary Get one story
     * @tags Story
     * @param {number} id.path.required - story identifier
     * @return {Story} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Story not found - application/json
*/
router.get('/:id(\\d+)', storyController.getOneStory); // pour récupérer une histoire en particulier

export default router;