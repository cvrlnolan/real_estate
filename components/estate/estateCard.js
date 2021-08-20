import { Box, Flex, Heading, Text, Badge, Stack } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { StarIcon } from "@chakra-ui/icons"
import Image from "next/image"

const EstateCard = ({ estate }) => {

    return (
        <>
            <Box
                maxW="445px"
                w="full"
                bg={useColorModeValue("white", "gray.900")}
                boxShadow="2xl"
                rounded="md"
                p={6}
                overflow="hidden">
                <Box
                    h="210px"
                    bg="gray.100"
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos="relative">
                    <Image
                        alt="card_image"
                        src={estate.imgUrl}
                        objectFit="cover"
                        layout="fill"
                    />
                </Box>
                <Stack>
                    <Flex justifyContent="space-between">
                        <Text
                            color="green.500"
                            textTransform="uppercase"
                            fontWeight={800}
                            fontSize="sm"
                            letterSpacing={1.1}>
                            {estate.category}
                        </Text>
                        <Text color="gray.500" fontSize="sm">
                            {estate.bedrooms} Bedrooms &bull; {estate.baths} Baths &bull; {estate.surface_area} sqft
                        </Text>
                    </Flex>
                    <Heading
                        color={useColorModeValue("gray.700", "white")}
                        fontSize="2xl"
                        fontFamily="body">
                        {estate.title}
                    </Heading>
                    <Text color="gray.500" fontWeight="bold">
                        ${estate.price}
                    </Text>
                    <Flex>
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <StarIcon
                                    key={i}
                                    color={i < 3 ? "yellow.500" : "gray.300"}
                                />
                            ))
                        }
                    </Flex>
                    <Text color="gray.500">{estate.address}, {estate.postal_code} {estate.province}</Text>
                    <Text color="gray.500" textAlign="right" fontSize="sm">10 days ago</Text>
                </Stack>
            </Box>
        </>
    )
}

export default EstateCard