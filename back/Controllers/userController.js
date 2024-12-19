const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const registerUser = async (req, res) => {
    
  try {
    console.log(req.body);
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save().then((users)=>console.log(users));

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// Route GET pour récupérer tous les utilisateurs
const GetUser = async (req, res) => {
    try {
      const users = await User.find().then((users)=>res.json({users})); // Récupérer tous les utilisateurs
       // Retourner les utilisateurs au format JSON
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  };

const GetUserByEmail = async (req, res) => {
    try {
      const email = req.params.email; // Récupérer l'email à partir de la route
      const user = await User.findOne({ email }); // Recherche l'utilisateur par son email
      
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      // Retourner les informations de l'utilisateur sans le mot de passe
      res.json({
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' });
    }
  };
  




const Login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).send("Utilisateur introuvable");
      }
  
      const isMatch = await bcrypt.compare(req.body.password, user.password);
  
      if (!isMatch) {
        return res.status(400).send("Mot de passe incorrect");
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email }, // payload : chargement des données à transporter
        process.env.JWT_SECRET, // clé secrète pour protéger le token
        { expiresIn: process.env.JWT_EXPIRES_IN } // les options du token, en locurrence la durée de validité
      );
      res.status(200).send({ message: "Connecté", token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password");
      if (!user) {
        return res.status(404).send({ error: "Utilisateur introuvable" });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) {
        return res.status(404).send({ error: "Utilisateur introuvable" });
      }
      res.status(200).send({ message: "Utilisateur supprimé" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
module.exports = { registerUser, GetUser,Login, updateUser, deleteUser ,GetUserByEmail };

