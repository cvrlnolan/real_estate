import { Box, Flex, Heading, Text, Badge, Stack, Avatar } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { StarIcon } from "@chakra-ui/icons"
import Image from 'next/image'
import houseImage from '../../public/house.jpg'

const EstateCard = () => {

    return (
        <>
            <Box
                maxW='445px'
                w='full'
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow='2xl'
                rounded='md'
                p={6}
                overflow='hidden'>
                <Box
                    h='210px'
                    bg='gray.100'
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos='relative'>
                    <Image
                        alt="card_image"
                        src={houseImage}
                        objectFit='cover'
                        layout='fill'
                        placeholder='blur'
                    />
                </Box>
                <Stack>
                    <Flex justifyContent="space-between">
                        <Text
                            color='green.500'
                            textTransform='uppercase'
                            fontWeight={800}
                            fontSize='sm'
                            letterSpacing={1.1}>
                            House
                        </Text>
                        <Text color='gray.500' fontSize='sm'>3 Bedrooms &bull; 3 Baths &bull; 2,123 sqft</Text>
                    </Flex>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize='2xl'
                        fontFamily='body'>
                        Modern home in city center in the heart of historic Los Angeles
                    </Heading>
                    <Text color='gray.500' fontWeight='bold'>
                        $120,000
                    </Text>
                    <Flex>
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <StarIcon
                                    key={i}
                                    color={i < 3 ? "yellow.500" : "gray.300"}
                                />
                            ))}
                    </Flex>
                    <Text color='gray.500'>168 Winged Foot Dr, Aledo, TX 76008</Text>
                    <Text color='gray.500' textAlign='right' fontSize='sm'>10 days ago</Text>
                </Stack>
            </Box>
        </>
    )
}

export default EstateCard