let myLibrary = [];

function Book(name, author, pages, readStatus) {
  this.bookName = name
  this.bookAuthor = author;
  this.numberOfPages = pages;
  this.isRead = readStatus;
}

function addBookToLibrary(name, author, pages, readStatus) {
  let newBook = new Book(name, author, pages, readStatus);
  myLibrary.unshift(newBook);
}

function initialRender () {
  for (let i = (myLibrary.length - 1); i >= 0; i--) {
    let tb = document.getElementById('books');
    let tr = tb.insertRow(1);

    let cell = tr.insertCell(0);
    let cell1 = tr.insertCell(1);
    let cell2 = tr.insertCell(2);
    let cell3 = tr.insertCell(3);

    cell.innerHTML ='<input type="button" value="-" onclick="deleteBook(this)" class="removeButton">' + myLibrary[i].bookName;
    cell1.innerHTML = myLibrary[i].bookAuthor;
    cell2.innerHTML = myLibrary[i].numberOfPages;

    if (myLibrary[i].isRead === false) {
      cell3.innerHTML = '<input type="button" value="No" onclick="changeStatus(this)" id="changeStatus">';
      changeColor(document.getElementById('changeStatus'), 'rgba(178, 34, 34, 0.438)');
    } 
    else {
      cell3.innerHTML = '<input type="button" value="Yes" onclick="changeStatus(this)" id="changeStatus">';
      changeColor(document.getElementById('changeStatus'), 'rgba(0, 128, 0, 0.438)');
    }
  }
}

function deleteBook (r) {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById('books').deleteRow(i);

    myLibrary.splice((i-1), 1);
}

function showForm () {
  let bookForm = document.getElementById('addBookForm').style.display;

  if (bookForm === 'block') {
    document.getElementById('addBookForm').style.display = 'none';
  }
  else {
    document.getElementById('addBookForm').style.display = 'block';
  }
}

function addBook () {
  let title = document.getElementById('bookTitle').value;
  let author = document.getElementById('bookAuthor').value;
  let pages = document.getElementById('pages').value;
  let isRead = document.getElementById("isRead");

  addBookToLibrary(title, author, pages, isRead.checked);

  let tb = document.getElementById('books');
  let tr = tb.insertRow(1);

  let cell = tr.insertCell(0);
  let cell1 = tr.insertCell(1);
  let cell2 = tr.insertCell(2);
  let cell3 = tr.insertCell(3);

  cell.innerHTML ='<input type="button" value="-" onclick="deleteBook(this)" class="removeButton">' + title;
  cell1.innerHTML = author;
  cell2.innerHTML = pages;

  if (isRead.checked) {
    cell3.innerHTML = '<input type="button" value="Yes" onclick="changeStatus(this)" id="changeStatus">';
    changeColor(document.getElementById('changeStatus'), 'rgba(0, 128, 0, 0.438)');
  }
  else {
    cell3.innerHTML = '<input type="button" value="No" onclick="changeStatus(this)" id="changeStatus">';
    changeColor(document.getElementById('changeStatus'), 'rgba(178, 34, 34, 0.438)');
  }
}

function changeStatus (e) {
  let index = e.parentNode.parentNode.rowIndex;

  if (e.value === 'No') {
    e.value = 'Yes';
    myLibrary[index - 1].isRead = true;

    changeColor(e, 'rgba(0, 128, 0, 0.438)');
  }
  else {
    e.value = 'No';
    myLibrary[index - 1].isRead = false;

    changeColor(e, 'rgba(178, 34, 34, 0.438)');
  }
}

function changeColor (e, color) {
  e.style.backgroundColor = color;
}

document.getElementById('addBook').addEventListener("click", addBook);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 223, true);
initialRender();