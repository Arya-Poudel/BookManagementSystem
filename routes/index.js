const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.get('/', (req, res) => {
  res.send('Book management system');
})

//get book list
router.get('/books', controller.book_list);
//create new book
router.post('/book/create', controller.create_book);
//update a book
router.put('/book/:id/update', controller.update_book);
//delete a book
router.delete('/book/:id/delete', controller.delete_book);


module.exports = router;