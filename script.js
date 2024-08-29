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

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  // do stuff here
  books.push(book);
}

function displayBook(books) {
  const library = document.querySelector(".library");
  library.innerHTML = "";

  if (books.length === 0) {
    library.innerHTML = `<h2>Empty!</h2>`;
  }

  books.forEach((book, index) => {
    const bookCard = document.createElement("article");
    bookCard.setAttribute("id", index);

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

    const bookControls = document.createElement("div");
    bookControls.style.display = "flex";
    bookControls.style.gap = "10px";
    bookControls.style.marginTop = "10px";

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = "Toggle Read";
    bookControls.appendChild(toggleReadBtn);

    toggleReadBtn.addEventListener("click", () => {
      const modifiedBooks = books.map((b) => {
        if (b.title === book.title) {
          return { ...book, isRead: !book.isRead };
          //   b.toggleRead();
        }
        return b;
      });
      displayBook(modifiedBooks);
    });

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.textContent = "Delete";
    bookControls.appendChild(deleteBookBtn);

    deleteBookBtn.addEventListener("click", () => {
      const filteredBooks = books.filter((b) => b.title != book.title);
      console.log(filteredBooks);
      displayBook(filteredBooks);
    });

    bookCard.appendChild(bookControls);

    library.appendChild(bookCard);
  });
}
displayBook(books);

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

  //   books = [];
  books.push(newBook);
  displayBook(books);

  modalForm.reset();

  dialog.close();
});
