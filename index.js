const express = require("express")
const {connection} = require("./db")
const { userRouter } = require("./Routes/Auth.route")
const { bookRouter } = require("./Routes/book.route")
const { orderRouter } = require("./Routes/order.route")
require("dotenv").config()

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.mongoURL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }


const app = express()

app.use(express.json())
app.use("user",userRouter)
app.use("books",bookRouter)
app.use("order",orderRouter)




connectDB().then(() => {
    app.listen(process.env.port, () => {
        console.log("listening for requests");
    })
})