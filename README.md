# Passion Lecture

Passion Lecture est une application web qui permet à des lecteurs de découvrir et partager des livres qu'ils aiment, ainsi que leurs avis et recommandations.

Le projet est divisé en deux parties :
- un front-end développé avec Vue.js
- un back-end API REST développé avec AdonisJS

## Structure du projet

```text
Passion-lecture/
├── back-end/      # API REST AdonisJS
├── front-end/     # Interface utilisateur Vue.js
├── doc/           # Documentation et ressources du projet
├── README.md      # Présentation générale du projet
├── package-lock.json
└── .git/
```

## Stack technique

- Front-end : Vue.js 3 + Vite
- Back-end : AdonisJS + TypeScript
- Base de données : MySQL
- API : REST

## Prérequis

Avant de lancer le projet, vérifiez que vous avez installé :

- Node.js 20+ ou 22+
- npm
- Docker Desktop / Docker Compose

## Démarrage rapide

### 1. Cloner le projet

```bash
git clone https://github.com/StepCode3630/Passion-lecture.git
cd Passion-lecture
```

### 2. Installer les dépendances

#### Front-end

```bash
cd front-end
npm install
```

#### Back-end

```bash
cd ../back-end
npm install
```

### 3. Configurer l'environnement du back-end

Dans le dossier `back-end`, copier le fichier d'exemple et modifier les variables selon votre configuration locale :

```bash
cp .env.example .env
```

Exemple de configuration :

```env
DB_HOST=127.0.0.1
DB_PORT=6033
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=db_PassionLecture
```

### 4. Démarrer la base de données

```bash
cd back-end
docker compose up -d
```

### 5. Exécuter les migrations

```bash
node ace migration:run
```

### 6. Lancer les applications

#### API back-end

```bash
npm run dev
```

L'API est généralement accessible sur : http://localhost:3333

#### Front-end

```bash
cd ../front-end
npm run dev
```

Le front-end est généralement accessible sur : http://localhost:5173

## Commandes utiles

### Back-end

```bash
# Démarrer les services Docker
npm run dev

# Lancer les migrations
node ace migration:run

# Recréer la base de données depuis zéro
node ace migration:fresh

# Peupler la base de données
node ace db:seed --files="./database/seeders/main_seeder.ts"
```

### Front-end

```bash
# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Vérifier le lint
npm run lint
```

## Documentation

- [README du back-end](./back-end/README.md)
- [README du front-end](./front-end/README.md)
- [Dossier de documentation](./doc)

## À propos

Ce projet a pour objectif de créer une plateforme sociale de découverte de livres, permettant aux utilisateurs de partager leurs lectures préférées, découvrir de nouveaux titres et interagir autour d'une passion commune.
