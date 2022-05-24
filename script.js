'use-strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document
  .getElementById('twitter')
  .addEventListener('click', tweetQuote);

const newQuoteBtn = document
  .getElementById('new-quote')
  .addEventListener('click', newQuote);

const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading Spinner
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New Quote
function newQuote() {
  loading();

  //Pick a random quote from apiQuotes array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if Author field is blank and replace it with 'Unknown'

  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = 'quote.author';
  }

  // Check Quote Length to determine the styling
  if (quote.text.length > 125) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
    complete();
  }

  //Set Quote, Hide Loader
  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
}

quoteText.textContent = quote.text;

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - 
    ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//On Load
getQuotes();
