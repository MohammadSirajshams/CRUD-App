
const Crud = require("../model/Crud")


/// Get all Cards
const getAllCards= async (req,res,next)=>{
    let cards;
    try {
        
       cards =  await Crud.find();

    } catch (error) {
        console.log(error);
    }

    if(!cards){

        return res.status(404).json({
            message:"No Products Found"
        })
    }
    return res.status(200).json({cards})
}

// Get card by id

const getById= async(req,res,next) =>{
    
    const id = req.params.id
    let card

    try {
        card = await Crud.findById(id)
    } catch (error) {
        console.log(error);
    }
    if(!card){

        return res.status(404).json({
            message:"No Product Found"
        })
    }
    return res.status(200).json({card})
}


//// Create Card
const addCard = async(req,res,next)=>{

    const {name,description,category,image,price,available} = req.body
    let card;

    try {
        card = new Crud({
            name,
            category,
            description,
            price,
            image,
            available
        })

        await card.save();

    } catch (error) {
        console.log(error)
    }

    if(!card){
        return res.status(500).json({
            message:"Unable to add"
        })
    }

    return res.status(201).json({ card })
}

//Update Card

const updateCard = async (req,res,next)=>{
    const id = req.params.id
    const {name,description,category,price,image,available} = req.body
    let card

    try {
        card = await Crud.findByIdAndUpdate(id,{
            name,
            description,
            price,
            category,
            image,
            available
        })
        card = await card.save()

    } catch (error) {
        console.log(error)
    }

    if(!card){
        return res.status(404).json({
            message:"Unable to update by this Id"
        })
    }

    return res.status(200).json({ card })
}

// delete card
const deleteCard = async (req,res,next)=>{
    const id = req.params.id
    let card

    try {
        card = await Crud.findByIdAndRemove(id)
    } catch (error) {
        console.log(error);
    }

    if(!card){
        return res.status(404).json({
            message:"Unable to Delete by this Id"
        })
    }

    return res.status(200).json({ message:"Product Successfully Deleted" })
}

exports.getAllCards = getAllCards
exports.addCard = addCard
exports.getById = getById
exports.updateCard = updateCard
exports.deleteCard = deleteCard