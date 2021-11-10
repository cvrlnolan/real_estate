// import axios from "axios"
// import useSWR from "swr" Use these two imports if you choose to load the estates via api fetch.
import React from "react"
import Head from "next/head"
import Navbar from "@/components/layout/navbar"
import { Container, SimpleGrid } from "@chakra-ui/react"
import { client } from "@/lib/mongodb/mongodbClient"
import EstateCard from "@/components/estate/estateCard"

//Loading the estates data via Incremental Static Generation using getStaticProps() at the end of the file.

export default function Home({ estatesData }) {

  // const fetcher = url => axios.get(url).then(res => res.data)

  // const { data: estates, error } = useSWR("/api/estate/", fetcher) //Fetch data while keeping the UI reactive.

  // if (error) {
  //   return (
  //     <>
  //       <div>Error encountered...</div>
  //     </>
  //   )
  // }

  // if (!estates) {
  //   return (
  //     <>
  //       <div>Loading...</div>
  //     </>
  //   )
  // }

  return (
    <>
      <Head>
        <title>RealEstate | Listings</title>
      </Head>
      <Navbar>
        <Container maxW="container.xl" w="full" centerContent>
          <SimpleGrid columns={[1, 2, 2, 3]} spacing="20px">
            {estatesData.map((estate) => (<EstateCard key={estate._id} estate={estate} />))}
          </SimpleGrid>
        </Container>
      </Navbar>
    </>
  )
}

//Using Incremental Static Generation to get the data on build time.

export async function getStaticProps() {
  await client.connect()
  const estates = await client.db(process.env.MONGODB_DATABASE).collection("estateListings").find(
    {}, { sort: { createdDate: -1 } }).toArray()
  await client.close()
  return {
    props: {
      estatesData: JSON.parse(JSON.stringify(estates))
    },
    revalidate: 10,
  }
}