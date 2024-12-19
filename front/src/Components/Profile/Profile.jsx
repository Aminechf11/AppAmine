import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/'); // Rediriger vers la page de login si le token n'est pas présent
      return;
    }

    // Décoder le token JWT pour extraire l'email de l'utilisateur
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userEmail = decodedToken.email;

    // Récupérer les informations de l'utilisateur par son email
    axios
      .get(`http://127.0.0.1:8080/users/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data); // Mettre à jour l'état avec les données de l'utilisateur
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      });
  }, [token, navigate]);

  const handleEditName = () => {
    setEditingName(true);
    setNewName(user.name); // Remplir avec le nom actuel de l'utilisateur
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
    setNewEmail(user.email); // Remplir avec l'email actuel de l'utilisateur
  };

  const handleSaveName = () => {
    if (!newName) return; // Vérifier que le champ nom n'est pas vide

    const userId = user.id; // ID de l'utilisateur à mettre à jour
    console.log(userId)
    axios
      .put(
        `http://127.0.0.1:8080/update/${userId}`, // Utilisation de l'ID de l'utilisateur dans l'URL
        { name: newName }, // Envoi des données à mettre à jour (ici le nom)
      )
      .then((response) => {
        console.log('Utilisateur mis à jour:', response.data);
        setUser(response.data); // Mise à jour de l'utilisateur dans le frontend
        setNewName(''); // Réinitialiser le champ de texte
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du nom:', error);
      });
};

  const handleSaveEmail = () => {
    if (!newEmail) return; // Vérifier que l'email n'est pas vide
    axios
      .put(
        `http://127.0.0.1:8080/update/${user._id}`,
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUser(response.data); // Mettre à jour l'utilisateur avec les nouvelles données
        setEditingEmail(false); // Fermer l'édition de l'email
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de l\'email:', error);
      });
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-details">
        <h1>Mon Profil</h1>
        
        {/* Affichage du nom */}
        <p>
          <strong>Nom :</strong>
          {editingName ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nouveau nom"
              />
              <button onClick={handleSaveName}>Sauvegarder</button>
            </>
          ) : (
            <>
              {user.name}
              <button onClick={handleEditName}>Modifier</button>
            </>
          )}
        </p>

        {/* Affichage de l'email */}
        <p>
          <strong>Email :</strong>
          {editingEmail ? (
            <>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Nouvel email"
              />
              <button onClick={handleSaveEmail}>Sauvegarder</button>
            </>
          ) : (
            <>
              {user.email}
              <button onClick={handleEditEmail}>Modifier</button>
            </>
          )}
        </p>
        <p><strong>Mot de passe :</strong> ********</p> {/* Masqué pour des raisons de sécurité */}
      </div>
    </div>
  );
};

export default Profile;
