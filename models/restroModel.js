const mongoose = require('mongoose')

//schema
const restroSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    imageUrl:{
        type:String
    },
    foods:{
        type:Array
    },
    time:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    logoUrl:{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:1
    },
    ratingCount:{type:Number},
    code:{type:String},
    coords:{
        id:{type:String},
        latitude:{type:Number},
        latitudeDelta:{type:Number},
        longitude:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}
    }

},{timestamps: true});

module.exports = mongoose.model('Resturant', restroSchema)