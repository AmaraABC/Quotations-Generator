# Quotes Generator by Amâra
Date de création du dossier : 23/09/2025

Une mini-application en [**Vanilla JavaScript**](https://www.javascript.com/) qui récupère une **citation aléatoire** depuis l'API publique _[https://api.chucknorris.io/jokes/random](https://api.chucknorris.io/jokes/random)_.

## Composition du projet
Le projet est composé d'un dossier nommé [**quotes**](quotes/), lui-même composé de plusieurs fichiers :
- Un fichier [**main.js**](quotes/main.js) qui contient l'intégralité du code JavaScript ;
- Un fichier [**index.html**](quotes/index.html) qui représente la structure de l'application web ;
- Un fichier [**style.css**](quotes/style.css) qui ajoute du charme à l'application.

##  Fonctionnalités de l'application
- **Charger une nouvelle citation** en cliquant sur un bouton.
- **Enregistrer** une citation dans les favoris en cliquant également sur un bouton. Les citations favorites sont persistées dans le `LocalStorage`.
- **Supprimer** des citations ajoutée auparavant en favoris.

## Améliorations futures
- Ajouter une **pagination** pour faciliter le parcours des citations en favoris.