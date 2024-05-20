import { userDataMapper } from "../dataMappers/index.js";
import { manageResponse } from "../helper/controllerHelper.js";

import JWT from "../services/jwt.js";
import APIError from "../services/errorHandler/APIError.js";
import { encodePassword, passwordMatch } from "../services/security.js";
import schema from "../services/passwordPolicy.js";

const userController = {
    // Pour afficher les données de l'utilisateur (lastname, avatar, etc)
    async getCurrentUser(req, res, next) {
        try {
            // Récupération du token de l'utilisateur
            const token = req.get("Authorization");
            // Vérification du token de l'utilisateur
            const user = JWT.decode(token);
            const { result, error } = await userDataMapper.getUser(user.result.id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour s'inscrire sur le site
    async signup(req, res, next) {
        try {
            const user = req.body;
            // On vérifie si le pseudo est déjà pris
            const existingUser = await userDataMapper.getUserByAlias(user.alias);
            if (existingUser.result) {
            return res.status(409).json({ error: "Ce pseudo est déjà pris, tu dois en choisir un autre !" });
            }
            // Vérification du format de mdp
            if(!schema.validate(user.password)) {
                const error = new APIError('Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et minuscule, 1 chiffre et 1 caractère spécial.', 400);
                return next(error);
            } else {
            // Chiffrement du mot de passe
            user.password = await encodePassword(user.password);
            // Récupérer les infos de l'utilisateur qui s'inscrit en appelant la méthode createUser.
            const { result, error } = await userDataMapper.createUser(user);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
            }
        } catch (error) {
            next(error);
        }
    },
    // Pour se connecter au site
    async signin(req, res, next) {
        try {
            // Récupération du formulaire
            const login = req.body;
            // Récupérer les informations de l'utilisateur en appelant la méthode authenticateUser
            let { result, error } = await userDataMapper.authenticateUser(login);
            const user = result.verify_user;
            // Comparaison du mdp BDD / formulaire
            if (user && await passwordMatch(login.password, user.password)) {
                // Génération du token
                const token = JWT.encode(user);
                user.token = token;
            } else {
                error = new APIError("Identifiants incorrects.", 401);
            }
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, user, error, next);
            
        } catch (error) {
            next(error);
        }           
    },
    // Pour modifier ses données en tant qu'utilisateur connecté
    async updateOneUser(req, res, next) {
        try {
            // Récupération du token de l'utilisateur
            const token = req.get("Authorization");
            // Vérification du token de l'utilisateur
            const user = JWT.decode(token);
            // Vérifier si l'utilisateur est autorisé à modifier le compte
        if (!user) {
            throw new Error("Unauthorized", 401);
        }
            // Récupérer l'utilisateur concerné
            const { result: userToUpdate, error: getUserError} = await userDataMapper.getUser(user.result.id);
            // Utilisateur trouvé ?
            if(getUserError){
                next(getUserError);
            // On vérifie que que l'id de l'utilisateur connecté est le même que celui de l'utilisateur à modifier.
            } else if (user.result.id !== userToUpdate.id) {
                throw new Error("Unauthorized", 401);
            } else {
                 // Couche de contrôle en plus du côté client : on vérifie qe l'alias n'est pas une chaîne de caractères vide
            if (!req.body.alias || !req.body.alias.trim()) {
                throw new Error("Alias is required", 400); // Return 400 Bad Request
            }
                // Màj des valeurs dans l'objet
                const updatedUser = { ...userToUpdate, ...req.body };            
                //  Màj en BDD
                const { result: updatedResult, error: updateError } = await userDataMapper.updateUser(updatedUser);
                // Vérification d'erreur
                if (updateError) {
                    next(updateError);
                } else {
                    res.json(updatedResult);
                }
            }
        } catch (error) {
            next(error);
        }
    },
    // Pour supprimer son compte utilisateur
    async deleteOneUser(req, res, next) {
        try {
            // Récupération du token de l'utilisateur
        const token = req.get("Authorization");
        // Vérification du token de l'utilisateur
        const user = JWT.decode(token);
        // Vérifier si l'utilisateur est autorisé à supprimer le compte
        if (!user) {
            throw new Error("Unauthorized", 401);
        }
        // Récupérer l'utilisateur à supprimer
        const { result: userToDelete, error: getUserError } = await userDataMapper.getUser(req.params.id);
        if (getUserError) {
            throw getUserError; 
        }
        // On vérifie que l'id de l'utilisateur connecté est le même que celui de l'utilisateur à supprimer
        if (user.result.id !== userToDelete.id) {
            throw new Error("Unauthorized", 401);
        }
            // Appeler la méthode delete
            const { result, error } = await userDataMapper.deleteUser(req.params.id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
            } catch (error) {
            next(error);
        }
    },
};

export { userController };