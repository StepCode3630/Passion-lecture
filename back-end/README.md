# ⚡ Passion Lecture API

Une application web pour créer et partager des **livres**.

---

## 📝 Description

Cette application à pour but de faire découvrir les livres que l'on aime a d'autres lecteurs ainsi que de découvrir les leurs.



---

## 🛠️ Installation


1. **Installer les dépendances**

```bash
    npm install
```

2. **Configuration du fichier `.env`**

   Copiez l'exemple et ajustez les valeurs. La base MySQL écoute le port
   **6033**.

  ```bash
cp .env.example .env   # linux/mac/PowerShell
# ou
copy .env.example .env # cmd.exe
```

   Exemple de configuration :

   ```env
DB_HOST=127.0.0.1
DB_PORT=6033
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=db_PassionLecture
```

4. **Démarrer la base de données**

```bash
    docker compose up -d
```

5. **Exécuter les migrations**

```bash
  node ace migration:run
```

6. **Lancer le serveur de développement**

```bash
  npm run dev
```

   L'application sera accessible sur <http://localhost:3333>.

---

## ⚡ Commandes utiles

```bash
# Démarrer les containers (MySQL,...)
docker compose up -d

# Arrêter et supprimer les containers
docker compose down

docker compose down -v  # supprime aussi les volumes

# Régénérer la base de données
db=migration:refresh --seed
node ace migration:fresh --seed
node ace migration:refresh --seed
```

---

## 📝 Résumé rapide

```bash
git clone https://github.com/StepCode3630/flashcards.git
cd flashcards/src
npm install
cp .env.example .env
# configurer .env avec port 6033
docker compose up -d
node ace migration:run
npm run dev
```

## Lancer une migration fresh
```bash
node ace migration:fresh
```
```bash
node ace db:seed --files="./database/seeders/main_seeder.ts"
```

## Rapport

[InternetShortcut]
URL=https://eduvaud-my.sharepoint.com/:w:/r/personal/pr53sjy_eduvaud_ch/_layouts/15/Doc.aspx?sourcedoc=%7B9EE22691-6E62-405C-B723-7265DEC11C14%7D&file=Rapport_Projet-P_295-Passion_Lecture-Stepan_Camille_CID2A.docx&action=default&mobileredirect=true&DefaultItemOpen=1
