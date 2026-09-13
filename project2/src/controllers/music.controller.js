const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.service')
const albumModel = require('../models/album.model')

async function createMusic(req,res){

    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    let decoded
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    
        if(decoded.role != "artist"){
            return res.status(403).json({
                message:"you don't have access to create a music"
            })
        }
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const {title} = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist:decoded.id
    })

    res.status(201).json({
        message: 'Music created successfully',
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist,
        }
    })
    
}

async function createAlbum(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role != "artist"){
            return res.status(403).json({
                message:"you don't have access to create an album"
            })
        }

        const { title, musics } = req.body

        const album = await albumModel.create({
            title,
            artist:decoded.id,
            music:musics
        })
        res.status(201).json({
            message:"album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                music:album.musics
            }
        })

    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            message:"unauthorized"
        })
    }
}

module.exports = { createMusic, createAlbum }