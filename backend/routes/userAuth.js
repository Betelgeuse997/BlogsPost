const express = require("express");
const { getUser, createUser, followUser, unfollowUser, searchUser, fetchUserDetails } = require("../controller/userController.js");
const { forgotPassword, resetPassword } = require("../controller/authController.js");
const auth = require("../middleware/authMiddleware.js")


const router = express.Router();

router.post("/user/signIn", getUser);
router.post("/user/signUp", createUser);

router.post("/user/forgotPassword", forgotPassword);
router.put("/user/resetPassword", resetPassword);

router.post('/follow/:userEmailToFollow', auth, followUser);
router.post('/unfollow/:userEmailToUnfollow', auth, unfollowUser);

router.get('/users/search/:userToSearch', auth, searchUser);

router.get('/user/fetch/:email', auth, fetchUserDetails);

module.exports = router;