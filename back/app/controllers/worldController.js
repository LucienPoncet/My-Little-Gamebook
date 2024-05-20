import { worldDataMapper } from "../dataMappers/index.js";
import { manageResponse } from "../helper/controllerHelper.js";

const worldController = {
    // Pour récupérer tous les univers existants.
    async getAllWorlds(req, res, next) {
        try {
            const { result, error } = await worldDataMapper.findAll();
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer un univers, par son id.
    async getOneWorld(req, res, next) {
        try {
            const { id } = req.params;
            const { result, error } = await worldDataMapper.findById(id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    }
};

export { worldController };