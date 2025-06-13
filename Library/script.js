const myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function displayBooks() {
  const container = document.getElementById('bookContainer');
  container.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? 'Yes' : 'No'}</p>
      <button class="toggleReadBtn">Toggle Read</button>
      <button class="removeBtn">Remove</button>
    `;

    container.appendChild(card);

    card.querySelector('.removeBtn').addEventListener('click', () => {
      removeBookFromLibrary(book.id);
    });

    card.querySelector('.toggleReadBtn').addEventListener('click', () => {
      book.toggleRead();
      displayBooks();
    });
  });
}

// Initial demo books (optional)
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);

// Modal handling
const dialog = document.getElementById('bookDialog');
document.getElementById('newBookBtn').onclick = () => dialog.showModal();
document.getElementById('closeDialog').onclick = () => dialog.close();

document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = parseInt(document.getElementById('pages').value);
  const isRead = document.getElementById('readStatus').checked;

  if (title && author && !isNaN(pages)) {
    addBookToLibrary(title, author, pages, isRead);
    document.getElementById('bookForm').reset();
    dialog.close();
  }
});
