<u>MLD</u>

User(<u>user_id</u>, lastname, firstname, alias, email, password, avatar)

Story(<u>story_id</u>, name, level, description, #genre_id)

Genre(<u>genre_id</u>, label, img)

Compartment(<u>compartment_id</u>, position, #story_id, #place_id, #npc_id)

World(<u>world_id</u>, label, img)

Place(<u>place_id</u>, label, img, #world_id)

NPC(<u>npc_id</u>, label, img, #world_id)

Item(<u>item_id</u>, label, img)

Action(<u>action_id</u>, label, consequence, img)

user_has_item(#user_id, #item_id)

action_has_item(#action_id, #item_id)

story_has_genre(#story_id, #genre_id)

compartment_has_action(#compartment_id, #action_id)

place_has_world(#place_id, #world_id)

NPC_has_action(#npc_id, #action_id)