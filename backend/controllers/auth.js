const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { registration } = require("../models/auth");


exports.register = (req, res) => {
    const { username, password } = req.body;

    if(!username && !password){
        return res.status(422).json({
            error: "Registration not successful. Valid data not sent in the request."
        })
    }

    const salt = uuidv4();
    const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

    registration(username, encryptedPassword, salt).then(result=>{
        if(result === "success"){
            return res.status(201).json({ message: "Account created successfully" });
        }
        else{
            return res.status(400).json({ message: "Error creating account" });
        }
    })
    
    // .catch(err => {
    //     console.error(`Error ${err}`)
    // })

};