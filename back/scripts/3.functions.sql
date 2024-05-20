BEGIN;

ALTER DEFAULT PRIVILEGES FOR ROLE admin_gamebook IN SCHEMA public
GRANT EXECUTE ON FUNCTIONS TO gamebook;


-- Story :

-- Pour récupérer et afficher toutes les histoires :
CREATE OR REPLACE FUNCTION get_all_stories() RETURNS SETOF json AS $$
	SELECT json_build_object(
    'id',story.id,
    'name',story.name,
    'level',story.level,
    'description',story.description,
    'img',(SELECT place.img FROM place JOIN compartment ON place.id = compartment.place_id WHERE story.id = compartment.story_id AND compartment.class = 'beginning')
    ) FROM story;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher toutes les histoires selon un genre choisi :
CREATE OR REPLACE FUNCTION get_all_stories_by_genre(int) RETURNS SETOF story AS $$
	SELECT DISTINCT story FROM story_has_genre JOIN story ON story.id = story_has_genre.story_id WHERE genre_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher toutes les histoires selon un niveau choisi :
CREATE OR REPLACE FUNCTION get_all_stories_by_level(int) RETURNS SETOF story AS $$
	SELECT * FROM story WHERE level=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer une histoire en particulier :
CREATE OR REPLACE FUNCTION get_story_by_id(int) RETURNS story AS $$
	SELECT * FROM story WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;



-- Genre :

-- Pour récupérer et afficher tous les genres :
CREATE OR REPLACE FUNCTION get_all_genres() RETURNS SETOF genre AS $$
	SELECT * FROM genre;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher le ou les genres appliqué(s) à une histoire :
CREATE OR REPLACE FUNCTION get_all_genres_of_a_story(int) RETURNS SETOF genre AS $$
	SELECT DISTINCT genre FROM story_has_genre JOIN genre ON genre.id = story_has_genre.genre_id WHERE story_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer un genre en particulier :
CREATE OR REPLACE FUNCTION get_genre_by_id(int) RETURNS genre AS $$
	SELECT * FROM genre WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;



-- Compartment :

-- Pour récupérer et afficher toutes les cases :
CREATE OR REPLACE FUNCTION get_all_compartments() RETURNS SETOF json AS $$
SELECT json_build_object(
    'id',compartment.id,
    'position',compartment.position,
    'class',compartment.class,
    'children',compartment.class,
    'place_id',compartment.place_id,
    'npc_id',compartment.npc_id,
    'story_id',compartment.story_id,
    'place_label',(SELECT label FROM place WHERE place.id = compartment.place_id),
    'place_img',(SELECT img FROM place WHERE place.id = compartment.place_id),
    'npc_label',(SELECT label FROM npc WHERE npc.id = compartment.npc_id),
    'npc_img',(SELECT img FROM npc WHERE npc.id = compartment.npc_id),
    'action1_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action2_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1)
    ) FROM compartment;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher toutes les cases selon une classe choisie :
CREATE OR REPLACE FUNCTION get_all_compartments_by_class(TEXT) RETURNS SETOF json AS $$
SELECT json_build_object(
    'id',compartment.id,
    'position',compartment.position,
    'class',compartment.class,
    'children',compartment.class,
    'place_id',compartment.place_id,
    'npc_id',compartment.npc_id,
    'story_id',compartment.story_id,
    'place_label',(SELECT label FROM place WHERE place.id = compartment.place_id),
    'place_img',(SELECT img FROM place WHERE place.id = compartment.place_id),
    'npc_label',(SELECT label FROM npc WHERE npc.id = compartment.npc_id),
    'npc_img',(SELECT img FROM npc WHERE npc.id = compartment.npc_id),
    'action1_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action2_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1)
    ) FROM compartment WHERE class=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher toutes les cases d'une seule histoire de manière complète en un array rempli d'objets json :
CREATE OR REPLACE FUNCTION get_all_compartments_by_story(int) RETURNS SETOF json AS $$
	SELECT json_build_object(
    'id',compartment.id,
    'position',compartment.position,
    'class',compartment.class,
    'children',compartment.class,
    'place_id',compartment.place_id,
    'npc_id',compartment.npc_id,
    'story_id',compartment.story_id,
    'place_label',(SELECT label FROM place WHERE place.id = compartment.place_id),
    'place_img',(SELECT img FROM place WHERE place.id = compartment.place_id),
    'npc_label',(SELECT label FROM npc WHERE npc.id = compartment.npc_id),
    'npc_img',(SELECT img FROM npc WHERE npc.id = compartment.npc_id),
    'action1_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action2_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1)
    ) FROM compartment WHERE story_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher toutes les cases selon une classe choisie d'une seule histoire :
