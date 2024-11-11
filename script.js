let books = [];
let members = [];
let borrowedBooks = [];

function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;

    if (title && author) {
        books.push({ title, author });
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        displayAvailableBooks();
    } else {
        alert('Please enter both book title and author');
    }
}

function displayAvailableBooks() {
    const availableBooksDiv = document.getElementById('availableBooks');
    availableBooksDiv.innerHTML = books.map(book => `"${book.title}" by ${book.author}`).join('<br>');
}

function registerMember() {
    const name = document.getElementById('memberName').value;

    if (name) {
        members.push({ name, borrowedBooks: [] });
        document.getElementById('memberName').value = '';
        displayMembers();
    } else {
        alert('Please enter a member name');
    }
}

function borrowBook() {
    const memberName = document.getElementById('borrowMemberName').value;
    const bookTitle = document.getElementById('borrowBookTitle').value;

    const book = books.find(b => b.title === bookTitle);
    const member = members.find(m => m.name === memberName);

    if (book && member) {
        borrowedBooks.push({ memberName, book });
        books = books.filter(b => b.title !== bookTitle);
        displayAvailableBooks();
        displayBorrowedBooks();
    } else {
        alert('Book or Member not found');
    }
}

function returnBook() {
    const memberName = document.getElementById('returnMemberName').value;
    const bookTitle = document.getElementById('returnBookTitle').value;

    const borrowedBookIndex = borrowedBooks.findIndex(b => b.book.title === bookTitle && b.memberName === memberName);
    
    if (borrowedBookIndex > -1) {
        books.push(borrowedBooks[borrowedBookIndex].book);
        borrowedBooks.splice(borrowedBookIndex, 1);
        displayAvailableBooks();
        displayBorrowedBooks();
    } else {
        alert('Return details not found');
    }
}

function displayBorrowedBooks() {
    const borrowedBooksDiv = document.getElementById('borrowedBooks');
    borrowedBooksDiv.innerHTML = borrowedBooks.map(b => `"${b.book.title}" by ${b.book.author} (Borrowed by: ${b.memberName})`).join('<br>');
}

function displayMembers() {
    const membersListDiv = document.getElementById('membersList');
    membersListDiv.innerHTML = members.map(m => `${m.name} (${m.borrowedBooks.length ? m.borrowedBooks.join(', ') : 'No borrowed books'})`).join('<br>');
}
