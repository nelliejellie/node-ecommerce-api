const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const User = require('../models/user')


// create a user
exports.create_user = (req, res, next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Mail exists'
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        userName: req.body.userName,
                        password: hash
                    })
                     user.save()
                     .then(result => {
                        console.log(res)
                        res.status(201).json({
                            message: "User created",
                            user: result
                        })
                     })
                     .catch(err => {
                        console.log(err)
                        res.status(201).json({
                            error: err
                        })
                     })
                }
            })
        }
    })
    .catch(err =>{
        res.status(401).json({
            error: err
        })
    })
    
}

// login to a user
exports.login = (req, res, next) =>{
    User.find({email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message:"Auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err, result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.JWT_KEY,{
                    expiresIn:"1h"
                })
                return res.status(200).json({
                    message: "Auth successful",
                    token:token
                })
            }
            res.status(401).json({
                message: "Auth failed"
            })
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// delete a user
exports.delete_user = (req, res, next)=>{
    User.remove({_id: req.params.id})
    .exec()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            message: "user deleted"
        });
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
}