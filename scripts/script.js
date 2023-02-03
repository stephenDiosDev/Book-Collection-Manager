let myLibrary = [];
let bookshelf = document.querySelector(".content");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.getInfo = function() {
        if(this.read === false) {
            return this.title+ ' by ' + this.author + ', ' + this.pages + ' pages, not read yet'
        } else {
            return this.title+ ' by ' + this.author + ', ' + this.pages + ' pages, read'
        }
    }
}

// TODO extend this to use the DOM input (pushing the add book btn will construct it)
function addBookToLibrary(book) {    
    // create divs
    let bookCard = document.createElement('div');
    bookCard.classList.add("book-card");

    let bookTopRow = document.createElement('div')
    bookTopRow.classList.add("book-top-row")

    let bookTitleAuthor = document.createElement('div')
    bookTitleAuthor.classList.add("book-title-author")

    let bookPages = document.createElement('div')
    bookPages.classList.add("book-pages")

    ////////////////// book top row //////////////////
    // delete button with icon
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add("book-delete");
    let deleteIcon = document.createElement('span');
    deleteIcon.classList.add("book-delete-icon");

    deleteIcon.innerText = "&times";
    deleteBtn.appendChild(deleteIcon);

    //slider switch
    let switchLabel = document.createElement('label');
    switchLabel.classList.add("switch");

    let checkBoxSwitch = document.createElement('input');
    checkBoxSwitch.setAttribute("type", "checkbox");
    let sliderSwitch = document.createElement('span');
    sliderSwitch.classList.add("slider");

    switchLabel.appendChild(checkBoxSwitch);
    switchLabel.appendChild(sliderSwitch);

    bookTopRow.appendChild(deleteBtn);
    bookTopRow.appendChild(switchLabel);

    ////////////////// book title author //////////////////
    let bookTitle = document.createElement('h3');
    bookTitle.innerText = "Book Title";

    let bookAuthor = document.createElement('h3');
    bookAuthor.innerText = "Book Author";

    bookTitleAuthor.appendChild(bookTitle);
    bookTitleAuthor.appendChild(bookAuthor);

    ////////////////// book pages //////////////////
    let firstp = document.createElement('p');
    firstp.innerText = "Pages: ";

    let currentPage = document.createElement('input');
    currentPage.setAttribute("type", "number");
    currentPage.setAttribute("min", "1");
    currentPage.setAttribute("name", "current-pages");
    currentPage.setAttribute("id", "current-pages");

    let secondp = document.createElement('p');
    secondp.innerText = "/ 9999";

    bookPages.appendChild(firstp);
    bookPages.appendChild(currentPage);
    bookPages.appendChild(secondp);

    //combine everything
    bookCard.appendChild(bookTopRow);
    bookCard.appendChild(bookTitleAuthor);
    bookCard.appendChild(bookPages);

    myLibrary.push(book);
}

function displayLibrary() {
    //for each book in myLibrary
        //fill out an html template and add to page
}

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const book2 = new Book("Dresden Files Book 1", "Some dude idk", 167, true);

console.log(book1.getInfo());
console.log(book2.getInfo());


//////////////////////////////////////////////////////////////////
let formBtn = document.querySelector(".form-submit-button");
let loginBanner = document.querySelector(".login-text");

formBtn.addEventListener('click', function(e) {
    if(loginBanner.innerText == "FLIP") {
        loginBanner.innerText = "FLOP";
    }
    else {
        loginBanner.innerText = "FLIP";
    }
});
