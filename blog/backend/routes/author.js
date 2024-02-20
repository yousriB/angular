const express = require('express');

const router = express.Router();

const Author = require('../models/author')

const multer = require('multer');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

filename =''

const mystorage = multer.diskStorage({
destination:  './uploads',
filename: (req , file ,redirect)=>{
let date = Date. now();
let fl = date + '.' + file.mimetype.split('/')[1];
//786876876786. png
redirect (null,fl);
filename = fl;
}
})
const upload = multer({storage: mystorage})


router.post('/register',upload.any('image'),(req,res)=>{
    data = req.body;
      author = new Author({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        about: data.about, // Include 'about' here
        image: filename
    });
    author.image = filename;

    salt = bcrypt.genSaltSync(10); //generation un code de 10 caractere
    author.password = bcrypt.hashSync(data.password,salt) //crypte the password by using the salt

    author.save()
    .then(
        (savedAuthor)=>{
            filename = "";
            res.status(200).send(savedAuthor);
        }
    )
    .catch(
        err =>{
            res.send(err)
        }
    )
})


router.post('/login',(req,res)=>{
    let data = req.body;
    Author.findOne({ email : data.email })
    .then(
        (author)=>{
            let valid = bcrypt.compareSync(data.password, author.password)//comparison entre le password de author find by email and the password from data(frontend)
            if(!valid){
                res.send('email or password invalid')
            }else{
                let payload = {
                    _id : author._id,
                    email: author.email,
                    fullname: author.name +' ' +author.lastname
                }
                let token = jwt.sign(payload,'123456789')
                res.send({mytoken : token})
            }
            
        }
    )
    .catch(
        err=>{
            res.status(400).send(err)
        }
    )
})

router.get('/all',(req,res)=>{
    Author.find({})
    .then(
        (authors)=>{
            res.status(200).send(authors)
        }
    )
    .catch(
        err =>{
            res.send(err)
        }
    )
})


router.get('/getbyid/:id',(req,res)=>{
    id = req.params.id
    Author.findOne({_id : id })
    .then(
        (author)=>{
            res.status(200).send(author)
        }
    )
    .catch(
        err =>{
            res.send(err)
        }
    )
})


router.delete('/supprimer/:id',(req,res)=>{
    id = req.params.id
    Author.findByIdAndDelete({ _id : id})
    .then(
        (author)=>{
            res.status(200).send(author)
        }
    )
    .catch(
        err =>{
            res.send(err)
        }
    )
})
router.put('/update/:id',(req,res)=>{
    id = req.params.id
    data = req.body
    Author.findByIdAndUpdate({ _id : id}, data)
    .then(
        (author)=>{
            res.status(200).send(author)
        }
    )
    .catch(
        err =>{
            res.send(err)
        }
    )
})

module.exports = router;