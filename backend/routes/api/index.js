// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const gamesRouter = require("./games.js");
const reviewRouter = require("./reviews.js");
const cartRouter = require("./carts.js");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use("/games", gamesRouter);

router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/reviews", reviewRouter);

router.use("/user", cartRouter);
// router.post("/test", (req, res) => {
// 	res.json({ requestBody: req.body });
// });
router.get("/restore-user", (req, res) => {
	return res.json(req.user);
});

const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
	return res.json(req.user);
});

module.exports = router;
