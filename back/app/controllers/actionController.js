import { actionDataMapper } from "../dataMappers/index.js";
import { manageResponse } from "../helper/controllerHelper.js";

const actionController = {
    // Pour récupérer toutes les actions existantes en tant qu'utilisateur connecté.
    async getAllActions(req, res, next) {
        try {
            const { result, error } = await actionDataMapper.findAll();
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer une action, par son id, en tant qu'utilisateur connecté.
    async getOneAction(req, res, next) {
        try {
            const { id } = req.params;
            const { result, error } = await actionDataMapper.findById(id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // pour récupérer toutes les actions associées à un personnage spécifique en tant qu'utilisateur connecté.
    async getAllActionsByNpc(req, res, next) {
        try {
            const { npcId } = req.params;
            const { result, error } = await actionDataMapper.findByNpc(npcId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer toutes les actions associées à un objet spécifique en tant qu'utilisateur connecté.
    async getAllActionsByItem(req, res, next) {
        try {
            const { itemId } = req.params;
            const { result, error } = await actionDataMapper.findByItem(itemId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer toutes les actions d'une certaine classe en tant qu'utilisateur connecté.
    async getAllActionsByClass(req, res, next) {
        try {
            const { actionClassName } = req.params;
            const { result, error } = await actionDataMapper.findByClass(actionClassName);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // pour récupérer toutes les actions associées à une case spécifique en tant qu'utilisateur connecté.
    async getAllActionsByCompartment(req, res, next) {
        try {
            const { compartmentId } = req.params;
            const { result, error } = await actionDataMapper.findByCompartment(compartmentId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
};

export { actionController };