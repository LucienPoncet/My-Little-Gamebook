import { itemDataMapper } from "../dataMappers/index.js";
import { manageResponse } from "../helper/controllerHelper.js";

const itemController = {
    // Pour récupérer tous les objets existants en tant qu'utilisateur connecté.
    async getAllItems(req, res, next) {
        try {
            const { result, error } = await itemDataMapper.findAll();
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer un item, par son id, en tant qu'utilisateur connecté. // changer en addItemToInventory car redondant sinon?
    async getOneItem(req, res, next) {
        try {
            const { id } = req.params;
            const { result, error } = await itemDataMapper.findById(id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer les objets associés à une action spécifique en tant qu'utilisateur connecté.
    async getAllItemsByAction(req, res, next) {
        try {
            const { actionId } = req.params;
            const { result, error } = await itemDataMapper.findByAction(actionId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    
};

export { itemController };