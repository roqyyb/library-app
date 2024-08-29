let books = [
  {
    title: "Gifted Hands",
    author: "Ben Carson",
    pages: 224,
    isRead: false,
    url: "https://m.media-amazon.com/images/I/51+dTVyg6lL._SY445_SX342_.jpg",
  },
  {
    title: "Failing Forward",
    author: "John C. Maxwell",
    pages: 209,
    isRead: true,
    url: "https://m.media-amazon.com/images/I/81FVV2TWZ7L._AC_UY218_.jpg",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    pages: 183,
    isRead: true,
    url: "https://m.media-amazon.com/images/I/51Hfv2MfNGL._SY445_SX342_.jpg",
  },
];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
  this.url = "https://m.media-amazon.com/images/I/71-EPF9XllL._SL1500_.jpg";
}

function addBookToLibrary(book) {
  // do stuff here
  books.push(book);
}

function displayBook() {
  const library = document.querySelector(".library");

  books.forEach((book) => {
    const bookCard = document.createElement("article");

    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", book.url);
    bookImage.setAttribute("alt", book.title);
    bookCard.appendChild(bookImage);

    const bookTitle = document.createElement("h4");
    bookTitle.textContent = "Title: " + book.title;
    bookCard.appendChild(bookTitle);

    const bookStatus = document.createElement("p");
    bookStatus.innerHTML = `<span>Status: </span> ${
      book.isRead
        ? `<span class="green">read</span>`
        : `<span class="red">not read</span>`
    }`;
    bookCard.appendChild(bookStatus);

    library.appendChild(bookCard);
  });
}
displayBook();

const dialog = document.querySelector("dialog");
const showBtn = document.querySelector("#add-new>button");
showBtn.addEventListener("click", () => {
  dialog.showModal();
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const modalForm = document.querySelector("dialog form");
  const formData = new FormData(modalForm);

  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");

  if (!title || !author || !pages) {
    dialog.close();
    return;
  }

  const newBook = new Book(title, author, pages);

  books = [];
  books.push(newBook);
  displayBook();

  modalForm.reset();

  dialog.close();
});
