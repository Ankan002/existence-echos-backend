const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { fetchUser } = require("../controllers/auth");
const {
  createNewEntry,
  getEntryByUserId,
  getEntryByEntryId,
  deleteEntryById,
} = require("../controllers/entry");

//POST: Route for creating a new entry. You need to be logged in to do so.
router.post(
  "/entry/create",
  [
    body("entrybody")
      .isLength({ min: 10 })
      .withMessage("The entry body should be at least 10 characters long."),
  ],
  fetchUser,
  createNewEntry
);

//GET: Route for getting all the entries by an user id. You need to be logged in to do so.
router.get("/entry/getentries/userid", fetchUser, getEntryByUserId);

//GET: Route for getting a single entry by entry id. You need to be logged in to do so.
router.get("/entry/getentry/:id", fetchUser, getEntryByEntryId);

//DELETE: Route for deleting an entry. You need to be logged in to do so.
router.delete("/entry/delete/:id", fetchUser, deleteEntryById)

//exporting the routes
module.exports = router;
