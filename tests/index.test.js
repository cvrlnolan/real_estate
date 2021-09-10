/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import renderer from "react-test-renderer"
import Home from "../pages/index"
import { estates } from "@/assets/sampleTestData"

describe("Index Page", () => {
    it("should render correctly", async () => {
        render(<Home estatesData={estates} />)
        screen.debug()
    })

    it("should match snapshot", () => {
        const tree = renderer.create(<Home estatesData={estates} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

