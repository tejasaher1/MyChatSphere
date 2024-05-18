const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createPost = function(req, res){
    Post.create({
        content: req.body.content,
        user : req.user.id
    })
    req.flash('success','Post Send');
    return res.redirect('back');
}

module.exports.destroyPost = function(req,res){
    const postId = req.query.postId;
    
    Post.findById(postId)
    .then(function(post){
        if(req.user.id == post.user){

            post.deleteOne()
            .then(function(post){
                console.log("Post Deleted")
            })

            Comment.deleteMany({Post:postId})
            .then(function(comment){
                console.log("Comment's related to Post Deleted");
                req.flash('success','Post deleted');
                return res.redirect('back');
            })
            .catch(function(error){
                console.log("Error in deleting comment related to Post",error);
            })
        }   
    })
    .catch(function(error){
        console.log("Error in deleting the Post", error);
    })

    
}