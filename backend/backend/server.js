const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Base de données
const db = new sqlite3.Database(':memory:');

// Routes de base
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'KinéArt Backend actif!', 
    timestamp: new Date(),
    version: '1.0.0'
  });
});

app.get('/api/services', (req, res) => {
  const services = [
    { id: 1, nom: 'Consultation', duree: 30, prix: 50, description: 'Consultation initiale' },
    { id: 2, nom: 'Hijama', duree: 60, prix: 100, description: 'Thérapie par ventouses' },
    { id: 3, nom: 'Séance kiné', duree: 60, prix: 200, description: 'Kinésithérapie' },
    { id: 4, nom: 'Hydra faciale', duree: 60, prix: 400, description: 'Soin du visage' },
    { id: 5, nom: 'Coaching sportif', duree: 120, prix: 150, description: 'Coaching personnalisé' },
    { id: 6, nom: 'Massage', duree: 30, prix: 150, description: 'Massage thérapeutique' }
  ];
  res.json(services);
});

app.get('/api/kinesitherapeutes', (req, res) => {
  const kines = [
    { id: 1, nom: 'Kiné Bouthaina', specialite: 'Rééducation' },
    { id: 2, nom: 'Dr. Asmaa Naatani', specialite: 'Traumatologie' },
    { id: 3, nom: 'Kiné Chaimae', specialite: 'Esthétique' }
  ];
  res.json(kines);
});

app.post('/api/rendez-vous', (req, res) => {
  const { nom, email, service, date, heure, telephone, message } = req.body;
  
  console.log('Nouveau RDV:', { nom, email, service, date, heure });
  
  // Simulation de création
  res.json({
    success: true,
    message: 'Rendez-vous créé avec succès!',
    rdv: { 
      id: Math.floor(Math.random() * 1000),
      nom, 
      email, 
      telephone,
      service, 
      date, 
      heure,
      message,
      statut: 'pending',
      created_at: new Date()
    }
  });
});

// Route pour chatbot IA (simulation)
app.post('/api/ai/chatbot', (req, res) => {
  const { message } = req.body;
  
  let response = "🌟 Bonjour Sidi / lalla ! Je suis l'assistant virtuel KinéArt ! ";
  
  if (message.toLowerCase().includes('service')) {
    response += "Nous proposons 6 services : Consultation (50 DH), Hijama (100 DH), Séance kiné (200 DH), Hydra faciale (400 DH), Coaching sportif (150 DH), et Massage (150 DH). Lequel vous intéresse ?";
  } else if (message.toLowerCase().includes('prix') || message.toLowerCase().includes('tarif')) {
    response += "Nos tarifs en DH : Consultation 50, Hijama 100, Séance kiné 200, Hydra faciale 400, Coaching sportif 150, Massage 150. Très compétitifs !";
  } else if (message.toLowerCase().includes('horaire')) {
    response += "Nous sommes ouverts du lundi au vendredi de 9h à 17h, et le samedi de 9h à 13h. Parfait pour votre planning !";
  } else if (message.toLowerCase().includes('réserv') || message.toLowerCase().includes('rendez')) {
    response += "Pour réserver, utilisez notre formulaire sur cette page ! Choisissez votre service, date et heure. C'est très simple !";
  } else {
    response += "Comment puis-je vous aider ? Demandez-moi nos services, tarifs, horaires ou comment réserver ! 😊";
  }
  
  res.json({
    response: response,
    success: true,
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 KinéArt Backend démarré sur port ${PORT}`);
  console.log(`📱 API accessible sur http://localhost:${PORT}/api`);
});
