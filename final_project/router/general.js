const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "Customer successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "Customer already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books,null,4)));
    })

    get_books.then((successMessage) => {
        console.log("Task 10 done")
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let get_isbn = new Promise((resolve, reject) => {
        let isbn = req.params.isbn;
        resolve(res.send(JSON.stringify(books[isbn],null,4)));
    })

    get_isbn.then((successMessage) => {
        console.log("Task 11 done")
    })
    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let get_author = new Promise((resolve, reject) => {
        let author = req.params.author;
        let found = 0;
        for (keys in books) {
            if (books[keys]["author"] === author) {
                found = keys;
            }
        }
        resolve(res.send(JSON.stringify(books[found],null,4)));
    })

    get_author.then((successMessage) => {
        console.log("Task 12 done")
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let get_title = new Promise((resolve, reject) => {
        let title = req.params.title;
        let found = 0;
        for (keys in books) {
              if (books[keys]["title"] === title) {
                  found = keys;
              }
          }
        resolve(res.send(JSON.stringify(books[found],null,4)));
    })

    get_title.then((successMessage) => {
        console.log('Task 13 done')
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn]["reviews"],null,4))
});

module.exports.general = public_users;
