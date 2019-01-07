module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": [
        "**/generator/v2/tests/**/*.ts",
        "**/src/sdk/__tests__/*.ts"
    ],
    "moduleFileExtensions": [
        "js",
        "jsx",
        "json",
        "ts",
        "tsx"
    ]
}