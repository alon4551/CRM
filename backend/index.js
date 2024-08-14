const mongodb = require("./mongoDb")
const { clientsTableName, workerTableName, treatmentsTableName, productsTableName, ordersTableName, calenderTableName, itemSchema, treatmentSchema, productSchema } = require("./mongoDb/schema")
const { clientModel, workerModel, treatmentModel, productsModel, orderModel, calenderModel, peopleSchema, calenderSchema, orderSchema } = require("./mongoDb/schema")
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    res.sendFile()
})

const extractDataFromRequest = (req, type) => {
    switch (type) {
        case clientsTableName:
        case workerModel: {
            const { name, email, phone, id, birthday, _id } = req.body
            return {
                id: id,
                name: name,
                email: email,
                phone: phone,
                birthday: birthday
            }
        }
        case productsTableName:
        case treatmentsTableName:
            {
                const { name, price, description, span, _id } = req.body
                return {
                    _id: _id,
                    name: name,
                    price: price,
                    description: description,
                    span: span
                }
            }
        case calenderTableName: {
            const { start, end, treatment: treatment, client, worker, orderId, _id } = req.body
            return {
                startDate: start,
                endDate: end,
                orderId: orderId,
                client: client,
                worker: worker,
                treatment: treatment
            }
        }
        case ordersTableName: {
            const { client, total, shopingCart, _id } = req.body
            return {
                client: client,
                total: total,
                cart: shopingCart
            }
        }
    }

}
app.get('/getSchameFields', (req, res) => {
    const { type } = req.query; // Use req.query to get query parameters
    console.log(type)
    switch (type) {
        case "clients":
        case "workers":
            res.status(200).json(Object.keys(peopleSchema.paths))
            break
        case "treatments":
            res.status(200).json(Object.keys(treatmentSchema.paths))
            break
        case "products":
            res.status(200).json(Object.keys(productSchema.paths))
            break
        case "calender":
            res.status(200).json(Object.keys(calenderSchema.paths))
            break
        case "orders":
            res.status(200).json(Object.keys(orderSchema.paths))
            break
        default:
            res.status(400)
    }
})

app.post('/addClient', async (req, res) => {
    await clientModel.insertMany([extractDataFromRequest(req, clientsTableName)])
    return res.status(200).json('record inserted')
})
app.post('/addWorker', async (req, res) => {
    await workerModel.insertMany(extractDataFromRequest(req, workerTableName))
    res.status(200).json('record inserted')
})
app.post('/addTreatment', async (req, res) => {
    await treatmentModel.insertMany(extractDataFromRequest(req, treatmentsTableName))
    res.status(200).json('record inserted')
})
app.post('/addOrder', async (req, res) => {
    await clientModel.insertMany(extractDataFromRequest(req, ordersTableName))
    res.status(200).json('record inserted')
})
app.post('/addProduct', async (req, res) => {
    await productsModel.insertMany(extractDataFromRequest(req, productsTableName))
    res.status(200).json('record inserted')
})
app.post('/addAppointment', async (req, res) => {
    await calenderModel.insertMany(extractDataFromRequest(req, calenderTableName))
    res.status(200).json('record inserted')
})
app.post('/addOrder', async (req, res) => {
    await orderModel.insertMany(extractDataFromRequest(req, ordersTableName))
    res.status(200).json('record inserted')
})
app.post('/updateClient', async (req, res) => {
    const { _id } = req.body
    console.log(_id)
    const result = await clientModel.findOneAndUpdate({ _id: _id }, extractDataFromRequest(req, clientsTableName))

    console.log(result, extractDataFromRequest(req, clientsTableName))
    res.status(200).json('record updated')
})
app.post('/updateWorker', async (req, res) => {
    const { _id } = req.body
    await workerModel.findOneAndUpdate({ id: _id }, extractDataFromRequest(req, clientsTableName))
    res.status(200).json('record updated')
})
app.post('/updateProduct', async (req, res) => {
    const { _id } = req.body
    const result = await productsModel.findOneAndUpdate({ _id: _id }.extractDataFromRequest(req, productsTableName))
    console.log(result)
    res.json(200).json('record updated')
})
app.post('/updateTreatment', async (req, res) => {
    const { _id } = req.body
    await treatmentModel.findOneAndUpdate({ id: _id }, extractDataFromRequest(req, treatmentsTableName))
    res.status(200).json('record updated')
})
app.post('/updateAppointment', async (req, res) => {
    const { _id } = req.body
    await calenderModel.findOneAndUpdate({ _id: _id }, extractDataFromRequest(req, calenderTableName))
    res.status(200).json('record updated')
})
app.post('/updateOrder', async (req, res) => {
    const { _id } = req.body
    await orderModel.findOneAndUpdate({ _id: _id }, extractDataFromRequest(req, ordersTableName))
    res.status(200).json('record updated')
})
app.post('/deleteClient', async (req, res) => {
    const { _id } = req.body
    const result = await clientModel.deleteOne({ "_id": _id })
    console.log(result)
    if (result.deletedCount > 0)
        res.status(200).json('record deleted')
    else
        res.status(400).json('error')

})
app.get('/getClient', async (req, res) => {
    const { id } = req.body
    res.json(await clientModel.findOne({ id: id }))
})
app.get('/getWorker', async (req, res) => {
    const { id } = req.body
    res.json(await workerModel.findOne({ id: id }))
})
app.get('/getOrder', async (req, res) => {
    const { id } = req.body
    res.json(await orderModel.findOne({ _id: id }))
})
app.get('/getAppointment', async (req, res) => {
    const { id } = req.body
    res.json(await calenderModel.findOne({ _id: id }))
})
app.get('/getTreatment', async (req, res) => {
    const { id } = req.body
    res.json(await treatmentModel.findOne({ _id: id }))
})
app.get('/getProduct', async (req, res) => {
    const { id } = req.body
    res.json(await productsModel.findOne({ _id: id }))
})
app.get('/getOrderAppoitments', async (req, res) => {
    const { orderId } = req.body
    res.json(await calenderModel.findMany({ orderId: orderId }))
})
app.get('/getClients', async (req, res) => {
    res.json(await clientModel.find({}))
})
app.listen(3000, async () => {
    await mongodb.main()

    console.log('server is on port 3000')
})