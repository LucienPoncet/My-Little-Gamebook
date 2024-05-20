import { storyDataMapper } from "../dataMappers/index.js";
import { manageResponse } from "../helper/controllerHelper.js";

const storyController = {
    // Pour récupérer toutes les histoires proposées sur l'appli.
    async getAllStories(req, res, next) {
        try {
            const { result, error } = await storyDataMapper.findAll();
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer les histoires par genre.
    async getAllStoriesByGenre(req, res, next) {
        try {
            const { genreId } = req.params;
            const { result, error } = await storyDataMapper.findByGenre(genreId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer les histoires par niveau de difficulté.
    async getAllStoriesByLevel(req, res, next) {
        try {
            const { levelId } = req.params;
            const { result, error } = await storyDataMapper.findByLevel(levelId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer une histoire, par son id.
    async getOneStory(req, res, next) {
        try {
            const { id } = req.params;
            const { result, error } = await storyDataMapper.findById(id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    }
};

export { storyController };