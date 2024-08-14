const mongoose = require("mongoose")
const { clientModel, workerModel, productsModel, treatmentModel, orderModel, calenderModel, clientsTableName, workerTableName, treatmentsTableName, productsTableName, ordersTableName, calenderTableName } = require("./schema")
const { query } = require("express")
const json = require("body-parser/lib/types/json")
const connectionString = 'mongodb+srv://alon4551:aKGUT0Y48O5R5MWA@crm.kcvsf1k.mongodb.net/'
const main = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('connected to DB')
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { main }