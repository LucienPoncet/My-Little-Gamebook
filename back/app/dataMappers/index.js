// Index des dataMappers pour les centraliser et renvoyer les appels des fonctions vers le dataMapper en question souhaité

// On importe tous les dataMappers existants dans chaque fichier qui porte son nom
import { storyDataMapper } from "./story.js";
import { genreDataMapper } from "./genre.js";
import { compartmentDataMapper } from "./compartment.js";
import { worldDataMapper } from "./world.js";
import { placeDataMapper } from "./place.js";
import { npcDataMapper } from "./npc.js";
import { itemDataMapper } from "./item.js";
import { actionDataMapper } from "./action.js";
import { userDataMapper } from "./user.js";

// et on les exporte pour qu'ils soient utilisables
export {
    storyDataMapper,
    genreDataMapper,
    compartmentDataMapper,
    worldDataMapper,
    placeDataMapper,
    npcDataMapper,
    itemDataMapper,
    actionDataMapper,
    userDataMapper
}