const Shirt = require("../Models/shirtModel");
const mongoose = require('mongoose');


const createShirt = async (req, res) => {
  try {
    console.log(req.body);

    // Vérification de la présence des champs nécessaires
    const { clubName, playerNumber, playerName, price, authorId } = req.body;

    if (!clubName || !playerNumber || !playerName || !price || !authorId) {
      return res.status(400).send({ error: "Tous les champs sont requis : clubName, playerNumber, playerName, price, authorId" });
    }

    // Création du maillot avec les informations fournies dans le corps de la requête
    const shirt = new Shirt({
      clubName,
      playerNumber,
      playerName,
      price,
      author: authorId,  // Utiliser l'ID de l'auteur passé dans la requête
    });

    // Sauvegarde du maillot dans la base de données
    await shirt.save();

    // Réponse avec le maillot créé
    res.status(201).send(shirt);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const getShirts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.clubName) {
      filter.clubName = { $regex: req.query.clubName, $options: "i" };
    }
    if (req.query.playerName) {
      filter.playerName = { $regex: req.query.playerName, $options: "i" };
    }
    if (req.query.playerNumber) {
      filter.playerNumber = req.query.playerNumber;
    }
    if (req.query.price) {
      filter.price = { $lte: req.query.price }; // Option de filtrage par prix
    }

    const shirts = await Shirt.find(filter).populate('author', 'username email');  // Remplir l'auteur

    res.status(200).send(shirts);  // Réponse avec les maillots récupérés
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateShirt = async (req, res) => {
  try {
    const { shirtId } = req.body;
    const updateData = req.body.updateData || {};

    // Vérification de l'existence de l'ID du maillot
    if (!shirtId) {
      return res.status(400).send({ error: "L'ID du maillot est requis pour la mise à jour." });
    }

    // Vérification des données de mise à jour
    if (Object.keys(updateData).length === 0) {
      return res.status(400).send({ error: "Les données de mise à jour ne peuvent pas être vides." });
    }

    // Mise à jour du maillot dans la base de données
    const updatedShirt = await Shirt.findByIdAndUpdate(shirtId, updateData, { new: true })
      .populate('author', 'username email'); // Remplir les données de l'auteur

    // Vérification si le maillot à mettre à jour existe
    if (!updatedShirt) {
      return res.status(404).send({ error: "Maillot introuvable." });
    }

    // Réponse avec le maillot mis à jour
    res.status(200).send(updatedShirt);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const deleteShirt = async (req, res) => {
  try {
    // Récupérer l'ID du maillot depuis le corps de la requête
    const { shirtId } = req.body;
    // Vérifier si l'ID est défini
    if (!shirtId) {
      return res.status(400).send({ error: "L'ID du maillot est requis" });
    }

    // Vérifier si l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(shirtId)) {
      return res.status(400).send({ error: "ID de maillot invalide" });
    }

    // Tenter de supprimer le maillot de la base de données
    const deletedShirt = await Shirt.findByIdAndDelete(shirtId);

    // Vérifier si le maillot a été trouvé et supprimé
    if (!deletedShirt) {
      return res.status(404).send({ error: "Maillot introuvable" });
    }

    // Répondre avec un message de succès
    res.status(200).send({ message: "Maillot supprimé avec succès" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = {
  createShirt,
  getShirts,
  updateShirt,
  deleteShirt,
};
