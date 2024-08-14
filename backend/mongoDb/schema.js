const mongoose = require("mongoose")
const peopleSchema = mongoose.Schema({
    name: String,
    id: String,
    email: String,
    phone: String,
    birthday: Date
})
const treatmentSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    span: Number
})
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String
})
const calenderSchema = mongoose.Schema({
    startDate: Date,
    endDate: Date,
    orderId: String,
    client: peopleSchema,
    worker: peopleSchema,
    treatment: treatmentSchema,

})
const orderSchema = mongoose.Schema({
    client: peopleSchema,
    cart: [{}],
    total: Number
})
const clientsTableName = 'clients'
const workerTableName = 'workers'
const productsTableName = 'products'
const treatmentsTableName = 'treatments'
const calenderTableName = 'calender'
const ordersTableName = 'orders'
const clientModel = mongoose.model(clientsTableName, peopleSchema)
const workerModel = mongoose.model(workerTableName, peopleSchema)
const productsModel = mongoose.model(productsTableName, productSchema)
const treatmentModel = mongoose.model(treatmentsTableName, treatmentSchema)
const calenderModel = mongoose.model(calenderTableName, calenderSchema)
const orderModel = mongoose.model(ordersTableName, orderSchema)

module.exports = {
    clientModel,
    workerModel,
    productsModel,
    treatmentModel,
    calenderModel,
    orderModel,
    clientsTableName,
    workerTableName,
    treatmentsTableName,
    calenderTableName,
    productsTableName,
    ordersTableName,
    peopleSchema,
    calenderSchema,
    treatmentSchema,
    productSchema,
    orderSchema
}