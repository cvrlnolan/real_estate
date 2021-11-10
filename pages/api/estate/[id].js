import { client } from "@/lib/mongodb/mongodbClient"
const { ObjectId } = require("mongodb")

export default async function handler(req, res) {

    const { id } = req.query

    try {
        await client.connect()
        const ID = id.trim();
        const estate = await client.db(process.env.MONGODB_DATABASE).collection("estateListings").findOne({ _id: ObjectId(ID) })
        // console.log(estate)
        res.status(200).json(estate)
    } catch (e) {
        //This API call will go through and still cause an error because of the ObjectId class
        //TypeError: Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters
        console.log(e)
        res.status(400).end()
    } finally {
        res.status(200).end()
    }
}