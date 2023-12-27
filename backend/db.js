const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = "mongodb+srv://anyonemern:mern123@cluster0.p1xjudb.mongodb.net/foody2?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
        });
        console.log("MongoDB connected");

        const collection = mongoose.connection.db.collection("food_items");
        const data = await collection.find({}).toArray();
        console.log("Data:", data);

        const foodcategoryCollection = mongoose.connection.db.collection("foodcatgory");
        const catData = await foodcategoryCollection.find({}).toArray();
        console.log("Foodcatgory Data:", catData);

        global.food_items = data;
        global.foodcatgory = catData;

        // Keep the connection open for further operations
        // mongoose.connection.close();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;
