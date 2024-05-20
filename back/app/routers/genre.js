import { genreController } from "../controllers/index.js";

import { Router } from "express";
const router = Router();

/**
    * GET /genres
    * @summary Get all genres
    * @tags Genre
    * @return {[Genre]} 200 - Success response - application/json
*/
router.get('/', genreController.getAllGenres); // pour récupérer tous les genres existants

/**
     * GET /genres/story/{id}
     * @summary Get genres by story
     * @tags Genre
     * @param {number} id.path.required - story identifier
     * @return {[Genre]} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Genres not found - application/json
*/
router.get('/story/:storyId(\\d+)', genreController.getAllGenresOfAStory); // pour récupérer tous les genres associés à une histoire

/**
     * GET /genres/{id}
     * @summary Get one genre
     * @tags Genre
     * @param {number} id.path.required - genre identifier
     * @return {Genre} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad request - application/json
     * @return {ApiError} 404 - Error: Genre not found - application/json
*/
router.get('/:id(\\d+)', genreController.getOneGenre); // pour récupérer un genre en particulier

export default router;