CREATE OR REPLACE FUNCTION get_all_compartments_by_story_and_by_class(int, TEXT) RETURNS SETOF json AS $$
SELECT json_build_object(
    'id',compartment.id,
    'position',compartment.position,
    'class',compartment.class,
    'children',compartment.class,
    'place_id',compartment.place_id,
    'npc_id',compartment.npc_id,
    'story_id',compartment.story_id,
    'place_label',(SELECT label FROM place WHERE place.id = compartment.place_id),
    'place_img',(SELECT img FROM place WHERE place.id = compartment.place_id),
    'npc_label',(SELECT label FROM npc WHERE npc.id = compartment.npc_id),
    'npc_img',(SELECT img FROM npc WHERE npc.id = compartment.npc_id),
    'action1_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action2_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1)
    ) FROM compartment WHERE class=$2 AND story_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher la case de la classe 'beginning' d'une seule histoire :
CREATE OR REPLACE FUNCTION get_compartment_by_story_and_by_class_beginning(int) RETURNS SETOF json AS $$
SELECT json_build_object(
    'id',compartment.id,
    'position',compartment.position,
    'class',compartment.class,
    'children',compartment.class,
    'place_id',compartment.place_id,
    'npc_id',compartment.npc_id,
    'story_id',compartment.story_id,
    'place_label',(SELECT label FROM place WHERE place.id = compartment.place_id),
    'place_img',(SELECT img FROM place WHERE place.id = compartment.place_id),
    'npc_label',(SELECT label FROM npc WHERE npc.id = compartment.npc_id),
    'npc_img',(SELECT img FROM npc WHERE npc.id = compartment.npc_id),
    'action1_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action2_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1)
    ) FROM compartment WHERE class='beginning' AND story_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer une case en particulier :
