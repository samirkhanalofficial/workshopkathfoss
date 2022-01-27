router = require('express').Router()
const md5 = require('md5')
const userSchema = require('../models/userSchema')

// for getting all users
const getUsers = async(req, res) => {
    const users = await userSchema.find()
    res.json(users)
    res.end()
}

// for editing a user
const editUser = async(req, res) => {

    if ('email' in req.params && 'password' in req.params && 'name' in req.params) {
        var email = req.params.email
        var name = req.params.name
        var password = md5(req.params.password)
        await userSchema.findOneAndReplace({
            email: email,
            password: password
        }, {
            name,
            email,
            password

        }).then((value) => {
            console.log(value)
            if (value) {
                res.json({
                    "message": "name updated"
                })

            } else {
                res.json({
                    "message": "Failed to update name"
                })
            }
        })

    } else {
        res.json({
            "message": "invalid request"
        })
    }



    res.end()
}

// deleting user
const deleteUser = async(req, res) => {

    if ('email' in req.params && 'password' in req.params) {
        var email = req.params.email
        var password = md5(req.params.password)
        await userSchema.deleteOne({
            email: email,
            password: password
        }).then((value) => {
            if (value.deletedCount == 1) {
                res.json({
                    "message": "User deleted"
                })
            }
            throw ''


        }).catch((err) => {

            res.json({
                "message": "Error deleting user" + err
            })
        })

    } else {
        res.json({
            "message": "invalid request"
        })
    }



    res.end()
}

// registering user
const addUser = async(req, res) => {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password
    if ('name' in req.body && 'password' in req.body && 'email' in req.body) {
        if (name.length > 3 && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && password.length >= 8) {
            password = md5(req.body.password)
            const user = await userSchema.find({
                email: email
            })
            if (user.length == 1) {
                res.json({
                    "status": 0,
                    "messsage": "User Already Exists."
                })
            } else {


                await userSchema.create({
                    name,
                    email,
                    password
                }).then((value) => {
                    console.log(value)
                    if (value) {
                        res.json({
                            "status": 1,
                            "messsage": "User Successfully registered."
                        })
                    } else {
                        res.json({
                            "status": 0,
                            "messsage": "Error in user registration."
                        })
                    }

                })
            }

        } else {
            res.json({
                "status": 0,
                "message": "name must be atleast 8 character long, password must be 8 character long and email should be valid."
            })
        }

    } else {
        res.json({
            "status": 0,
            "message": "invalid request"
        })
    }

    res.end()
}

function deleteUser2(req, res) {
    console.log(req.query)
    res.json(req.query)
}
// routes
router.get("/user", getUsers)
router.put("/user/:email/:password/:name", editUser)
router.delete("/user/:email/:password", deleteUser)
router.post("/user", addUser)
router.delete("/user", deleteUser2)


module.exports = router