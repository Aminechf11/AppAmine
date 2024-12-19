import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import "./Shirt.css"

const Shirt = () => {
  const [shirts, setShirts] = useState([]); // Pour stocker la liste des maillots
  const [loading, setLoading] = useState(true); // Pour afficher un message de chargement pendant que les données sont récupérées
  const [error, setError] = useState(null); // Pour stocker une erreur en cas de problème
  const [newShirt, setNewShirt] = useState({
    clubName: '',
    playerNumber: '',
    playerName: '',
    price: ''
  }); // Pour gérer les données du formulaire de création

  useEffect(() => {
    // Effect pour récupérer la liste des maillots
    axios
      .get('http://127.0.0.1:8080/Shirt')  // Assurez-vous que l'URL est correcte
      .then((response) => {
        setShirts(response.data);  // Mettre à jour l'état avec les données des maillots
        setLoading(false);  // Modifier l'état de chargement une fois les données récupérées
      })
      .catch((error) => {
        setError('Erreur de chargement des maillots');  // Afficher une erreur si la récupération échoue
        setLoading(false);
      });
  }, []); // [] signifie que cet effect se lance une seule fois lors du premier rendu du composant

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShirt({
      ...newShirt,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification pour s'assurer que tous les champs sont remplis
    if (!newShirt.clubName || !newShirt.playerNumber || !newShirt.playerName || !newShirt.price) {
      alert('Tous les champs doivent être remplis');
      return;
    }

    // Envoi des données pour créer un nouveau maillot
    axios
      .post('http://127.0.0.1:8080/Shirt', newShirt) // Assurez-vous que l'URL est correcte
      .then((response) => {
        alert('Maillot créé avec succès!');
        setShirts([...shirts, response.data]); // Ajouter le nouveau maillot à la liste
        setNewShirt({ clubName: '', playerNumber: '', playerName: '', price: '' }); // Réinitialiser le formulaire
      })
      .catch((error) => {
        alert('Erreur lors de la création du maillot');
        console.error(error);
      });
  };

  if (loading) {
    return <div>Chargement des maillots...</div>;  // Afficher un message de chargement
  }

  if (error) {
    return <div>{error}</div>;  // Afficher un message d'erreur si la récupération échoue
  }

  return (
    <div>
      <Navbar />
      <h1>Liste des Maillots</h1>
      <ul>
        {shirts.map((shirt) => (
          <li key={shirt._id}>
            <strong>{shirt.clubName}</strong> - {shirt.playerName} (N°{shirt.playerNumber}) - {shirt.price}€
          </li>
        ))}
      </ul>

      <h2>Créer un nouveau maillot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du club:</label>
          <input
            type="text"
            name="clubName"
            value={newShirt.clubName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numéro du joueur:</label>
          <input
            type="number"
            name="playerNumber"
            value={newShirt.playerNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nom du joueur:</label>
          <input
            type="text"
            name="playerName"
            value={newShirt.playerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prix:</label>
          <input
            type="number"
            name="price"
            value={newShirt.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Créer le maillot</button>
      </form>
    </div>
  );
};

export default Shirt;
