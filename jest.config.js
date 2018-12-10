module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": [
        "**/test/unit/*.ts",
        "**/test/unit/foundation/*.ts",
        "**/src/sdk/alexPortalPoc/tests/testAdapter.ts"
    ],
    "moduleFileExtensions": [
        "js",
        "jsx",
        "json",
        "ts",
        "tsx"
    ]
}