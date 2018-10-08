module.exports = {
    "rootDir": ",",
    "projects": [
        "test/unit/configs/node*.js",
        "test/unit/configs/browser*.js"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": [
        "**/test/unit/*.ts",
        "**/test/unit/foundation/*.ts"
    ],
    "moduleFileExtensions": [
        "js",
        "jsx",
        "json",
        "ts",
        "tsx"
    ]
}