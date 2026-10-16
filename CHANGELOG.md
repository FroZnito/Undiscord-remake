# Journal des versions

Toutes les évolutions notables d'Undiscord Remake by FroZn.

## [1.1.0] — 2026-10-16

### Ajouts
- **Préréglages** : enregistre ta cible, tes filtres et ta méthode, puis réapplique-les en un clic.
- **Salons épargnés** : en nettoyant un serveur entier, décoche les salons à garder (leurs fils de discussion sont
  épargnés aussi). Le choix est mémorisé pour chaque serveur et s'applique aussi à l'onglet « Serveurs ».
- **« Plus ancien que » relatif** : 1 jour, 7 jours, 30 jours ou 1 an, recalculé à chaque lancement
  (un préréglage « messages de plus de 30 jours » reste valable dans le temps).

### Projet
- Intégration continue : vérification des types, tests et compilation à chaque push, avec contrôle que le
  script publié est à jour.
- Publication automatisée : `npm run release` prépare la version, et pousser le tag crée la release GitHub.

## [1.0.0] — 2026-10-16

Première version : réécriture complète d'Undiscord (nettoyage de salons, serveurs, MP et package de données,
filtres, aperçu, archive, reprise de session, interface FR/EN).
