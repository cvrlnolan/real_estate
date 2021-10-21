import React from "react"
import {
    Box,
    Flex,
    Heading,
    Text,
    Badge,
    Stack,
    chakra,
    useColorMode
} from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { StarIcon } from "@chakra-ui/icons"
import Image from "next/image"
import Link from "next/link"
import moment from "moment"

const EstateCard = ({ estate }) => {

    const { colorMode } = useColorMode()

    const boxShadowColor = {
        light: '0px 8px 25px rgba(0, 0, 0, 0.1)',
        dark: '0px 8px 25px rgba(0, 0, 0, 0.9)'
    }

    const getPostedTime = (date) => {
        let posted
        var today = moment(new Date())
        var created = moment(date)
        posted = today.diff(created, "days")
        return posted
    }

    const toBase64 = (str) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)

    const shimmer = (w, h) => `
        <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
            </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>
    `

    return (
        <>
            <Link href={`estate/${estate._id}`} passHref>
                <chakra.a
                    transition="all"
                    transitionDuration="0.5s"
                    _hover={{
                        boxShadow: boxShadowColor[colorMode],
                        textDecoration: "none",
                        cursor: "pointer"
                    }}
                >
                    <Box
                        maxW="445px"
                        h="450px"
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
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(450, 450))}`}
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
                                <Text color="gray.500" fontSize="sm" noOfLines="1" ml={2}>
                                    {estate.bedrooms} Bedrooms &bull; {estate.baths} Baths &bull; {estate.surface_area} sqft
                                </Text>
                            </Flex>
                            <Heading
                                color={useColorModeValue("gray.700", "white")}
                                fontSize="2xl"
                                noOfLines={1}
                                fontFamily="body">
                                {estate.title}
                            </Heading>
                            <Text color="gray.500" fontWeight="bold">
                                ${estate.price}{estate.status === "rent" && "/mo."}
                            </Text>
                            <Flex>
                                {Array(5)
                                    .fill("")
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={i < (estate.totalRating / estate.reviews) ? "yellow.500" : "gray.300"}
                                        />
                                    ))
                                }
                            </Flex>
                            <Text noOfLines={1} color="gray.500">{estate.address}, {estate.postal_code} {estate.province}</Text>
                            <Text color="gray.500" textAlign="right" fontSize="sm">{getPostedTime(estate.createdDate)} day(s) ago</Text>
                        </Stack>
                    </Box>
                </chakra.a>
            </Link>
        </>
    )
}

export default EstateCard