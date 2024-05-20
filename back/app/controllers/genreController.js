import { genreDataMapper } from "../dataMappers/index.js";
import { manageResponse } from "../helper/controllerHelper.js";

const genreController = {
    // Pour récupérer tous les genres.
    async getAllGenres(req, res, next) {
        try {
            const { result, error } = await genreDataMapper.findAll();
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer un genre, par son id.
    async getOneGenre(req, res, next) {
        try {
            const { id } = req.params;
            const { result, error } = await genreDataMapper.findById(id);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
    // Pour récupérer tous les genres associés à une histoire.
    async getAllGenresOfAStory(req, res, next) {
        try {
            // Récupération de l'id de l'histoire concernée.
            const { storyId } = req.params;
            const { result, error } = await genreDataMapper.findAllGenresOfAStory(storyId);
            // Appel de la fonction de controllerHelper pour gérer la réponse. 
            manageResponse(res, result, error, next);
        } catch (error) {
            next(error);
        }
    },
};

export { genreController };