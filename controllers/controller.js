const Book = require("../models/book");
const { body, validationResult } = require("express-validator");

exports.book_list = (req, res, next) => {
	Book.find({}).exec((err, bookList) => {
		if (err) {
			return res.status(500).json({message: 'Internal error'})
		}
		res.status(200).json({ booklist: bookList });
	});
};

exports.create_book = [
	//validate and sanitise
	body("name", "Name cannot be empty")
		.trim()
		.exists({ checkFalsy: true })
		.escape(),
	body("ISBN", "ISBN must exist and be 13 characters")
		.trim()
		.exists({ checkFalsy: true })
		.isLength({ min: 13, max: 13 })
		.escape(),

	//process request
	(req, res, next) => {
		//check for errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.errors });
		}

		Book.findOne({ ISBN: req.body.ISBN }, (err, result) => {
			if (err) {
				return res.status(500).json({message: 'Internal error'})
			}
			if (result) {
				return res
					.status(400)
					.json({ message: "This ISBN is already taken by a book" });
			} else {
				//create and save the new book
				const book = new Book({
					name: req.body.name,
					ISBN: req.body.ISBN,
				});

				book.save((err) => {
					if (err) {
						return res.status(500).json({message: 'Internal error'})
					}
					return res.status(200).json({ message: "Book saved" });
				});
			}
		});
	},
];

exports.update_book = [
	//validate and sanitise
	body("name", "Name cannot be empty")
		.trim()
		.exists({ checkFalsy: true })
		.escape(),
	body("ISBN", "ISBN must exist and be 13 characters")
		.trim()
		.exists({ checkFalsy: true })
		.isLength({ min: 13, max: 13 })
		.escape(),

	//process request
	(req, res, next) => {
		//check for errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.errors });
		}

		const book = new Book({
			_id: req.params.id,
			name: req.body.name,
			ISBN: req.body.ISBN,
		});
		//update the book
		Book.findByIdAndUpdate(req.params.id, book, {}, (err) => {
			if (err) {
				return res.status(500).json({message: 'Internal error'})
			}
			return res.status(200).json({ message: "Book updated" });
		});
	},
];

exports.delete_book = (req, res, next) => {
	Book.findByIdAndRemove(req.params.id, function deleteBook(err) {
		if (err) {
			return res.status(500).json({message: 'Internal error'})
		}
		res.status(200).json({ message: "Book deleted" });
	});
};
