function fetchQuote() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(res => {
            if (!res.ok) {
                throw new Error('Erreur lors de la récupération de la citation');
            }
            return res.json();
        })
        .then(data => {
            document.querySelector(".quote p").innerHTML = `${data.value}`
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
};

const favoriteQuotes = document.createElement("article");
favoriteQuotes.setAttribute("class", "favorite-quote");
