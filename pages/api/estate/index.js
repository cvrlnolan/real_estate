import { client } from "@/mongodb/mongodbClient"

export default async function handler(req, res) {
    try {
        await client.connect()
        const estates = client.db("real_estate").collection("estateListings").find({}, { sort: { createdDate: 1 } })
        const estatesData = await estates.toArray()
        // console.log(JSON.parse(JSON.stringify(estatesData)))
        res.status(200).json(JSON.parse(JSON.stringify(estatesData)))
    } catch (e) {
        console.log(e)
        res.status(400).end()
    } finally {
        await client.close()
        res.status(200).end()
    }
}