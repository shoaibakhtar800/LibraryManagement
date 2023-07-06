// let stocks = 10;

// function getSearchQuery() {
//   let queryString = window.location.search;
//   let searchParams = new URLSearchParams(queryString);

//   let searchQuery = searchParams.get('search');


//   async function searchBooks(searchParam) {
//     const url = `https://book-finder1.p.rapidapi.com/api/search?title=${searchParam}&lexile_min=600&lexile_max=800&results_per_page=25&page=1`;

//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': 'c7b1495255mshf7085a7e8616637p1ffcabjsn2188ec778d9a',
//         'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();
//       const val = result.results;
//       val.forEach((value, i) => {
//         const cardContainer = document.getElementById('container');

//         const cardDisplay = document.createElement('div');
//         cardDisplay.className = 'card';

//         const titleDisplay = document.createElement('h1');
//         titleDisplay.className = 'title';
//         titleDisplay.textContent = `Title:- ${value.title}`

//         const authorDisplay = document.createElement('h1');
//         authorDisplay.className = 'title';
//         authorDisplay.textContent = `Author:- ${value.authors}`

//         const genreDisplay = document.createElement('h1');
//         genreDisplay.className = 'title';
//         genreDisplay.textContent = `Genre:- ${value.categories[0]}`

//         const btnDisplay = document.createElement('button');
//         btnDisplay.className = 'btn';
//         btnDisplay.innerText = 'Issue Book';

//         const stocksDisplay = document.createElement('p');
//         stocksDisplay.className = 'stocks';
//         stocksDisplay.textContent = `Available Books:- ${stocks}`

//         // Add event listener to button
//         btnDisplay.addEventListener('click', function() {
//           handleIssueBook(value);
//           updateStocksDisplay(stocksDisplay);
//         });

//         cardDisplay.appendChild(titleDisplay);
//         cardDisplay.appendChild(authorDisplay);
//         cardDisplay.appendChild(genreDisplay);
//         cardDisplay.appendChild(btnDisplay);
//         cardDisplay.appendChild(stocksDisplay);

//         cardContainer.appendChild(cardDisplay);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   searchBooks(searchQuery);
// }

// function handleIssueBook(book) {
//   if (stocks > 0) {
//     console.log('Book Issued:', book);
//     stocks--;
//     console.log('Book Limit:', stocks);
//   } else {
//     alert('Books not available');
//   }
// }

// function updateStocksDisplay(stocksDisplay) {
//   stocksDisplay.textContent = `Available Books: ${stocks}`;
// }

// getSearchQuery();


let books = [];
let cart = [];

function getSearchQuery() {
  let queryString = window.location.search;
  let searchParams = new URLSearchParams(queryString);

  let searchQuery = searchParams.get('search');

  async function searchBooks(searchParam) {
    const url = `https://book-finder1.p.rapidapi.com/api/search?title=${searchParam}&lexile_min=600&lexile_max=800&results_per_page=25&page=1`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c7b1495255mshf7085a7e8616637p1ffcabjsn2188ec778d9a',
        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const val = result.results;
      val.forEach((value, i) => {
        const book = {
          id: i + 1,
          title: value.title,
          authors: value.authors,
          categories: value.categories,
          stocks: 10
        };
        books.push(book);
        createBookCard(book);
      });
    } catch (error) {
      console.error(error);
    }
  }

  function createBookCard(book) {
    const cardContainer = document.getElementById('container');

    const cardDisplay = document.createElement('div');
    cardDisplay.className = 'card';

    const titleDisplay = document.createElement('h1');
    titleDisplay.className = 'title';
    titleDisplay.textContent = `Title: ${book.title}`;

    const authorDisplay = document.createElement('h1');
    authorDisplay.className = 'title';
    authorDisplay.textContent = `Author: ${book.authors}`;

    const genreDisplay = document.createElement('h1');
    genreDisplay.className = 'title';
    genreDisplay.textContent = `Genre: ${book.categories[0]}`;

    const btnDisplay = document.createElement('button');
    btnDisplay.className = 'btn';
    btnDisplay.innerText = 'Issue Book';

    const cartbtn = document.createElement('button');
    cartbtn.className = 'btn1';
    cartbtn.innerText = 'Cart';

    const stocksDisplay = document.createElement('p');
    stocksDisplay.className = 'stocks';
    stocksDisplay.setAttribute('data-book-id', book.id); // Store book ID as data attribute
    stocksDisplay.textContent = `Available Books: ${book.stocks}`;

    // Add event listener to button
    btnDisplay.addEventListener('click', function() {
      handleIssueBook(book);
      updateStocksDisplay(stocksDisplay);
      if(10 - book.stocks >= 0) {
        cardDataDisplay(book, stocksDisplay);
      }
    });

    cartbtn.addEventListener('click', function() {
      window.location.href = '../cart/index.html';
    })

    cardDisplay.appendChild(titleDisplay);
    cardDisplay.appendChild(authorDisplay);
    cardDisplay.appendChild(genreDisplay);
    cardDisplay.appendChild(btnDisplay);
    cardDisplay.appendChild(cartbtn);
    cardDisplay.appendChild(stocksDisplay);

    cardContainer.appendChild(cardDisplay);
  }
  
  function handleIssueBook(book) {
    if (book.stocks > 0) {
      // console.log('Book Issued:', book);
      book.stocks--;
      // console.log('Book Limit:', book.stocks);
    } else {
      alert('Books not available');
    }
  }

  function updateStocksDisplay(stocksDisplay) {
    const bookId = stocksDisplay.getAttribute('data-book-id');
    const book = books.find(b => b.id == bookId);
    stocksDisplay.textContent = `Available Books: ${book.stocks}`;
  }

  function cardDataDisplay(book, stocksDisplay) {
    const existingBook = cart.find(item => item.title === book.title);
    if (existingBook && existingBook.quantity >= 0) {
      existingBook.quantity++;
    } else {
      if(10 - book.stocks >= 0) {
        cart.push({ title: book.title, quantity: 10 - book.stocks });
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(cart);
  }

  searchBooks(searchQuery);

}


getSearchQuery();



