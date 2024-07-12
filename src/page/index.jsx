const babel = require("@babel/core")
const io = require('./io')
const CleanCSS = require('clean-css')({})
const uglify = require('uglify-js')

function compileJs(path) {
    babel.transformFileAsync(path, {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react",
        ],
        targets: {
            chrome: "80",
            android: "80",
        }
    }).then(function (result) {
        let code = result.code
        io.open(path, 'w').writeAll(uglify.minify(code, {
            compress: true,
            mangle: {
                eval: true,
                toplevel: true,
                reserved: [
                    '$',
                    'require',
                    'exports',
                    'module',
                ],
            }
        }).code).close()
    })
}

function compileCss(path) {
    CleanCSS.minify(path, function (err, out) {
        if (err) return console.err(err)
        io.open(path, 'w').writeAll(out.styles).close()
    })
}

module.exports = function(path) {
    io.listFiles(path, null, true).forEach(function(v) {
        if (v.endsWith('.js') || v.endsWith('.jsx')) {
            compileJs(v)
        } else if (v.endsWith('.css'))
            compileCss(v)
    })
}

let a = (
    <sb>
        你干嘛
    </sb>
)
