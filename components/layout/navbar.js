import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import ThemeButton from "@/components/themeButton"

const Links = ["Listings"];

const NavLink = ({ children, linkHoverColor }) => (
    <Link
        px={2}
        py={1}
        rounded='md'
        _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
        }}
        href='#'>
        {children}
    </Link>
);

export default function Navbar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');

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
                                <NavLink key={link} linkHoverColor={linkHoverColor}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems='center'>
                        <ThemeButton />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as='nav' spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>
                {children}
            </Box>
        </>
    );
}
