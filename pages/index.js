import axios from "axios"
import useSWR from "swr"
import Navbar from "@/components/layout/navbar"
import { Container, SimpleGrid } from "@chakra-ui/react"

import EstateCard from "@/components/estate/estateCard"

export default function Home() {

  const fetcher = url => axios.get(url).then(res => res.data)

  const { data: estates, error } = useSWR("/api/estate/", fetcher) //Fetch data while keeping the UI reactive.

  if (error) {
    return (
      <>
        <div>Error encountered...</div>
      </>
    )
  }

  if (!estates) {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }

  return (
    <>
      <Navbar>
        <Container maxW="container.xl" centerContent>
          <SimpleGrid minChildWidth="sm" spacing="20px">
            {estates.map((estate) => (<EstateCard key={estate._id} estate={estate} />))}
          </SimpleGrid>
        </Container>
      </Navbar>
    </>
  )
}
