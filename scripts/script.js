let bookshelf = document.querySelector(".content");
let formContent = document.querySelector(".form-element");

class Library {
    #collection = [];

    addBookToLibrary(book) {
        if(book.currentPages >= book.totalPages) {
            book.currentPages = book.totalPages;
            book.read = true;
        }
    
        if(book.read == true) {
            book.currentPages = book.totalPages;
        }
        
        if(!this.checkForDuplicateBook(book.title, book.author)) {
            this.#collection.push(book);
            this.displayLibrary();
        }
    }

    checkForDuplicateBook(title, author) {
        for(const book of this.#collection) {
            if(book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    displayLibrary() {
        this.resetBookshelf();

        this.#collection.forEach(book => {
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
            bookCard.dataset.bookId = String(this.#collection.indexOf(book));
    
            deleteBtn.addEventListener('click', (e) => {
                //the index in myLibrary where book is
                let bookIndex = e.target.closest('.book-card').dataset.bookId;
    
                this.#collection.splice(bookIndex, 1);
                this.displayLibrary();
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
    
            sliderSwitch.addEventListener('click', (e) => {
                //when clicked we should:
                //  - update currentPages to be totalPages
                //  - make currentPages uneditable unless we mark it as unread
                let bookIndex = e.target.closest('.book-card').dataset.bookId;
                if(!checkBoxSwitch.checked) {   //was false, is now true
                    this.#collection[bookIndex].read = true;
                    this.#collection[bookIndex].currentPages = this.#collection[bookIndex].totalPages;
                    this.displayLibrary();
                }
                else {  //was true, is now false
                    this.#collection[bookIndex].read = false;
                    this.#collection[bookIndex].currentPages = 0;
                    this.displayLibrary();
                }
            });
    
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
            bookTitle.innerText = book.title;
    
            let bookAuthor = document.createElement('h3');
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
    
            if(book.read) {
                currentPage.setAttribute('readonly', 'true');
            }
    
            currentPage.addEventListener('input', (e) => {
                let bookIndex = e.target.closest('.book-card').dataset.bookId;
                console.log("myLibrary book at index: " + bookIndex);
                console.log(this.#collection[bookIndex]);
                let pageAmt = e.target.value;
                
                if(pageAmt >= this.#collection[bookIndex].totalPages) {
                    book.read = true;
                    pageAmt = this.#collection[bookIndex].totalPages;
                    this.displayLibrary();
                }
                this.#collection[bookIndex].currentPages = parseInt(pageAmt);
                console.log(this.#collection);
            });
    
            currentPage.addEventListener('click', (e) => {
                let bookIndex = e.target.closest('.book-card').dataset.bookId;
                if(this.#collection[bookIndex].read) {     //the currentPage will be disabled
                    this.#collection[bookIndex].read = false;
                    checkBoxSwitch.checked = false;
                    currentPage.removeAttribute('readonly');
    
                }
            });
    
            currentPage.addEventListener('keyup', (e) => {
                if(e.key.toLowerCase() === 'enter') {
                    console.log("ENTER KEY PUSHED");
                    let clickOffEvent = new Event('input');
                    currentPage.blur();
                    currentPage.dispatchEvent(clickOffEvent);
                }
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
    }

    resetBookshelf() {
        bookshelf.innerHTML = "";
    }
}

class Book {
    title;
    author;
    currentPages;
    totalPages;
    read;

    constructor(title, author, currentPages, totalPages, read) {
        this.title = title;
        this.author = author;
        this.currentPages = currentPages;
        this.totalPages = totalPages;
        this.read = read;
    }
}

function clearForm() {
    let numPagesInput = document.querySelector("input[name='num-pages']");
    numPagesInput.removeAttribute('disabled');
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
    if(myLibrary.checkForDuplicateBook(title, author) == true) {
        window.alert("That book is already in your library!");
    }
    else {
        myLibrary.addBookToLibrary(new Book(title, author, currentPages, totalPages, read));
    }

    clearForm();
}

let formCheckbox = document.querySelector(".form-checkbox");
formCheckbox.addEventListener('change', (e) => {
    let currentPageInput = document.querySelector("input[name='num-pages']");
    let totalPageInput = document.querySelector("input[name='num-pages-total']");

    if(formCheckbox.checked) {
        currentPageInput.value = totalPageInput.value;
        currentPageInput.setAttribute('disabled', 'disabled');
    }
    else {
        currentPageInput.removeAttribute('disabled');
    }
});

function demoData() {
    let book1 = new Book("Witcher 1", "Sapowski", 234, 300, false);
    let book2 = new Book("Fellowship of the Ring", "Tolkien", 300, 500, false);
    let book3 = new Book("The Martian", "Andy Weir",369, 369, true);
    let book4 = new Book("Dresden Files 1", "Butcher", 125, 126, false);
    let book5 = new Book("Star Wars", "George Lucas", 500, 500, true);
    let book6 = new Book("Fellowship of the Ring", "Tolkien", 222, 222, true);

    myLibrary.addBookToLibrary(book1);
    myLibrary.addBookToLibrary(book2);
    myLibrary.addBookToLibrary(book3);
    myLibrary.addBookToLibrary(book4);
    myLibrary.addBookToLibrary(book5);
    myLibrary.addBookToLibrary(book6);
}

let myLibrary = new Library();
demoData();