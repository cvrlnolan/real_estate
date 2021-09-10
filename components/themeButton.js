import React from "react"
import { IconButton } from "@chakra-ui/button"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

export default function ThemeButton() {
    const { colorMode, toggleColorMode } = useColorMode();
    const iconColor = useColorModeValue("black", "white");
    return (
        <IconButton
            variant="ghost"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            fontSize="sm"
            color={iconColor}
            borderRadius="50%"
            onClick={toggleColorMode}
            aria-label="theme_button"
            data-testid="theme_button"
        />
    )
}