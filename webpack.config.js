const path = require('path')
const Extract = require('extract-text-webpack-plugin') //将css抽离
const cssnano = require('cssnano')//压缩
const autofixer = require('autoprefixer')
module.exports ={
    mode:'development',
    entry: path.resolve(__dirname,'src/app.js'),
    module :{
        rules:[
            {
                test:/\.scss/,
                use:Extract.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                        },
                        {
                            loader:'postcss-loader', //内核
                            options:{
                                plugins:[
                                    autofixer(),
                                    cssnano()
                                ]
                            }
                        },
                        {
                            loader:'sass-loader'
                        }
                    ]
                })
                // [
                //     {
                //         loader:'style-loader',
                //     },
                    // {
                    //     loader:'css-loader',
                    // },
                    // {
                    //     loader:'sass-loader'
                    // }
                // ]
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['env']
                        }
                    }
                ]
            }
        ]
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    plugins:[
        new Extract({
            filename:'index.css'
        })
    ]
}