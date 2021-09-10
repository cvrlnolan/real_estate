/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Navbar from "@/components/layout/navbar"

describe("Navbar Component", () => {
    it("should render correctly", () => {
        render(
            <Navbar>
                Child components
            </Navbar>
        )
        const links = screen.getAllByRole("link")
        const buttons = screen.getAllByRole("button")
        const addEstate = screen.getByText(/Add Estate/)
        const themeButton = screen.getByTestId("theme_button")
        // screen.debug()
        links.map((link) => {
            expect(link).toBeInTheDocument()
        })
        buttons.map((button) => {
            expect(button).toBeInTheDocument()
        })
        expect(addEstate).toBeInTheDocument()
        // Change theme by clicking button
        userEvent.click(themeButton)
        // screen.debug()
    })
})