import { Router } from "express";
const router = Router();

router.get("/", function (req, res, next) {
  res.status(200).send({
    status: true,
    message: "Welcome to BAKLAN API",
    version: "v1",
  });
});

import BookController from "../controllers/BookController";
router.get("/books", BookController.getAllBooks);
router.post("/books", BookController.addBook);
router.get("/books/:id", BookController.getABook);
router.put("/books/:id", BookController.updatedBook);
router.delete("/books/:id", BookController.deleteBook);

export default router;
