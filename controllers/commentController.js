
const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.createComment = function(req, res){
    const postId = req.query.postId;
    Post.findById({ _id : postId })
    .then(function(post){
        Comment.create({
            content : req.body.commentContent,
            user : req.user.id,
            Post : postId
        })
        .then(function(comment){
            post.commentArray.push(comment);
            post.save();
        })

    })
    
    req.flash('success','Comment Send');
    return res.redirect('back');
};


//Using async await method - 
module.exports.destroyComment = async function(req, res){
    const commentId = req.query.commentId;
    try{
        const comment = await Comment.findById(commentId);
        if(req.user.id == comment.user){
            const postId = comment.Post; 

            await Comment.deleteOne({_id:commentId});

            await Post.findByIdAndUpdate(postId, {$pull : {commentArray:commentId}})
            req.flash('success','Comment deleted');
            return res.redirect('back');
         
        }else{
            return res.redirect('back');
        }
    }catch(error){
        console.log("Error", error);
    }   
}