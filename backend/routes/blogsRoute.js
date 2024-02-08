const express = require("express");
const auth = require("../middleware/authMiddleware.js")
const blogModel = require("../models/blogModel.js");
const userModel = require("../models/userModel.js")

const router = express.Router();

router.get('/blogs',auth, async (req,res) => {
    try {
        const currentUser = await userModel.findById(req.user._id);
        const followingIds = currentUser.following.map(user => user.user);
        const blogs = await blogModel.find({
            $or: [
                { 'userName.user': req.user._id },
                { 'userName.user': { $in: followingIds } }
            ]
        });
        return res.status(200).json({
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

router.get('/userblogs/:id',auth, async (req,res) => {
    try {const { id } = req.params;
        const blogs = await blogModel.find({'userName.user': id });
        return res.status(200).json({
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

router.get('/blogs/:id', auth, async (req,res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        return res.status(200).json(blog);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

router.put('/blogs/:id', auth, async (req,res) => {
    try {
        const { id } = req.params;
        const blogresult = await blogModel.findById(id)

        if (
            !req.body.title || !req.body.story
        ) {
            return res.status(400).send({
                message: 'All fields required',
            });
        }

        const { _id: userId } = req.user;
    
        if (userId.toString() === blogresult.userName.user.toString())
        {
            const result = await blogModel.findByIdAndUpdate(id, req.body);

            if (!result) {
                return res.status(404).json({ message: 'Blog not found'});
            }

            return res.status(200).send({ message: 'Blog updated successfully'});

        }

        else {
            return res.status(403).send({ message: 'Forbidden to edit'});
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

router.delete('/blogs/:id', auth,  async (req,res) => {
    try {
        const { id } = req.params;
        const blogresult = await blogModel.findById(id, req.body)

        if (!blogresult) {
            return res.status(404).json({ message: 'Blog not found' });
          }

        const { _id: userId } = req.user;

        if (userId.toString() === blogresult.userName.user.toString())
        {   
            const result = await blogModel.findByIdAndDelete(id, req.body);

            if (!result) {
                return res.status(404).json({ message: 'Blog not found'});
            }

            return res.status(200).send({ message: 'Blog deleted'});
        }
        else {
            return res.status(403).send({ message: 'Forbidden to delete'});
        }
        

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

router.post('/blogs/', auth, async (req, res) => {
    try {
        if (
            !req.body.title || !req.body.story
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }
        const newBlog = {
            title: req.body.title,
            story: req.body.story,
            likes: [],
            userName: { 
                user: req.user._id,
                name: req.user.name, 
            },
        };
        const blog = await blogModel.create(newBlog);
        return res.status(201).send(blog);
    }
    catch (error) {
        console.log(error.message);
        console.log(req.user)
        res.status(500).send({ message: error.message});
    }
});

router.put('/likeblog/:id', auth, async (req,res) => {
    try {
        
        const { id } = req.params;
        const { _id: userId } = req.user;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the user has already liked the blog
        if (blog.likes.includes(userId)) {
            return res.status(400).json({ message: 'Blog already liked by the user' });
        }

        blog.likes.push(userId);
        await blog.save();

        return res.status(200).send({ message: 'Blog liked successfully'});
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

router.put('/unlikeblog/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id: userId } = req.user;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the user has liked the blog
        if (!blog.likes.includes(userId)) {
            return res.status(400).json({ message: 'Blog not liked by the user' });
        }

        blog.likes = blog.likes.filter(likedUserId => {
            return likedUserId.toString() !== userId.toString();
          });
        await blog.save();

        return res.status(200).json({ message: 'Blog unliked successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;