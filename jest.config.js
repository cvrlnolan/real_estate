module.exports = {
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    moduleNameMapper: {
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/assets/(.*)$": "<rootDir>/assets/$1",
        "^@/firebase/(.*)$": "<rootDir>/firebase/$1",
        "^@/mongodb/(.*)$": "<rootDir>/mongodb/$1"
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
    transform: {
        // "\\.[jt]sx?$": "babel-jest"
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
    transformIgnorePatterns: [
        "/node_modules/",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    testEnvironment: "jsdom",
    verbose: true,
}