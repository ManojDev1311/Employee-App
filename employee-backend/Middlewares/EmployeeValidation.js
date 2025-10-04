const Joi = require('joi');

const addEmpValidation = (req,res,next) => {
 const schema = Joi.object({
    name: Joi.string().min(4).max(100).required(),
    department: Joi.string().min(4).max(100).required(),
    position: Joi.string().min(4).max(100).required()
 });
 const {error} = schema.validate(req.body);
 if(error){
    return res.status(400).json({message:"bad request",error});
 }
 next();
}

module.exports = {
    addEmpValidation
}