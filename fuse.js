const {
    EnvPlugin,
    FuseBox,
    CSSModules,
    SassPlugin,
    CSSResourcePlugin,
    CSSPlugin,
    WebIndexPlugin,
    Sparky,
    QuantumPlugin,
} = require('fuse-box')

const updateNotifier = require('update-notifier')
const pkg = require('./package.json')
const { runCLI } = require('jest')


let fuse, app, vendor, config

Sparky.task('config', () => {
    
    const folder = config.folder
    const cssConfig = config.cssConfig

    fuse = FuseBox.init({
        homeDir: 'src',
        output: folder + '/$name.js',
        tsConfig: 'tsconfig.json',
        target: 'browser',
        useJsNext : ['react', 'react-dom'],
        polyfillNonStandardDefaultUsage : ['react', 'react-dom'],
        sourceMaps: config.sourceMaps,
        plugins: [
            EnvPlugin({
                NODE_ENV: config.environment
            }),
            [SassPlugin({importer : true}), CSSModules(), CSSResourcePlugin({ dist: folder + '/assets', resolve: f => `/assets/${f}` }), CSSPlugin(cssConfig)],
            WebIndexPlugin({
                template: 'src/index.html',
                target: 'index.html'
            }),
            config.quantum && QuantumPlugin({
                bakeApiIntoBundle : 'app',
                treeshake : true,
                uglify: true
            })
        ]
    })

    app = fuse.bundle('app')
        .instructions('>index.tsx')

})

Sparky.task('check-updates', () => {
    updateNotifier({pkg}).notify()
})

Sparky.task('default', ['developement-env', 'clean-cache', 'clean-dev', 'config', 'check-updates'], () => {
    fuse.dev({
        root: config.folder
    })

    app.watch().hmr()

    Sparky.src('favicon.png', {base: './src'}).dest(config.folder)
    return fuse.run({'chokidar': {usePolling: true}})
})

Sparky.task('clean-cache', () => {
    return Sparky.src('.fusebox').clean('.fusebox')
})

Sparky.task('clean-dev', () => {
    return Sparky.src('dev').clean('dev')
})

Sparky.task('clean-build', () => {
    return Sparky.src('dist').clean('dist')
})

Sparky.task('prod-env', ['clean-build'], () => {
    config = {
        environment: 'production',
        folder: 'dist',
        cssConfig: {
            group: 'app.css',
            outFile: 'dist/css/app.css',
            inject: () => '/css/app.css'
        },
        quantum: true,
        cache: false,
        sourceMaps: false
    }
})

Sparky.task('developement-env', ['clean-build'], () => {
    config = {
        environment: 'development',
        folder: 'dev',
        cssConfig: {},
        quantum: false,
        cache: true,
        sourceMaps: true
    }
})

Sparky.task('favicon', () => {
    return Sparky.src('favicon.png', {base: './src'}).dest('dist')
})

Sparky.task('build-production', ['prod-env', 'config', 'favicon'], () => {
    return fuse.run()
})