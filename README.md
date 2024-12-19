Football Shirt Le Bon Coin
Description

Ce site web a été créé pour permettre aux utilisateurs de gérer des maillots de football. Il offre la possibilité de :

    Visualiser
    Créer
    Modifier
    Supprimer
    des maillots de football.

Les utilisateurs peuvent également :

    Créer un compte personnel
    Se connecter à ce compte
    Consulter leurs informations personnelles
    Naviguer facilement grâce à une Navbar intuitive
    Un bouton Logout permet de se déconnecter rapidement et de revenir à la page d'accueil.

Fonctionnalités

    Créer un compte utilisateur
        Les utilisateurs peuvent s'inscrire en fournissant leur nom, email et mot de passe.

    Se connecter
        Après l'inscription, les utilisateurs peuvent se connecter à leur compte en utilisant leur email et mot de passe.

    Consulter et modifier le profil
        Une fois connectés, les utilisateurs peuvent voir et modifier leurs informations personnelles dans la section Profile.

    Gestion des maillots
        Visualiser les maillots disponibles.
        Créer de nouveaux maillots.
        Modifier les maillots existants.
        Supprimer des maillots dans la section Shirt.

    Déconnexion
        Un bouton Logout permet de se déconnecter et de revenir à la page d'accueil.

Technologies utilisées

    React.js : Front-end dynamique et réactif.
    Axios : Gestion des requêtes HTTP.
    Node.js : Back-end avec API RESTful.
    MongoDB : Base de données robuste et flexible.

Complications/Défauts :

-Problème avec le token

    Le token fonctionne correctement pour des actions comme login et get, mais des erreurs apparaissent pour certaines actions comme update.
    Les fonctions ont dû être adaptées pour contourner ce problème.

-Problèmes au niveau des utilisateurs

    Backend : Les fonctions fonctionnent correctement via Postman.
    Frontend : Ces mêmes fonctions ne s'exécutent pas correctement, bien que get, create, et login fonctionnent.

-Problèmes au niveau des maillots

    Backend : Les fonctions get et update sont opérationnelles via Postman.
    Frontend : Seule la fonction get fonctionne correctement, tandis que update et delete échouent à établir un lien.

Avenir et Améliorations

    Ajouter des fonctionnalités pour filtrer les maillots par club ou joueur.
    Renforcer la sécurité avec une gestion des rôles utilisateurs.

Auteur

    Cherif Amine
