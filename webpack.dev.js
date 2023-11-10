const pkg = require("./package.json");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {merge} = require("webpack-merge");

module.exports = (env) => {
    return merge(common, {
        mode: "development",
        devtool: "cheap-module-source-map",
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: `src/${env.manifest}`,
                        to: "manifest.json",
                        transform: (content) => {
                            return Buffer.from(
                                JSON.stringify({
                                    description: pkg.description,
                                    version: pkg.version,
                                    ...JSON.parse(content.toString())
                                })
                            );
                        }
                    },
                    {
                        from: "src/assets",
                        to: "assets/"
                    }
                ]
            }),
            new HtmlWebpackPlugin({
                template: "./src/views/index.html",
                filename: "views/index.html",
                inject: false
            })
        ]
    });
};
