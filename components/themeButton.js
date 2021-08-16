import { IconButton } from "@chakra-ui/button"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

export default function ThemeButton() {
    const { colorMode, toggleColorMode } = useColorMode();
    const iconColor = useColorModeValue("black", "white");
    const bgColor = useColorModeValue("blackAlpha", "whiteAlpha");
    return (
        <IconButton variant="ghost" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon color={iconColor} />} fontSize='sm' colorScheme={bgColor} borderRadius="50%" onClick={toggleColorMode} aria-label="theme_button" />
    )
}