Football Shirt Le bon Coin

Description

Ce site web a été créé pour permettre aux utilisateurs de gérer des maillots de football. Il offre la possibilité de visualiser, créer, modifier et supprimer des maillots de football. Les utilisateurs peuvent également créer un compte personnel, se connecter à ce compte et consulter leurs propres informations ainsi que leurs maillots. Le site est doté d'une Navbar intuitive pour faciliter la navigation entre les différentes sections du site, et un bouton Logout qui permet de se déconnecter facilement.

Fonctionnalités

    Créer un compte utilisateur : Les utilisateurs peuvent s'inscrire en fournissant leur nom, email et mot de passe.
    Se connecter : Après l'inscription, les utilisateurs peuvent se connecter à leur compte en utilisant leur email et mot de passe.
    Consulter et modifier le profil : Une fois connectés, les utilisateurs peuvent voir et modifier leurs informations personnelles dans la section Profile.
    Gestion des maillots : Les utilisateurs peuvent visualiser les maillots disponibles, en créer de nouveaux, modifier les existants ou les supprimer dans la section Shirt.
    Déconnexion : Un bouton Logout permet aux utilisateurs de se déconnecter et de revenir à la page d'accueil.

Technologies utilisées

    React.js pour le front-end.
    Axios pour les requêtes HTTP.
    Node.js pour le back-end .
    MongoDB pour la gestion de la base de données.

Complications/Défauts
    Pour le token , vous avez pu voir que le token fonctionnait bizarrement , il fonctionnait bien sur login , get mais update par exemple il me mettait token invalide . Du coup , comme vous m'avez dit j'ai du adapter mes fonctions login , get etc ... 

    Au niveau de la modification des Users , tout fonctionne au niveau du backend (Postman effectue bien les fonctions demandés ), 
    mais au niveau du front les fonctions tel que update ou delete ne fonctionne pas alors que get , create , login fonctionne bien 
    Au niveau des maillots , dans le back end avec Postman certaines fonctions s'execute bien (create , get) , seulement il y a get qui marche en front , sinon les update et delete n'arrivent pas à faire le lien avec le back 


Avenir et Améliorations

    Ajout de fonctionnalités supplémentaires pour filtrer les maillots par club ou par joueur.
    Amélioration de la sécurité avec la gestion des rôles utilisateurs.

Auteurs

    Cherif Amine 