const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createUser = function(req,res){
    // first Check that email id which is use while creating account is already present in DB - 
    User.findOne({
        email: req.body.email
    })
    .then(function(user){
        if(!user){
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            return res.render("home", {
                title: 'Home'
            });
            
        }else{
            return res.status(404).send("Account is already present");
        }
    });
}

module.exports.getCreateAccountPage = function(req,res){
    if(req.user){
        return res.redirect('/users/profile');
    }
    
    return res.render('sign_up', {
        title : 'Create Account'
    });
}

// ---------------------------------------------------------------------------------------------------------------?
// Manual Authentication

// module.exports.signIn = function(req,res){
    
//     User.findOne({
//         email: req.body.email,
//         password : req.body.password
//     })
//     .then(function(user){
//         if(user){
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');
//         }else{
//             return res.redirect('back');
//         }
//     })
//     .catch(function(error){
//         console.log(error);
//         return;
//     })
// }


// module.exports.profile = function(req,res){
//     if(req.cookies.user_id){
//         User.findById(
//             req.cookies.user_id
//         )
//         .then(function(user){
//             if(user){
//                 return res.render('profile', {
//                     title : 'Profile',
//                     name : user.name
//                 });
//             }else{
//                 return res.redirect('/');
//             }
//         })
//         .catch(function(error){
//             console.log(error);
//             return;
//         })
//     }else{
//             return res.redirect('/');
//     }
// }

// ---------------------------------------------------------------------------------------------------------------

//Using Passport-local Authentication

module.exports.signIn = function(req,res){
    req.flash('success','Logging Successfu');
    
    return res.redirect('/users/profile');
}

module.exports.signOut = function(req,res){
    req.logout(function(err) {
        if (err) {
            // Handle error
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out");
        }
        req.flash('success','Logout Successful');
        // Redirect the user to the home page or any other desired destination
        return res.redirect('/');
    });
}

// Using Async Await method - 
module.exports.profile =async function(req,res){
    
    try{
        const allPost = await Post.find({})
        .populate('user')
        .populate({
            path:'commentArray',
            populate:{
                path : 'user'
            }
        });

        const allUsersFriends = await User.find({ _id: { $ne: req.user } });
        
        return res.render('profile', {
            title : 'Profile',
            name : req.user.name,
            Posts : allPost,
            friends : allUsersFriends
        })
    }catch(error){
        console.log('Error',error);
    }
             
}


module.exports.profileUpdatePage = function(req,res){
    return res.render('profile_Update', {
        title: "User_Profile_Update"
    });
}

module.exports.updateProfile = function(req,res){
    const UserId = req.query.UserId;
    if(req.body.name || req.body.email){
        User.findByIdAndUpdate(UserId , req.body)
        .then(function(user){
            console.log('User found', req.body, UserId)
            return res.redirect('/users/profile');
        })
        .catch(function(error){
            console.log('Error in Profile Update', error)
            return res.status(401).send('Profile not Updated');
        })
    }else{
        req.flash('error','Please add information');
        return res.redirect('back');
    }

}
