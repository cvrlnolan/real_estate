import React from "react"
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Text,
    Button,
    useDisclosure,
    useColorModeValue,
    chakra,
    Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons"
import Link from "next/link"
import ThemeButton from "@/components/themeButton"

const Links = [
    { key: "Listings", text: "Listings", href: "/" },
    { key: "Reposirtory", text: "Repository", href: "https://github.com/cvrlnolan/real_estate" }
];

const NavLink = ({ children, linkHoverColor, linkRef }) => (
    <Link href={linkRef} passHref>
        <chakra.a
            px={2}
            py={1}
            rounded="md"
            _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
                cursor: "pointer"
            }}
        >
            {children}
        </chakra.a>
    </Link>
);

export default function Navbar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const linkColor = useColorModeValue("blue.600", "blue.100");
    const linkHoverColor = useColorModeValue("teal.700", "teal.400");

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems='center' justifyContent='space-between'>
                    <IconButton
                        size='md'
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label='Open Menu'
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>RealEstate</Box>
                        <HStack
                            as='nav'
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.key} linkRef={link.href} linkHoverColor={linkHoverColor}>{link.text}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems='center'>
                        <Link href="/estate/add" passHref>
                            <Button mr={2} leftIcon={<AddIcon />} variant="outline" size="sm">
                                Add Estate
                            </Button>
                        </Link>
                        <ThemeButton />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as='nav' spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.key} linkRef={link.href} linkHoverColor={linkHoverColor}>{link.text}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4} justifyContent="space-between">
                {children}
                <Flex w="full" h="20px" p={8}>
                    <Text w="full" textAlign="center" fontWeight="bold">
                        Developed by
                        <Link href="https://carlnolan.lootyclub.com" passHref>
                            <Text
                                display="inline-flex"
                                ml={1} color={linkColor}
                                cursor="pointer"
                                _hover={{
                                    color: useColorModeValue("blue.200", "blue.400"),
                                }}
                                transition="all"
                                transitionDuration="0.5s"
                            >
                                Carl Nolan
                            </Text>
                        </Link>
                    </Text>
                </Flex>
            </Box>
        </>
    );
}
