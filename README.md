# Undiscord Remake — by FroZn

Userscript (Tampermonkey / Violentmonkey) qui supprime **en masse tes propres messages Discord** depuis
le client web : un salon, un serveur entier, tous tes MP, ou absolument tout ce que tu as posté grâce
au package de données de Discord.

**Undiscord Remake by FroZn** est une réécriture complète et modernisée
d'[Undiscord](https://github.com/victornpb/undiscord) (victornpb, MIT), qui ne fonctionnait plus correctement.

> ⚠️ Automatiser un compte utilisateur est contraire aux conditions d'utilisation de Discord.
> Garde des délais raisonnables (vitesse « Équilibrée » par défaut) : tu restes responsable de l'usage de cet outil.

## Installation

1. Installe [Tampermonkey](https://www.tampermonkey.net/) ou [Violentmonkey](https://violentmonkey.github.io/).
   Sur Chrome/Edge, active aussi **« Autoriser les scripts utilisateur »** dans les détails de l'extension
   (ou le mode développeur), sinon aucun userscript ne s'exécute.
2. **[Clique ici pour installer Undiscord Remake](https://raw.githubusercontent.com/FroZnito/Undiscord-remake/main/dist/undiscord-remake.user.js)**
   puis valide dans Tampermonkey. Les mises à jour arrivent ensuite automatiquement.
3. Va sur <https://discord.com/app> : une icône 🗑 apparaît dans la barre d'outils du salon.
   Tu peux aussi utiliser le bouton flottant ou le raccourci **Alt + Shift + U**.

Pour construire le script toi-même : `npm install` puis `npm run build`, et ouvre `dist/undiscord-remake.user.js`.

## Fonctionnalités

**Cibles**
- Salon ou MP actuel, serveur entier (tous les salons et fils), sélection de MP / groupes, sélection de serveurs,
  ou liste d'IDs / de liens collés.
- **Comptage** de tes messages par MP ou par serveur avant de lancer quoi que ce soit.
- **Package de données Discord** (`.zip` ou dossier extrait) : suppression directe par ID de tout ce que tu as
  envoyé, y compris dans des conversations fermées. Le fichier est lu localement, rien n'est envoyé ailleurs.

**Filtres** : texte contenu, expression régulière, « doit contenir » / « exclure si contient »
(lien, fichier, image, vidéo, intégration, audio, sticker, sondage), épinglés (ignorer / inclure / uniquement),
période (avec raccourcis « plus ancien que 7 jours / 30 jours / 1 an »), intervalle entre deux messages
sélectionnés directement dans le chat, autres auteurs (modération), salons NSFW.

**Sécurité**
- **Aperçu** : trouve les messages sans rien supprimer, permet de décocher ceux à garder puis de supprimer la sélection.
- Confirmation avant suppression avec estimation du nombre de messages (et saisie de « SUPPRIMER » au-delà de 1 000).
- **Archive** des messages supprimés, exportable en HTML (lisible), JSON ou CSV.
- Mode confidentialité (floute contenus et noms pour streamer ou faire des captures).
- Le token n'est jamais enregistré ni envoyé ailleurs que sur `discord.com`.

**Fiabilité**
- Pagination par curseur (`max_id`) : plus de blocage sur « page vide » ni de messages sautés quand l'index
  de recherche de Discord est en retard.
- Vitesse adaptative : respecte les limitations (429, en-têtes `X-RateLimit-*`), ralentit puis réaccélère.
- Gestion de l'indexation (202), des fils archivés, des messages système, des salons devenus inaccessibles.
- Pause / reprise / arrêt immédiat, et **reprise d'une session interrompue** après un rechargement de page.
- Mode « historique complet » (lecture de tout le salon) quand la recherche Discord ne suffit pas.

**Interface** : fenêtre déplaçable et redimensionnable, thème clair/sombre qui suit Discord, français / anglais
(automatique), tableau de bord en direct (progression, vitesse, temps restant, flux des derniers messages),
journal filtrable, notification et son de fin.

## Ce qui a été corrigé par rapport à l'original

| Problème de l'original | Solution |
| --- | --- |
| Bouton 🗑 introuvable (classes CSS de Discord renommées) | Détection robuste de la barre d'outils + bouton flottant de secours + raccourci clavier |
| Erreurs 401 (token mal détecté, champ auto-rempli par les gestionnaires de mots de passe) | Token lu dans les propres requêtes de Discord, puis via webpack ; jamais dans un champ du formulaire |
| Le script s'arrête sur une « page vide » | Curseur `max_id` au lieu de l'`offset`, avec réessais |
| Interface cassée (variables CSS Discord disparues) | Interface isolée dans un Shadow DOM avec son propre thème |
| Boucles infinies sur les 403 | Salons inaccessibles détectés et ignorés |
| Précision des dates (`Math.pow(2, 22)` sur des flottants) | Snowflakes calculés en `BigInt` |

## Développement

```bash
npm run dev        # build en continu + faux Discord local sur http://localhost:8787
npm run test       # tests unitaires (moteur, filtres, package, API)
npm run typecheck
npm run check      # typecheck + tests + build
```

`npm run dev` sert un **playground** (`dev/playground.html`) qui imite Discord en mémoire, avec ses limitations,
son indexation lente, ses pages vides et ses raccourcis globaux. On peut tout tester sans compte réel ;
le bouton « package.zip d'exemple » génère un faux package de données. La version `[DEV]` du script installée
depuis `http://localhost:8787/dist/undiscord-remake.user.js` se met à jour toute seule.

```
src/
  core/        logique pure, testée : moteur, API Discord, filtres, snowflakes, package, export
  platform/    contact avec la page Discord : token, stockage, DOM, notifications
  ui/          interface Preact (signals) : état, contrôleur, pages, composants, styles
  i18n/        traductions fr / en
dev/           faux Discord (tests + playground)
tests/         Vitest
scripts/       build esbuild → dist/undiscord-remake.user.js
```

## Auteur

**Undiscord Remake** est développé par **FroZn** ([@FroZnito](https://github.com/FroZnito)).
Bugs et idées : [ouvre une issue](https://github.com/FroZnito/Undiscord-remake/issues).

## Licence

MIT © 2026 FroZn. Inspiré d'[Undiscord](https://github.com/victornpb/undiscord) par victornpb (MIT).
