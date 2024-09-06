module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /.css$/,
                use: ["postcss-loader"],
                type: "css"
            }
        ]
    }
}
