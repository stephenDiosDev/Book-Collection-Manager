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

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const book2 = new Book("Dresden Files Book 1", "Some dude idk", 167, true);

console.log(book1.getInfo());
console.log(book2.getInfo());