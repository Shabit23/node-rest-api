const express = require('express');

const router = express.Router();

const Blog = require('../models/Blog');

//Get All Blogs
router.get('/', async (req, res) => {
    try{
        const showBlogs = await Blog.find();
        res.json(showBlogs)
    } catch (err) {
        res.json({ message:err });
    }
});

//Post a Blog
router.post('/', async (req,res) => {
    const blog = new Blog({
        title:req.body.title,
        desc: req.body.desc,
    });

    try{
        const savedBlog = await blog.save();
            res.json(savedBlog);
    } catch(err){
        res.json({ message: err });
    }
});

//Get Specific Blog
router.get('/:id', async (req,res) => {
    try{
        const specBlog = await Blog.findById(req.params.id);
        res.json(specBlog);
    } catch (err) {
        res.json({ message:err });
    }
});

//Delete Blog
router.delete('/:id', async (req,res) => {
    try{
        const removedBlog = await Blog.deleteOne({ _id:req.params.id });
        res.json(removedBlog);
    } catch (err) {
        res.json({ message: err });
    }
});     

//Update Blog
router.patch('/:id', async (req,res) => {
    try{
        const updatedBlog = await Blog.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title, 
                      desc: req.body.desc,
                      status: req.body.status
            } }
        );
        res.json(updatedBlog);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router; 