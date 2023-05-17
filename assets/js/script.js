const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const photoElement = document.getElementById("photo");
const newQuoteButton = document.getElementById("new-quote");

async function getQuote() {
    try {
        const response = await fetch("https://thatsthespir.it/api");
        const data = await response.json();
        const authorFirstName = data.author.split(" ")[0];
        const responseName = await fetch(
            `https://api.agify.io?name=${authorFirstName}`
        );
        const DataResponseName = await responseName.json();
        quoteElement.innerHTML = `<span>${data.quote}</span>`;
        authorElement.innerHTML = `* ${data.author} - ${DataResponseName.age} years *`;
        photoElement.setAttribute("src", `${data.photo}`);
        photoElement.setAttribute("alt", `A photo of ${data.author}`);
    } catch (error) {
        console.error(error);
        quoteElement.innerHTML = "An error occurred while fetching the quote.";
    }
}

newQuoteButton.addEventListener("click", getQuote);

// Generate a random quote when the page loads
getQuote();
