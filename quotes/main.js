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
            document.querySelector(".favorite-quote-btn").style.display = "inline-block";
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
        alert("Citation ajoutée aux favoris !");
        document.querySelector(".favorite-quote-btn").style.display = "none";
        displayFavoriteQuotes();
    }
};

function deleteFavoriteQuote(index) {
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorite-quote', JSON.stringify(favorites));
    alert("Citation totalement supprimée !");
    displayFavoriteQuotes();
};

function displayFavoriteQuotes() {
    const quotesSection = document.querySelector(".favorite-quotes-block");
    let favorites = JSON.parse(localStorage.getItem("favorite-quote")) || [];

    quotesSection.innerHTML = "";

    favorites.forEach((quote, index) => {
        const div = document.createElement('div');
        div.classList.add('favorite-quote');
        div.style.backgroundColor = "gold";
        div.style.padding = "1.25em";
        div.style.marginBlock = "1rem";
        div.style.borderRadius = ".75rem";
        div.style.position = "relative";

        const p = document.createElement('p');
        p.innerHTML = quote;
        p.style.fontSize = "clamp(.75rem, 1.4vw, 1rem)";

        const button = document.createElement('button');
        button.classList.add("delete-btn");
        button.innerHTML = "Supprimer ?";
        button.addEventListener("click", () => {
            const confirmSupression = confirm("Voulez-vous vraiment supprimer cette citation ?!");
            if (confirmSupression) {
                deleteFavoriteQuote(index);
            };
        });

        div.appendChild(p);
        div.appendChild(button);
        quotesSection.appendChild(div);
    });
};

displayFavoriteQuotes();