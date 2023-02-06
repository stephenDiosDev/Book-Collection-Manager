let myLibrary = [];
let bookshelf = document.querySelector(".content");
let formContent = document.querySelector(".form-element");

function Book(title, author, currentPages, totalPages, read) {
    this.title = title;
    this.author = author;
    this.currentPages = currentPages;
    this.totalPages = totalPages
    this.read = read;
}

function addBookToLibrary(book) {    
    if(book.currentPages >= book.totalPages) {
        book.currentPages = book.totalPages;
        book.read = true;
    }

    if(book.read == true) {
        book.currentPages = book.totalPages;
    }
    
    if(!checkForDuplicateBook(book.title, book.author)) {
        myLibrary.push(book);
        displayLibrary();
    }
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
        bookCard.dataset.bookId = String(myLibrary.indexOf(book));

        deleteBtn.addEventListener('click', (e) => {
            //the index in myLibrary where book is
            let bookIndex = e.target.closest('.book-card').dataset.bookId;

            myLibrary.splice(bookIndex, 1);
            displayLibrary();
        });

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

        if(book.read) {
            book.currentPages = book.totalPages;
        }

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

        currentPage.addEventListener('input', (e) => {
            // update current page amt in the library array
            // if currentpage > totalpage, mark as read!
            let bookIndex = e.target.closest('.book-card').dataset.bookId;
            console.log("myLibrary book at index: " + bookIndex);
            console.log(myLibrary[bookIndex]);
            let pageAmt = e.target.value;
            
            if(pageAmt >= myLibrary[bookIndex].totalPages) {
                book.read = true;
                pageAmt = myLibrary[bookIndex].totalPages;
                displayLibrary();
            }
            myLibrary[bookIndex].currentPages = parseInt(pageAmt);
            console.log(myLibrary);
        });

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
    console.log(myLibrary);
}

function checkForDuplicateBook(title, author) {
    for(const book of myLibrary) {
        if(book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function clearForm() {
    formContent.reset();
}

function submitBookForm(event) {
    let data = new FormData(formContent);
    const value = Object.fromEntries(data.entries());
    value.read = data.getAll('read');

    let title = String(value['title']);
    let author = String(value['author']);
    let currentPages = parseInt(value['num-pages']);
    let totalPages = parseInt(value['num-pages-total']);
    let read = false;

    if(value.read.length > 0) {
        read = true;
    }
    
    //check that we don't have a duplicate book already
    if(checkForDuplicateBook(title, author) == true) {
        window.alert("That book is already in your library!");
    }
    else {
        addBookToLibrary(new Book(title, author, currentPages, totalPages, read));
    }

    clearForm();
}

function demoData() {
    let book1 = new Book("Witcher 1", "Sapowski", 234, 300, false);
    let book2 = new Book("Fellowship of the Ring", "Tolkien", 300, 500, false);
    let book3 = new Book("The Martian", "Andy Weir",369, 369, true);
    let book4 = new Book("Dresden Files 1", "Butcher", 125, 126, false);
    let book5 = new Book("Star Wars", "George Lucas", 500, 500, true);
    let book6 = new Book("Fellowship of the Ring", "Tolkien", 222, 222, true);

    addBookToLibrary(book1);
    addBookToLibrary(book2);
    addBookToLibrary(book3);
    addBookToLibrary(book4);
    addBookToLibrary(book5);
    addBookToLibrary(book6);
}

demoData();