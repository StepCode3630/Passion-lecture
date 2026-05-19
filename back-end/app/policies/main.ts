/*
|--------------------------------------------------------------------------
| Bouncer policies
|--------------------------------------------------------------------------
|
| You may define a collection of policies inside this file and pre-register
| them when creating a new bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

// on ne charge plus comment policies car on gère les droits d'accès à la suppression de commentaires directement dans le CommentsController (seul un admin peut supprimer un commentaire)
export const policies = {}