CREATE OR REPLACE FUNCTION get_compartment_by_id(int) RETURNS json AS $$
	SELECT json_build_object(
    'id',compartment.id,
    'position',compartment.position,
    'class',compartment.class,
    'children',compartment.class,
    'place_id',compartment.place_id,
    'npc_id',compartment.npc_id,
    'story_id',compartment.story_id,
    'place_label',(SELECT label FROM place WHERE place.id = compartment.place_id),
    'place_img',(SELECT img FROM place WHERE place.id = compartment.place_id),
    'npc_label',(SELECT label FROM npc WHERE npc.id = compartment.npc_id),
    'npc_img',(SELECT img FROM npc WHERE npc.id = compartment.npc_id),
    'action1_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action1_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id LIMIT 1),
    'action2_id',(SELECT action_id FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_label',(SELECT action.label FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_class',(SELECT action.class FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_consequence',(SELECT action.consequence FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_img',(SELECT action.img FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_child',(SELECT child FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1),
    'action2_item_id',(SELECT item FROM compartment_has_action WHERE compartment.id = compartment_has_action.compartment_id ORDER BY action_id DESC LIMIT 1)
    ) FROM compartment WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;



-- World :

-- Pour récupérer et afficher tous les univers :
CREATE OR REPLACE FUNCTION get_all_worlds() RETURNS SETOF world AS $$
	SELECT * FROM world;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer un univers en particulier :
CREATE OR REPLACE FUNCTION get_world_by_id(int) RETURNS world AS $$
	SELECT * FROM world WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;



-- Place :

-- Pour récupérer et afficher tous les lieux :
CREATE OR REPLACE FUNCTION get_all_places() RETURNS SETOF place AS $$
	SELECT * FROM place;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher tous les lieux selon un univers choisi :
CREATE OR REPLACE FUNCTION get_all_places_by_world(int) RETURNS SETOF place AS $$
	SELECT DISTINCT place FROM place_has_world JOIN place ON place.id = place_has_world.place_id WHERE world_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer un lieu en particulier :
CREATE OR REPLACE FUNCTION get_place_by_id(int) RETURNS place AS $$
	SELECT * FROM place WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;



-- NPC :

-- Pour récupérer et afficher tous les personnages :
CREATE OR REPLACE FUNCTION get_all_npcs() RETURNS SETOF npc AS $$
	SELECT * FROM npc;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher tous les personnages selon un univers choisi :
CREATE OR REPLACE FUNCTION get_all_npcs_by_world(int) RETURNS SETOF npc AS $$
	SELECT DISTINCT npc FROM npc_has_world JOIN npc ON npc.id = npc_has_world.npc_id WHERE world_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer un personnage en particulier :
CREATE OR REPLACE FUNCTION get_npc_by_id(int) RETURNS npc AS $$
	SELECT * FROM npc WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;


-- Item :

-- Pour récupérer et afficher tous les objets :
CREATE OR REPLACE FUNCTION get_all_items() RETURNS SETOF item AS $$
	SELECT * FROM item;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher le ou les objet(s) associé(s) à une action :
CREATE OR REPLACE FUNCTION get_all_items_by_action(int) RETURNS SETOF item AS $$
	SELECT DISTINCT item FROM action_has_item JOIN item ON item.id = action_has_item.item_id WHERE action_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer un objet en particulier :
CREATE OR REPLACE FUNCTION get_item_by_id(int) RETURNS item AS $$
	SELECT * FROM item WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;



-- Action :

-- Pour récupérer et afficher toutes les actions :
CREATE OR REPLACE FUNCTION get_all_actions() RETURNS SETOF action AS $$
	SELECT * FROM action;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher la ou les action(s) associée(s) à un personnage :
CREATE OR REPLACE FUNCTION get_all_actions_by_npc(int) RETURNS SETOF action AS $$
	SELECT DISTINCT action FROM npc_has_action JOIN action ON action.id = npc_has_action.action_id WHERE npc_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher la ou les action(s) associée(s) à un objet :
CREATE OR REPLACE FUNCTION get_all_actions_by_item(int) RETURNS SETOF action AS $$
	SELECT DISTINCT action FROM action_has_item JOIN action ON action.id = action_has_item.action_id WHERE item_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher toutes les actions selon une classe choisie :
CREATE OR REPLACE FUNCTION get_all_actions_by_class(TEXT) RETURNS SETOF action AS $$
	SELECT * FROM action WHERE class=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer et afficher toutes les actions d'une case :
CREATE OR REPLACE FUNCTION get_all_actions_by_compartment(int) RETURNS SETOF json AS $$
	SELECT json_build_object('id',action.id, 'label',action.label, 'class',action.class, 'consequence',action.consequence, 'img',action.img, 'child',child, 'item',item) "choice" FROM compartment_has_action JOIN action ON action.id = compartment_has_action.action_id WHERE compartment_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer une action en particulier :
CREATE OR REPLACE FUNCTION get_action_by_id(int) RETURNS action AS $$
	SELECT * FROM action WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;



-- User :

-- Pour créer un utilisateur :
CREATE OR REPLACE FUNCTION add_user(u json) RETURNS "user" AS $$
	INSERT INTO "user"
	(password,alias,avatar)
	VALUES
	(
		u->>'password',
        u->>'alias',
        u->>'avatar'
	)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour vérifier via le login qu'un utilisateur existe réellement afin de le connecter :
CREATE OR REPLACE FUNCTION verify_user(json) RETURNS json AS $$
DECLARE
	user_found json;
BEGIN
	SELECT json_build_object(
		'id',id,
		'alias',alias,
        'avatar',avatar,
		'password',password
	) INTO user_found
	FROM "user"
	WHERE alias = $1->>'alias';
	
	IF user_found IS NOT NULL
	THEN
		return user_found;
	ELSE
		return null;
	END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pour récupérer un utilisateur en particulier :
CREATE OR REPLACE FUNCTION get_user_by_id(int) RETURNS SETOF json AS $$
SELECT json_build_object(
    'id',"user".id,
    'alias',"user".alias,
    'avatar',"user".avatar
    ) FROM "user" WHERE "id"=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour récupérer un utilisateur en particulier via son alias :
CREATE OR REPLACE FUNCTION get_user_by_alias(TEXT) RETURNS SETOF json AS $$
SELECT json_build_object(
    'id',"user".id,
    'alias',"user".alias,
    'avatar',"user".avatar
    ) FROM "user" WHERE "alias"=$1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour modifier un utilisateur :
CREATE OR REPLACE FUNCTION update_user(u json) RETURNS "user" AS $$
	UPDATE "user" SET
		"alias"=u->>'alias',
		"avatar"=u->>'avatar'
	WHERE "id"=(u->>'id')::int
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

-- Pour supprimer un utilisateur :
CREATE OR REPLACE FUNCTION delete_user(int) RETURNS void AS $$
	DELETE FROM "user"
	WHERE "id"=$1;
$$ LANGUAGE sql SECURITY DEFINER;

COMMIT;