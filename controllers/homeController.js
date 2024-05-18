const express = require('express');

module.exports.home = function(req,res){
    if(req.user){
        return res.redirect('/users/profile');
    }
    return res.render('home', {
        title: 'Home'
    });
}