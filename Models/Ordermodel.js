const mongoose = require("mongoose")

let orderSchema = new mongoose.Schema(
    {

	"user" : String,
	 "books" : [String],
	 "totalAmount": Number
    }
)

const orderModel = mongoose.model("order",orderSchema)

module.exports = {orderModel}