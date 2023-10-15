const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Library", function(){
  let library;
  let admin;
  const ISBN = "1234567890";
  const title = "How to Basic";
  const yearCreated = 2017;
  const author = "Crazy Guy";

  before(async function() {
    [admin] = await ethers.getSigners();
    let Library = await ethers.getContractFactory("Library");
    library = await Library.deploy();
  })

  describe("addBook", function() {
    it("should add a book successfully", async function() {
      await library.addBook(ISBN, title, yearCreated, author);
      const book = await library.bookList(ISBN);
      expect(book.isbn).to.equal(ISBN);
      expect(book.title).to.equal(title);
      expect(book.yearCreated).to.equal(yearCreated);
      expect(book.author).to.equal(author);
    });

    it("should revert if book with this ISBN already exists", async function() {
      await expect(
        library.addBook(ISBN, "IDK", 2011, "Forgotten Hope")
      ).to.be.revertedWith("Book with this ISBN already exists");
    });
  });

  describe("getBookData", function() {
    it("should return book data if the book exists", async function() {
      const bookData = await library.getBookData(ISBN);
      expect(bookData[0]).to.equal(ISBN);
      expect(bookData[1]).to.equal(title);
      expect(bookData[2]).to.equal(yearCreated);
      expect(bookData[3]).to.equal(author);
    });

    it("should revert if the book does not exist", async function() {
      await expect(
        library.getBookData("ISBN")
      ).to.be.revertedWith("Book with this ISBN not found");
    });
  });

  describe("updateBook", function() {
    it("should update a book successfully", async function() {
      const newTitle = "Update Book";
      await library.updateBook(ISBN, newTitle, 2019, "HoneyComeBear");
      const updatedBook = await library.bookList(ISBN);
      expect(updatedBook.title).to.equal(newTitle);
    });
  
    it("should revert if book with this ISBN not found", async function() {
      await expect(
        library.updateBook("ISBN", "Aircraft", 2019, "HoneyComeBear")
      ).to.be.revertedWith("Book with this ISBN not found");
    });
  });

  describe("removeBook", function() {
    it("should remove a book successfully", async function() {
      await library.removeBook(ISBN);
      const removedBook = await library.bookList(ISBN);
      expect(removedBook.ISBN).to.equal(undefined);
    });

    it("should revert if book with this ISBN not exists", async function() {
      await expect(
        library.removeBook(ISBN)
      ).to.be.revertedWith("Book with this ISBN not found");
    });
  });


});