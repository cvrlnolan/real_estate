import { client } from "@/lib/mongodb/mongodbClient"

export default async function handler(req, res) {

    const estateData = req.body

    try {
        await client.connect()
        await client.db(process.env.MONGODB_DATABASE).collection("estateListings").insertOne({...estateData, createdDate: new Date()})
        res.status(200).json({ message: "Ok." })
    } catch (e) {
        console.log(e)
        res.status(400).end()
    } finally {
        await client.close()
        res.status(200).end()
    }
}