import { userController } from "../controllers/index.js";

import { Router } from "express";

const router = Router();

// On utilise le middleware isMember pour pouvoir vérifier si l'utilisateur existe en BDD
import { isMember } from "../services/security.js";

/**
    * GET /user
    * @summary Get loggedIn user
    * @tags User
    * @return {User} 200 - Success response - application/json
*/
router.get('/', isMember, userController.getCurrentUser); // pour afficher les données de l'utilisateur (lastname, avatar, etc)

/**
    * POST /user/signup
    * @summary Create a user
    * @tags User
    * @param {InputUser} request.body.required - user info
    * @return {User} 200 - Success response - application/json
    * @return {ApiError} 400 - Error: Bad Request - application/json
*/
router.post('/signup', userController.signup); // pour s'inscrire sur le site

/**
    * POST /user/signin
    * @summary Sign in for a user
    * @tags User
    * @param {InputUser} request.body.required - user info
    * @return {User} 200 - Success response - application/json
    * @return {ApiError} 400 - Error: Bad Request - application/json
    * @return {ApiError} 401 - Error: Unauthorized - application/json
*/
router.post('/signin', userController.signin) // pour se connecter au site

/**
     * PATCH /user/{id}
     * @summary Update one user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @param {InputUser} request.body.required - user info
     * @return {User} 200 - Success response - application/json
     * @return {ApiError} 400 - Error: Bad Request - application/json
     * @return {ApiError} 404 - Error: User not found - application/json
*/
router.patch('/:id(\\d+)', isMember, userController.updateOneUser); // pour modifier ses données en tant qu'utilisateur connecté

/**
     * DELETE /user/{id}
     * @summary Delete one user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return 200 - success response - application/json
     * @return {ApiError} 400 - Error: Bad Request - application/json
     * @return {ApiError} 404 - User not found - application/json
*/
router.delete('/:id(\\d+)', isMember, userController.deleteOneUser) // pour supprimer son compte utilisateur

export default router;