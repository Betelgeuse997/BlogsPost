require('dotenv').config();
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
};

const getUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email});

        if (!user) {
            res.status(202).json({ message: "User not found"});
        } else {
            const matchPassword = await bcrypt.compare(password, user.password);

            if (matchPassword) {
                const token = createToken(user._id);
                res
                    .status(200)
                    .json({ message: "Signing in...", token, userId: user._id, name: user.name, email: user.email});
            } else {
                res.status(201).json({ message: "Wrong Password"});
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingNameUser = await userModel.findOne({ name });
        const existingEmailUser = await userModel.findOne({ email });

        if (existingNameUser) {
            res.json({ message: " Username already exists "});
        } else if (existingEmailUser) {
            res.json({ message: " Email ID already exists "});
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
      
            const user = await userModel.create({
              name,
              email,
              password: hashedPassword,
              followers: [],
              following: [],
            });

            res.json({ message: "Account created successfully" });
        }
    } catch (err) {
            res.status(500).json(err);
    }
};

const followUser = async (req, res) => {
    

    try {const { userEmailToFollow } = req.params;
        const userToFollow = await userModel.findOne({email: userEmailToFollow});
        const currentUser = await userModel.findById(req.user._id);
        if (!userToFollow) {
            return res.status(404).json({ message: 'User to follow not found' });
        }

        if (currentUser.following.includes(userEmailToFollow)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        if (userEmailToFollow.toString() === currentUser.email.toString())
        {
            res.status(403).json({ message: 'You cannot follow yourself' });
        }
        else {
            currentUser.following.push(
                {
                user: userToFollow._id,
                name: userToFollow.name,
                email: userToFollow.email,
            }
            );
            await currentUser.save();
    
            userToFollow.followers.push({
                user: req.user._id,
                name: currentUser.name,
                email: currentUser.email,
            });
            await userToFollow.save();
    
            res.status(200).json({ message: 'You are now following this user' });
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const unfollowUser = async (req, res) => {
    

    try {const { userEmailToUnfollow } = req.params;
        const userToUnfollow = await userModel.findOne({email: userEmailToUnfollow});
        const currentUser = await userModel.findById(req.user._id);

        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User to unfollow not found' });
        }

        if (!currentUser.following.some((followedUser) => followedUser.email === userEmailToUnfollow)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        currentUser.following = currentUser.following.filter(
            (followedUser) => followedUser.email !== userEmailToUnfollow
        );
        await currentUser.save();

        userToUnfollow.followers = userToUnfollow.followers.filter(
            (follower) => follower.email !== currentUser.email
        );
        
        await userToUnfollow.save();

        res.status(200).json({ message: 'You have unfollowed this user' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const searchUser = async (req, res) => {
    const { userToSearch } = req.params;

    try {
        const users = await userModel.find({
            name: { $regex: new RegExp(userToSearch, 'i') },
        }).select('name email');

        res.status(200).json(users);

    }  catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const fetchUserDetails = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await userModel.findOne({ email: email});

        if (!user) {
            res.status(202).json({ message: "User not found"});
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getUser, createUser, followUser, unfollowUser, searchUser, fetchUserDetails };