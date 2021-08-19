import {
    Flex,
    Heading,
    Text,
    Box,
    Stack,
    HStack,
    SimpleGrid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Icon,
    chakra
} from "@chakra-ui/react"
import { Rating } from "react-simple-star-rating"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { StarIcon, CheckIcon, SmallCloseIcon } from "@chakra-ui/icons"
import Navbar from "@/components/layout/navbar"
import houseImage from "public/house.jpg"

export default function EstatePage() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    }


    return (
        <>
            <Navbar>
                <Box maxW="container.xl" w="full" p={8} rounded="lg" boxShadow="lg">
                    <Stack alignItems="center" spacing={5}>
                        <Heading>Modern Apartment Downtown Toronto</Heading>
                        <HStack spacing={2}>
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
                            <Text color="gray.500">35 rated</Text>
                        </HStack>
                        <Box
                            alignSelf="center"
                            boxSize={["sm", "md"]}
                            pos="relative"
                        >
                            {/* <Image alt="estate_img" src={"../../public/house.jpg"} alignSelf="center" /> */}
                            <Image
                                src={houseImage}
                                alt="estate_img"
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                            />
                        </Box>
                        <Text color="gray.500">
                            Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                        <SimpleGrid w="full" columns={[1, 2, 3]} spacing={10}>
                            <Stack direction="column" spacing={2}>
                                <Text color="gray.500">1921 Street Cove, Aledo</Text>
                                <Text color="gray.500">9804 Ontario</Text>
                                <Text color="gray.500">Canada</Text>
                            </Stack>
                            <Stack direction="column" spacing={2}>
                                <HStack spacing={2}><Text color="gray.500">Furnitured</Text> <CheckIcon /></HStack>
                                <HStack spacing={2}><Text color="gray.500">Heating</Text> <CheckIcon /></HStack>
                                <HStack spacing={2}><Text color="gray.500">Cooling</Text> <CheckIcon /></HStack>
                                <HStack spacing={2}><Text color="gray.500">Internet</Text> <CheckIcon /></HStack>
                                <HStack spacing={2}><Text color="gray.500">Parking</Text> <CheckIcon /></HStack>
                            </Stack>
                            <Stack direction="column" spacing={2}>
                                <Text color="gray.500" fontWeight="bold">Price: $500/mo.</Text>
                                <Link href="mailto:madara@konoha.com" passHref><chakra.a color="gray.500" _hover={{ cursor: "pointer", color: "teal.500" }}>madara@konoha.com</chakra.a></Link>
                                <Text color="gray.500">+237696740298</Text>
                            </Stack>
                        </SimpleGrid>
                        <Text color="gray.500">
                            Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                        <Button rightIcon={<StarIcon />} onClick={onOpen}>Rate Estate</Button>
                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Rate your visit</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Rating onClick={handleRating} ratingValue={rating} transition={true} />
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="red" variant="ghost" onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Stack>
                </Box>
            </Navbar>
        </>
    )
}