const mongoose=require("mongoose")

const personSchema=new mongoose.Schema({

    name:{ type:String, required:true, trim:true, lowercase:true},
    age:Number,
    favoriteFoods: [String]

})

module.exports = Person = mongoose.model('person', personSchema)
