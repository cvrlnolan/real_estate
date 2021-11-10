import { client } from "@/lib/mongodb/mongodbClient"
const { ObjectId } = require("mongodb")

export default async function handler(req, res) {

    const data = req.body

    try {
        await client.connect()
        await client.db(process.env.MONGODB_DATABASE).collection("estateListings").updateOne
            (
                { _id: ObjectId(data.estateId.trim()) },
                { $inc: { totalRating: data.rating, reviews: 1 } }
            )
        res.status(200).json({ message: "Ok." })
    } catch (e) {
        console.log(e)
        res.status(400).end()
    } finally {
        await client.close()
        res.status(200).end()
    }
}