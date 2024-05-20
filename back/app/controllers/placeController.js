import { placeDataMapper } from "../dataMappers/index.js";
import { manageResponse } from "../helper/controllerHelper.js";

const placeController = {
    // Pour récupérer tous les lieux existants en tant qu'utilisateur connecté.
    async getAllPlaces(req, res, next) {
        try {
            const { result, error } = await placeDataMapper.findAll();
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer un lieu, par son id, en tant qu'utilisateur connecté.
    async getOnePlace(req, res, next) {
        try {
            const { id } = req.params;
            const { result, error } = await placeDataMapper.findById(id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer tous les lieux existants par univers, en tant qu'utilisateur connecté.
    async getAllPlacesByWorld(req, res, next) {
        try {
            const { worldId } = req.params;
            const { result, error } = await placeDataMapper.findByWorld(worldId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
};

export { placeController };