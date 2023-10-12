const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("ethers");

describe("Library", function () {
  async function deployLibraryFixture() {
    const ONE_GWEI = 1_000_000_000;
    const [owner, otherAccount] = await ethers.getSigners(0);
    const Library = await ethers.getContractFactory("Library");
    const library = await Library.deploy();
    return { library, owner, otherAccount };
  }

  describe("Tambah buku", function () {
    it("Seharusnya menambahkan buku dengan detail yang valid", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      const tx = await library.addBook("SomeISBN", "Book Title", 2023, "Author", {
        value: ethers.utils.parseEther("0.001"),
      });

      await tx.wait();

      expect(await library.getBookData("SomeISBN")).to.deep.equal(["SomeISBN", "Book Title", 2023, "Author"]);
    });

    it("Seharusnya tidak menambahkan buku jika ISBN sudah ada", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      await library.addBook("SomeISBN", "Book Title", 2023, "Author", {
        value: ethers.utils.parseEther("0.001"),
      });

      await expect(
        library.addBook("SomeISBN", "Another Title", 2024, "Different Author", {
          value: ethers.utils.parseEther("0.001"),
        })
      ).to.be.revertedWith("Book with this ISBN already exists");
    });
  });

  describe("Update buku", function () {
    it("Seharusnya memperbarui buku dengan detail yang valid", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      await library.addBook("SomeISBN", "Book Title", 2023, "Author", {
        value: ethers.utils.parseEther("0.001"),
      });

      const tx = await library.updateBook("SomeISBN", "Updated Title", 2024, "Updated Author");

      await tx.wait();

      expect(await library.getBookData("SomeISBN")).to.deep.equal(["SomeISBN", "Updated Title", 2024, "Updated Author"]);
    });

    it("Seharusnya tidak memperbarui buku jika ISBN tidak ditemukan", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      await expect(
        library.updateBook("SomeISBN", "Updated Title", 2024, "Updated Author")
      ).to.be.revertedWith("Book with this ISBN not found");
    });
  });

  describe("Hapus buku", function () {
    it("Seharusnya menghapus buku dengan ISBN yang valid", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      await library.addBook("SomeISBN", "Book Title", 2023, "Author", {
        value: ethers.utils.parseEther("0.001"),
      });

      const tx = await library.removeBook("SomeISBN");

      await tx.wait();

      expect(await library.getBookData("SomeISBN")).to.deep.equal(["", "", 0, ""]);
    });

    it("Seharusnya tidak menghapus buku jika ISBN tidak ditemukan", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      await expect(library.removeBook("SomeISBN")).to.be.revertedWith("Book with this ISBN not found");
    });
  });

  describe("Get data buku berdasarkan ISBN", function () {
    it("Seharusnya mengembalikan data buku yang benar", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      await library.addBook("SomeISBN", "Book Title", 2023, "Author", {
        value: ethers.utils.parseEther("0.001"),
      });

      const bookData = await library.getBookData("SomeISBN");

      expect(bookData).to.deep.equal(["SomeISBN", "Book Title", 2023, "Author"]);
    });

    it("Seharusnya mengembalikan data buku yang benar jika ISBN tidak ditemukan", async function () {
      const { library, owner } = await loadFixture(deployLibraryFixture);

      const bookData = await library.getBookData("NonExistentISBN");

      expect(bookData).to.deep.equal(["", "", 0, ""]);
    });
  });
});
