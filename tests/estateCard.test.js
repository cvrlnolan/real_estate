/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EstateCard from "@/components/estate/estateCard"
import { estates } from "@/assets/sampleTestData"

describe("Estate Card Component", () => {
    it("should render correctly", () => {
        render(
            estates.map((estate) => {
                <EstateCard key={estate._id} estate={estate} />
            })
        )
        screen.debug()
    })
})