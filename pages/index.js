import Navbar from "@/components/layout/navbar"
import { Container, SimpleGrid } from "@chakra-ui/react"

import EstateCard from "@/components/estate/estateCard"

export default function Home() {
  return (
    <>
      <Navbar>
        <Container maxW="container.xl" w="full" centerContent>
          <SimpleGrid columns={4} minChildWidth="sm" spacing="20px">
            <EstateCard />
            <EstateCard />
            <EstateCard />
            <EstateCard />
          </SimpleGrid>
        </Container>
      </Navbar>
    </>
  )
}
