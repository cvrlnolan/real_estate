import React from "react"
import Head from "next/head"
import {
    Container,
    Heading,
    Stack,
    Text,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Radio,
    RadioGroup,
    Checkbox,
    Button,
    Textarea,
    Image,
    useToast
} from "@chakra-ui/react"
import {
    ArrowForwardIcon,
    ArrowBackIcon,
    EmailIcon,
    PhoneIcon,
    AttachmentIcon,
    CheckCircleIcon,
} from "@chakra-ui/icons"
import { useState, createRef } from "react"
import { useForm } from "react-hook-form"
import Compressor from "compressorjs"
import Navbar from "@/components/layout/navbar"
import AlertPop from "@/components/formAlert"
import { countryOptions } from "@/assets/countries"
import { categoryOptions } from "@/assets/categories"
import UploadImage from "@/lib/firebase/estate/uploadImage"


export default function AddEstate() {

    const imageInputRef = createRef()

    const toast = useToast()

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' })

    const [page, setPage] = useState(0)

    const [image, setImage] = useState()

    const [preview, setPreviewImg] = useState()

    const numericPattern = /^-?\d*\.?\d*$/

    const emailPattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i

    const phonePattern = /^\+(?:[0-9] ?){8,14}[0-9]$/

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            new Compressor(image, {
                quality: 0.8,
                success: (compressedImage) => {
                    setImage(compressedImage)
                    setPreviewImg(URL.createObjectURL(compressedImage))
                }
            })
        }
    }

    function goNextPage() {
        if (page === 6) return;
        setPage((page) => page + 1);
    }

    function goBack() {
        if (page === 0) return;
        setPage((page) => page - 1);
    }

    const onSubmit = async (data) => {
        if (!image) {
            toast({
                title: "No image selected.",
                description: "Please choose a display image for the estate.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return
        }
        const estateData = {
            ...data,
            totalRating: 0,
            reviews: 0,
        }
        await UploadImage(image, estateData, toast)
        // console.log(estateData)
    }

    return (
        <>
            <Head>
                <title>RealEstate | Add Estate</title>
            </Head>
            <Navbar>
                <Container maxW='container.xl' w="full" centerContent>
                    <Box maxW="xl" p={10} w="full" rounded="lg" boxShadow="lg">
                        {/* Multi-step form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={10} width="100%">

                                {/* Initial Page(Step) */}
                                {page === 0 && <>
                                    <Heading>Basic Information</Heading>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input
                                            variant="flushed"
                                            placeholder="ex: Modern Apartment Downtown..."
                                            name="title"
                                            {...register("title", { required: 'Please enter a title', minLength: { value: 8, message: 'Title is too short' } })}
                                        />
                                        {errors.title && <AlertPop title={errors.title.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Price</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                fontSize="1.2em"
                                            >$</InputLeftElement>
                                            <Input
                                                variant="flushed"
                                                name="price"
                                                type="number"
                                                {...register("price", { required: 'Please enter a price', min: { value: 3, message: 'Price too short or invalid' }, pattern: { value: numericPattern, message: 'Invalid price format' }, valueAsNumber: true })}
                                            />
                                        </InputGroup>
                                        {errors.price && <AlertPop title={errors.price.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Status</FormLabel>
                                        <RadioGroup name="status">
                                            <Stack direction="row">
                                                <Radio
                                                    value="sale"
                                                    name="status"
                                                    {...register("status", { required: 'Please check a status for the estate' })}
                                                >
                                                    Sale
                                                </Radio>
                                                <Radio
                                                    value="rent"
                                                    name="status"
                                                    {...register("status", { required: 'Please check a status for the estate' })}
                                                >
                                                    Rent
                                                </Radio>
                                            </Stack>
                                        </RadioGroup>
                                        {errors.status && <AlertPop title={errors.status.message} />}
                                    </FormControl>
                                </>}

                                {/* Page 1 */}
                                {page === 1 && <>
                                    <Heading>Address Information</Heading>
                                    <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <Input
                                            variant="flushed"
                                            name="address"
                                            {...register("address", { required: 'Please enter an address', minLength: { value: 8, message: 'Address name too short' } })}
                                        />
                                        {errors.address && <AlertPop title={errors.address.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>State/Province</FormLabel>
                                        <Input
                                            variant="flushed"
                                            name="state/province"
                                            {...register("province", { required: 'Please enter a state or province', minLength: { value: 3, message: 'State/Province name too short' } })}
                                        />
                                        {errors.province && <AlertPop title={errors.province.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Postal Code</FormLabel>
                                        <Input
                                            variant="flushed"
                                            name="postal_code"
                                            {...register("postal_code", { required: 'Enter a valid postal code', minLength: { value: 4, message: 'Enter a valid postal code' } })}
                                        />
                                        {errors.postal_code && <AlertPop title={errors.postal_code.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Country</FormLabel>
                                        <Select
                                            variant="filled"
                                            placeholder="Select a country"
                                            name="country"
                                            {...register("country", { required: 'Select a country' })}
                                        >
                                            {countryOptions.map((country) => (
                                                <option key={country.key} value={country.value}>{country.text}</option>
                                            ))}
                                        </Select>
                                        {errors.country && <AlertPop title={errors.country.message} />}
                                    </FormControl>
                                </>}

                                {/* Page 2 */}
                                {page === 2 && <>
                                    <Heading>Property Information</Heading>
                                    <FormControl>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            variant="filled"
                                            placeholder="Select a category"
                                            name="category"
                                            {...register("category", { required: 'Select a category' })}
                                        >
                                            {categoryOptions.map((category) => (
                                                <option key={category.key} value={category.value}>{category.text}</option>
                                            ))}
                                        </Select>
                                        {errors.category && <AlertPop title={errors.category.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Bedrooms</FormLabel>
                                        <NumberInput variant="flushed" name="bedrooms" min={0}>
                                            <NumberInputField
                                                {...register("bedrooms", { required: 'Specify the number of bedrooms', valueAsNumber: true })}
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        {errors.bedrooms && <AlertPop title={errors.bedrooms.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Baths</FormLabel>
                                        <NumberInput variant="flushed" name="baths" min={0}>
                                            <NumberInputField
                                                {...register("baths", { required: 'Specify the number of bathrooms', valueAsNumber: true })}
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        {errors.baths && <AlertPop title={errors.baths.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Surface Area</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                variant="flushed"
                                                name="surface_area"
                                                {...register("surface_area", { required: 'Enter the surface area of the property', min: { value: 2, message: 'Small surface area or invalid' }, pattern: { value: numericPattern, message: 'Invalid surface area data format' }, valueAsNumber: true })}
                                            />
                                            <InputRightElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                fontSize="1.2em"
                                            >
                                                sqft
                                            </InputRightElement>
                                        </InputGroup>
                                        {errors.surface_area && <AlertPop title={errors.surface_area.message} />}
                                    </FormControl>
                                </>}

                                {/* Page 3 */}
                                {page === 3 && <>
                                    <Heading>Description</Heading>
                                    <FormControl>
                                        <FormLabel>Property Briefing</FormLabel>
                                        <Textarea
                                            variant="filled"
                                            size="lg"
                                            maxH="sm"
                                            resize="vertical"
                                            name="property_briefing"
                                            {...register("property_briefing", { required: 'Write a little briefing about the property', minLength: { value: 20, message: 'Briefing too short' } })}
                                        />
                                        {errors.property_briefing && <AlertPop title={errors.property_briefing.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Additional Information</FormLabel>
                                        <Textarea
                                            variant="filled"
                                            size="lg"
                                            maxH="sm"
                                            resize="vertical"
                                            name="additional_info"
                                            {...register("additional_info")}
                                        />
                                    </FormControl>
                                </>}

                                {/* Page 4 */}
                                {page === 4 && <>
                                    <Heading>Appliances</Heading>
                                    <Stack spacing={4} direction={["column", "row"]}>
                                        <Checkbox name="cooling" {...register("cooling")}>Cooling</Checkbox>
                                        <Checkbox name="heating" {...register("heating")}>Heating</Checkbox>
                                        <Checkbox name="internet" {...register("internet")}>Internet</Checkbox>
                                        <Checkbox name="furniture" {...register("furniture")}>Furniture</Checkbox>
                                        <Checkbox name="parking" {...register("parking")}>Parking</Checkbox>
                                    </Stack>
                                </>}

                                {/* Page 5 */}
                                {page === 5 && <>
                                    <Heading>Media</Heading>
                                    {preview &&
                                        <Image
                                            alt="estate_img"
                                            src={preview}
                                            boxSize="sm"
                                            rounded="lg"
                                            objectFit="cover"
                                            alignSelf="center"
                                        />
                                    }
                                    <Text color="gray.500" textAlign="center">Select display image</Text>
                                    <input ref={imageInputRef} type="file" hidden onChange={handleImageChange} />
                                    <Button
                                        leftIcon={<AttachmentIcon />}
                                        variant="ghost"
                                        colorScheme="blue"
                                        onClick={() => imageInputRef.current.click()}>
                                        Browse Images
                                    </Button>
                                </>}

                                {/* Page 6 (last step) */}
                                {page === 6 && <>
                                    <Heading>Contact Information</Heading>
                                    <FormControl>
                                        <FormLabel>Email Address</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                fontSize="1.2em"
                                            >
                                                <EmailIcon />
                                            </InputLeftElement>
                                            <Input
                                                variant="flushed"
                                                name="email"
                                                {...register("email", { required: 'Enter contact email address', pattern: { value: emailPattern, message: 'Invalid email format' } })}
                                            />
                                        </InputGroup>
                                        {errors.email && <AlertPop title={errors.email.message} />}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Telephone</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                fontSize="1.2em"
                                            >
                                                <PhoneIcon />
                                            </InputLeftElement>
                                            <Input
                                                variant="flushed"
                                                name="telephone"
                                                placeholder="ex: +237XXXXX..."
                                                {...register("telephone", { required: 'Enter contact telephone number', pattern: { value: phonePattern, message: 'Invalid phone number format' } })}
                                            />
                                        </InputGroup>
                                        {errors.telephone && <AlertPop title={errors.telephone.message} />}
                                    </FormControl>
                                </>}

                                <Stack direction="row" spacing={2} alignSelf="center">
                                    {page > 0 && <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={goBack}>Back</Button>}
                                    {page < 6 && <Button variant="ghost" rightIcon={<ArrowForwardIcon />} onClick={goNextPage} isDisabled={!isValid}>Next</Button>}
                                </Stack>
                                {page === 6 && <Button type="submit" leftIcon={<CheckCircleIcon />} colorScheme="green" isDisabled={!isValid}>Submit</Button>}
                            </Stack>
                        </form>
                    </Box>
                </Container>
            </Navbar>
        </>
    )
}