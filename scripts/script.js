let myLibrary = [];
let bookshelf = document.querySelector(".content");

function Book(title, author, currentPages, totalPages, read) {
    this.title = title;
    this.author = author;
    this.currentPages = currentPages;
    this.totalPages = totalPages
    this.read = true;
}

// TODO extend this to use the DOM input (pushing the add book btn will construct it)
function addBookToLibrary(book) {    
    if(book.currentPages >= book.totalPages) {
        book.currentPages = book.totalPages;
        book.read = true;
    }
    
    myLibrary.push(book);
    displayLibrary();
}

function resetBookshelf() {
    bookshelf.innerHTML = "";
}

function displayLibrary() {
    resetBookshelf();

    myLibrary.forEach(book => {
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

        deleteIcon.innerHTML = "&times";    //need innerHTML here because &times is an html symbol
        deleteBtn.appendChild(deleteIcon);

        //slider switch
        let switchLabel = document.createElement('label');
        switchLabel.classList.add("switch");

        let checkBoxSwitch = document.createElement('input');
        checkBoxSwitch.setAttribute("type", "checkbox");
        let sliderSwitch = document.createElement('span');
        sliderSwitch.classList.add("slider");

        checkBoxSwitch.checked = book.read;

        switchLabel.appendChild(checkBoxSwitch);
        switchLabel.appendChild(sliderSwitch);

        bookTopRow.appendChild(deleteBtn);
        bookTopRow.appendChild(switchLabel);

        ////////////////// book title author //////////////////
        let bookTitle = document.createElement('h3');
        // bookTitle.innerText = "Book Title";
        bookTitle.innerText = book.title;

        let bookAuthor = document.createElement('h3');
        // bookAuthor.innerText = "Book Author";
        bookAuthor.innerText = book.author;

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
        currentPage.value = book.currentPages;

        let secondp = document.createElement('p');
        secondp.innerText = "/ " + book.totalPages;

        bookPages.appendChild(firstp);
        bookPages.appendChild(currentPage);
        bookPages.appendChild(secondp);

        //combine everything
        bookCard.appendChild(bookTopRow);
        bookCard.appendChild(bookTitleAuthor);
        bookCard.appendChild(bookPages);

        bookshelf.appendChild(bookCard);
    });
}


//////////////////////////////////////////////////////////////////
let formBtn = document.querySelector(".form-submit-button");

formBtn.addEventListener('click', function(e) {
    addBookToLibrary(new Book("Test Title", "Test Author", 123, 500, true));
    console.log("Current library:");
    console.log(myLibrary);
});



/*
    TODO

    parse form into the Javascript book object
        - need to do error checking here, ensuring the current pages <= total pages
        - if read == true, currentPages = total pages and slider is checked
    
    when form is submitted, we parse the form into a js book object and add it to library
        - everytime a new book is added we call display library
        - we should check to make sure the same book doesn't already exist in the library
    
    displayLibrary will clear the bookshelf, and add back each book for now
        - we can add some kind of performance mode or something to only add new books

*/
