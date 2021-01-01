import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

//@desc get all posts
export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message:error.message})        
    }
}

//@desc create post
export const createPost = async(req,res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

//@desc update post by id
export const updatePost = async(req,res) => {
    const {id: _id} = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
    res.json(updatedPost)
}

//@desc delete post by id
export const deletePost = async(req,res) => {
    const {id: id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    const deletePost = await PostMessage.findByIdAndRemove(id)

    res.json({message: 'Post deleted successfully'})
}

//@desc added like updates
export const likePost = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
    res.json(updatedPost)
}