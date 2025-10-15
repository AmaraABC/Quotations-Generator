let displayedQuote = null;

// Boutons, variable(s) et constante(s) nécessaires pour la pagination des citations en favoris
const previousButton = document.getElementById("previous-page-btn");
const pageInfo = document.getElementById("info");
const nextButton = document.getElementById("next-page-btn");
var page = 1;
const pageSize = 5;


function fetchQuote() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(res => {
            if (!res.ok) {
                throw new Error('An error occured when fetching a quote');
            }
            return res.json();
        })
        .then(data => {
            displayedQuote = data.value;
            document.querySelector(".quote p").innerHTML = `${displayedQuote}`;
            document.querySelector(".favorite-quote-btn").style.display = "inline-block";
        })
        .catch(error => {
            console.error('Erreur:', error);
            document.querySelector(".quote p").innerHTML = "Unable to display a quotation";
            document.querySelector(".quote p").style.color = "rgb(255, 60, 60)";
        });
};

function addFavoriteQuote() {
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];

    if (!favorites.includes(displayedQuote)) {
        favorites.push(displayedQuote);
        localStorage.setItem('favorite-quote', JSON.stringify(favorites));
        alert("Quote added to favorites !");
        document.querySelector(".favorite-quote-btn").style.display = "none";
        displayFavoriteQuotes();
    };
};

function deleteFavoriteQuote(quote) {
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];
    const index = favorites.indexOf(quote);

    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorite-quote', JSON.stringify(favorites));
    };

    const totalPages = Math.ceil(favorites.length / pageSize);

    if (page > totalPages) {
        page = totalPages || 1;
    };

    displayFavoriteQuotes();
};

function displayFavoriteQuotes() {
    const quotesSection = document.querySelector(".favorite-quotes-block");
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];

    const totalPages = Math.ceil(favorites.length / pageSize);
    const start = (page - 1) * pageSize;
    const end = page * pageSize
    const currentFavorites = favorites.slice(start, end);
    pageInfo.innerHTML = `${page} / ${totalPages || 1}`;

    quotesSection.innerHTML = "";

    currentFavorites.forEach((quote) => {
        const div = document.createElement('div');
        div.classList.add('favorite-quote');
        div.style.backgroundColor = "gold";
        div.style.padding = "1em";
        div.style.marginBlock = "1rem";
        div.style.borderRadius = ".75rem";
        div.style.position = "relative";

        const p = document.createElement('p');
        p.innerHTML = quote;
        p.style.fontSize = "clamp(.75rem, 1.4vw, 1rem)";

        const button = document.createElement('button');
        button.classList.add("delete-btn");
        button.innerHTML = "Delete ?";
        button.addEventListener("click", () => {
            const confirmSupression = confirm("Are your sure about that ?!");
            if (confirmSupression) {
                deleteFavoriteQuote(quote);
            };
        });

        div.appendChild(p);
        div.appendChild(button);
        quotesSection.appendChild(div);
    });

    previousButton.disabled = (page === 1);
    nextButton.disabled = (page === totalPages || totalPages === 0);
};

previousButton.addEventListener('click', () => {
    if (page > 1) {
        page--;
        displayFavoriteQuotes();
    };
});

nextButton.addEventListener('click', () => {
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];
    const totalPages = Math.ceil(favorites.length / pageSize);
    if (page < totalPages) {
        page++;
        displayFavoriteQuotes();
    };
});

displayFavoriteQuotes();