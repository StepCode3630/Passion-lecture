// src/data/mockData.js
// pas de vrai backend donc on simule des données avec des tableaux d'objets
// les données sont organisées en deux tableaux : users et books
// chaque objet dans ces tableaux représente un utilisateur ou un livre avec des propriétés spécifiques
// les utilisateurs ont des propriétés id, pseudo et role
// les livres ont des propriétés id, title, author, category et userId (qui fait référence à l'id de l'utilisateur qui a ajouté le livre)
// ces données peuvent être utilisées pour afficher des listes d'utilisateurs et de livres, ainsi que pour afficher les détails d'un livre ou d'un utilisateur spécifique
// en exportant ces tableaux, ils peuvent être importés et utilisés dans d'autres parties de l'application, comme les composants Vue ou les services de données

// les données sont stockée en mémoire / simulé / utilisé coté frontend donc pas de persistance réelle, les données seront réinitialisées à chaque chargement de la page

export const users = [
  { id: 1, pseudo: "StepCode3630", role: "admin" },
  { id: 2, pseudo: "Camille", role: "user" },
  { id: 3, pseudo: "Gino", role: "user" },
]

export const books = [
  {
    id: 101,
    title: "Les Misérables",
    author: "Victor Hugo",
    category: "Roman",
    userId: 1,
  },
  {
    id: 102,
    title: "Naruto - Tome 1",
    author: "Masashi Kishimoto",
    category: "Manga",
    userId: 2,
  },
  {
    id: 103,
    title: "One Piece - Tome 1",
    author: "Eiichiro Oda",
    category: "Manga",
    userId: 3,
  },
  {
    id: 104,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Informatique",
    userId: 1,
  },
]
