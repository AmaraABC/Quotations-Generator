function fetchQuote() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(res => {
            if (!res.ok) {
                throw new Error('Erreur lors de la récupération de la citation');
            }
            return res.json();
        })
        .then(data => {
            document.querySelector(".quote p").innerHTML = `${data.value}`;
            document.querySelector(".favorite-quote-btn").style.display = "block";
        })
        .catch(error => {
            console.error('Erreur:', error);
            document.querySelector(".quote p").innerHTML = "Unable to display a quotation";
            document.querySelector(".quote p").style.color = "rgb(255, 60, 60)";
        });
};

function addFavoriteQuote() {
    const quote = document.querySelector(".quote p").innerHTML;
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];

    if (!favorites.includes(quote)) {
        favorites.push(quote);
        localStorage.setItem('favorite-quote', JSON.stringify(favorites));
        displayFavoriteQuotes();
    };
};

function displayFavoriteQuotes() {
    const quotesSection = document.querySelector(".favorite-quotes-block");
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];

    quotesSection.innerHTML = "";

    favorites.forEach((quote) => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        div.classList.add('favorite-quote');
        p.innerHTML = quote;
        div.appendChild(p);
        quotesSection.appendChild(div)
    });
};

displayFavoriteQuotes();