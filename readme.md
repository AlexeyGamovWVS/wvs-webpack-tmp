# WVS Multipage Webpack Tmp v.1.1.0

Fast programming Webpack starter.
WVS Webpack Tmp - startup environment for developing websites and multipage websites with splited scripts and styles accordingly to each page. This environment optimized for building and have different configs for developing and production mods. It includes webpack 5, Preprocessor — Scss, cssnano, Browsersync, PostCSS, Autoprefixer, Babel, imagemin and many others. It uses best practices of images compression, JavaScript, CSS optimizing, working with html and includes some feachers, wich simplify developing.

Made by Alexey Gamov, [WebValley Studio](https://web-valley.ru/)

[See example](https://alexeygamovwvs.github.io/wvs-webpack-tmp/)

## How to use WVS Webpack Tmp

Clone into the current folder and remove all unnecessary files. Use

```
git clone git@github.com:AlexeyGamovWVS/wvs-webpack-tmp.git
```

1. Clone or [Download](https://github.com/AlexeyGamovWVS/wvs-webpack-tmp/archive/refs/heads/main.zip) WVS Webpack Tmp from GitHub
2. Install Node Modules: npm i
3. Run: <strong>npm run dev</strong>

## Main info about Webpack configs options

- <strong>preprocessor:</strong> Only SCSS preprocessor. Works with the Scss syntax in "app/front/scss" import folder
- <strong>imagemin:</strong> Works with png, jpeg, jpg, gif, svg files without loss of quality
- <strong>entries:</strong> All entries should be placed in "front/js/pages" with name: <strong>[page-name].js</strong>, and the urls to this files should be placed in <strong>entries.config.js</strong> (watch this files for getting example)
- <strong>import SCSS:</strong> You should import SCSS-files to main pages .js files. Use <strong>import: '../some-url'</strong>
- <strong>outputs:</strong> All processed files will be placed in <strong>dist/</strong> directory accordingly to simple folders structure.
- <strong>assets:</strong> All assets, scripts and CSS will be automaticly added to neccessary files. You needn't use <strong><=require src=...></strong> at all =)
- <strong>Non processed files:</strong> Files like robots.txt should be placed in app/static. Webpack will copy that files to dist/

### Configs

We have 3 webpack configs wich use different features and level of code optimization:

- <strong>webpack.common.js:</strong> In this file you can find common webpack options, wich are used in both (dev and prod) modes.
* <strong>webpack.dev.js:</strong> This is simple configuration for dev mode, wich used webpack-dev-server with hot replacement and without compressing and difficult processing. Merged with webpack.common.js
* <strong>webpack.prod.js:</strong> This is hard configuration for production with JS, CSS, HTML and assets optimization.

### Main tasks:
* <strong>npm run dev:</strong> Use for starting developing mode. Default browser with project will open automaticly. If you have a local internet, you'll be able to open the site on mobile. For that, look at the adress in terminal.
* <strong>npm run build:</strong> Use for getting complete optimized project.
* <strong>npm run deploy:</strong> Project deployment on GitHub pages. 

### src's & dist's:
* All src files located in app/
* Main SCSS src files located in app/front/scss/pages/(page-name).scss
* Main SCRIPT src files located in app/front/js/pages/(page-name).js
* All compressed styles located in dist/styles/(page-name).css
* All compressed scripts located in dist/scripts/(page-name).js
* All src images placed in app/images/ folder
* All compressed images placed in dist/resources/ folder
* Components folder is opened for place there often used html part and sections

## Issues
No Issues at that time.
