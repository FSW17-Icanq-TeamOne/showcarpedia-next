const {Product} = require("../models")
class ProductController{
    static async getAllProduct(req,res){
        try {
            const data = await Product.findAll({order:[['id',"ASC"]]})
            if(!data.length) res.json("please add new product")
            res.status(200).json(data)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductController