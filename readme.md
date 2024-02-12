# WVS Multipage Webpack Tmp v.3.0.0

WVS Webpack Tmp - шаблон сборщика для разработки веб-сайтов и многостраничных сайтов с разделенными скриптами и стилями соответственно каждой странице, с возможностью создания бандла без разделения на постраничные скрипты и стили. Эта среда оптимизирована для создания и имеет разные конфигурации для разработки и продакшена. Она включает в себя webpack 5, препроцессор — Scss, cssnano, Browsersync, PostCSS, Autoprefixer, Babel, imagemin и многие другие плагины. Среда использует лучшие практики сжатия изображений, оптимизации JavaScript, CSS, работы с html и включает в себя некоторые функции, которые упрощают разработку.

Made by Alexey Gamov, [WebValley Studio](https://web-valley.ru/)

[See example](https://alexeygamovwvs.github.io/wvs-webpack-tmp/)

## :hammer_and_wrench: Установка
* установите [NodeJS](https://nodejs.org/en/)
* склонируйте сборку с помощью: ```git clone https://github.com/AlexeyGamovWVS/wvs-webpack-tmp.git``` или скачайте по ссылке [Download](https://github.com/AlexeyGamovWVS/wvs-webpack-tmp/archive/refs/heads/main.zip)
* откройте скаченный стартер в редакторе и установите зависимости ```npm i```
* чтобы начать работу, введите ```npm run dev``` (режим разработки)
* чтобы собрать проект, введите ```npm run build``` (режим сборки)
* чтобы начать работу с объединенным бандлом, введите ```npm run dev:bundle``` (режим разработки бандла)
* чтобы собрать проект с объединённым бандлом, введите ```npm run build:bundle``` (режим сборки бандла)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.
Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

## :open_file_folder: Файловая структура

```
wvs-webpack-tmp
├── app
│   ├── components
│   │   ├── parts
│   │   │   ├── [page_name]
│   │   │   │   └── [part_name].pug
│   │   │   └── head.pug
│   │   │
│   │   └── sections
│   │       ├── [page_name]
│   │       │   └── [section_name].pug
│   │       ├── utils
│   │       │   └── [section_name].pug
│   │       ├── footer.pug
│   │       └── header.pug
│   │   
│   ├── front-js
│   │   ├── components
│   │   │   └── [component_name].js
│   │   ├── pages
│   │   │   └── [page_name].js
│   │   ├── utils
│   │   │   └── [func_name].js
│   │   └── bundle.js
│   │
│   ├── front-scss
│   │   ├── pages
│   │   │   └── [page_name].scss
│   │   ├── parts
│   │   │   ├── [part_name]
│   │   │   │   └── [part_name].scss
│   │   │   └── parts.styles.js
│   │   ├── sections
│   │   │   ├── [page_name]
│   │   │   │   └── [section_name].scss
│   │   │   ├── utils
│   │   │   │   └── [section_name].scss
│   │   │   ├── footer.scss
│   │   │   ├── header.scss
│   │   │   └── sections.styles.js
│   │   ├── utils
│   │   │   ├── [name].scss
│   │   │   └── utils.scss
│   │   └── bundle.styles.js
│   │
│   ├── images
│   ├── models
│   ├── pages
│   ├── static
│   ├── vendor
│   └── videos
│
├── dist
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── babel.config.js
├── package.lock.json
├── package.json
├── postcss.config.js
├── readme.md
├── webpack.data.js
├── webpack.dev.js
├── webpack.prod.js
├── webpack.dev_bundler.js
└── webpack.prod_bundler.js
```

* Корень папки:
    * ```babel.config.js``` — настройки Babel
    * ```package.json``` — список зависимостей
    * ```postcss.config.json``` — настройка Post Css
    * ```webpack.data.js``` — конфиг для Webpack с массивом страниц сайта, используется в многостраничной сборке
    * ```webpack.dev.js``` — конфиг для Webpack с облегчённой многостраничной сборкой без оптимизации (режим разработки)
    * ```webpack.dev_bundler.js``` — конфиг для Webpack с облегчённой сборкой бандла без оптимизации (режим разработки)
    * ```webpack.prod.js``` — конфиг для Webpack с оптимизированной многостраничной сборкой (режим сборки)
    * ```webpack.prod_bundler.js``` — конфиг для Webpack с оптимизированной сборкой бандла (режим сборки)
    * ```.gitignore``` – запрет на отслеживание файлов Git'ом
    * ```.editorconfig``` — настройки рабочей среды VSC (отступы и прочее)
    * ```.eslintignore``` – запрет на отслеживание файлов ESlint'ом
    * ```.eslintrc``` — настройки ESlint

* Папка ```app``` - используется во время разработки:
    * Секции и переиспользуемые компоненты (pug): ```app/components```
    * JS-файлы: ```app/front-js```
    * SCSS-файлы: ```app/front-scss```
    * Изображения: ```app/images```
    * Видео: ```app/images```
    * 3D модели: ```app/models```
    * Страницы сайта: ```app/pages```
    * Конфигурационные файлы сервера (.htaccess, robots.txt и тп): ```app/static```
    * Шрифты и подключаемые глобально библиотеки или стили: ```app/vendor```

* Папка ```dist``` - папка, из которой запускается локальный сервер для разработки (при запуске ```npm run dev```) и куда сохраняется оптимизированная сборка после полной компиляции (при запуске ```npm run build```)
    * Режим разработки / сборки в многостраничном виде ```npm run dev``` / ```npm run build```: 
        * Ресурсы (шрифты, иконки, картинки и тп) по папкам внутри: ```dist/resources```
        * JS-файлы страниц: ```dist/scripts```
        * CSS-файлы страниц: ```dist/styles```
        * Скомпилированный html страниц и файлы сервера: ```dist```
    * Режим разработки / сборки в bundle-формате ```npm run dev:bundle``` / ```npm run build:bundle```: 
        * Ресурсы (шрифты, иконки, картинки и тп) по папкам внутри: ```dist/resources```
        * Весь скрипт сайта: ```dist/main.js```
        * Весь CSS: ```dist/main.scss```
        * Скомпилированный html страниц и файлы сервера: ```dist```

## :keyboard: Команды
* ```npm run dev``` - запуск сервера для разработки проекта
* ```npm run dev:bundle``` - запуск сервера с одним общим скриптом и стилями
* ```npm run build``` - собрать проект с оптимизацией без запуска сервера
* ```npm run build:bundle``` - собрать проект с оптимизацией без запуска сервера c одним общим скриптом и стилями
* ```npm run dbbuild / npm run dbdev``` - сборки с использованием дашборда Webpack
* ```npm run predeploy``` - техническая команда перед деплоем на гитхаб
* ```npm run deploy``` - публикация проекта на Github Pages

## :bulb: Рекомендации по использованию
В сборке используется компонентный и блочный подходы к разработке сайтов, с разбивкой на переиспользуемые компоненты, переиспользуемые блоки сайта, содержащие компоненты и шаблоны страниц, содержащие эти блоки.

### Компоненты (parts)
* Каждый компонент представляет из себя переиспользуемый BEM-блок, имеет свой файл или папку внутри ```app/components/parts/[part_name]/```. Использование вложенности ```[part_name]``` не обязательно, можно эту вложенность пропустить, главное на старте определиться с одним единственным подходом. Внутри конечной дирректории находится pug-файл компонента. SCSS файлы компонента располагаются по аналогичной логике внутри ```app/front-scss/parts/[part_name]/```. Допустимо расположение SCSS вместе с pug, главное, чтобы принцип сохранялся и в остальных parts.
    * Pug представляет из себя миксин и импортируется в файл необходимой секции, расположенной в ```app/components/sections/```
    * SCSS файл импортируется в файл ```app/front-scss/parts/parts.styles.js```, используемый в сборке бандла, и в файл стилей секции, где этот блок используется ```app/front-scss/sections/*/**.scss``` - в постраничной сборке. 
    * *Важно!* Для корректной сборки в режиме бандла необходимо данный импорт исключить, поэтому в SCSS файле конкретной секции, куда произведён импорт стилей компонента, необходимо все импорты parts - стилей разместить между комментариями ```/* START_EXCLUDE_STYLE_BUNDLE */``` и ```/* END_EXCLUDE_STYLE_BUNDLE */```. В ином случае они могут импортироваться дважды в конечную bundle - сборку или привести к ошибке webpack! 
    * Общий файл ```app/front-scss/parts/parts.styles.js``` импортируется в файл стилей для бандла ```app/front-scss/bundle.styles.js``` после констант и библиотек, перед стилями секций

### Блоки / секции (sections)
* Каждая секция представляет из себя переиспользуемый BEM-блок, имеет свой файл или папку внутри ```app/components/sections/[page_name]/[block_name]```. Использование вложенности ```[page_name]``` и ```[block_name]``` не обязательно, можно эту вложенность пропустить, главное на старте определиться с одним единственным подходом. Данные вложенности используется для удобства при разработке крупного многостраничного сайта. Внутри конечной дирректории находится pug-файл блока. SCSS файлы блока располагаются по аналогичной компонентам логике внутри ```app/front-scss/sections/[page_name]/[section_name]/```. SCSS допустимо располагать вместе с pug, главное придерживаться одного принципа. Принцип расположения SCSS вместе с Pug для секций должно быть аналогично и для parts (и наоборот).
    * Pug представляет из себя миксин и импортируется в файл необходимой страницы, расположенной в ```app/pages```
    * SCSS файл импортируется в файл ```app/front-scss/sections/sections.styles.js``` используемый в бандл-сборке и в файл стилей страницы, где этот блок используется ```app/front-scss/pages/[page_name].scss``` для постраничной сборки
    * Общий файл секций ```sections.styles.js``` импортируется в ```app/front-scss/bundle.styles.js``` после константных, библиотечных и parts стилей

### Страницы (pages)
* Каждая страница представляет из себя переиспользуемый PUG-шаблон, имеет свой файл или папку внутри ```app/pages/```. SCSS файлы страницы содержат импорты используемых на данной странице секций, располагаются внутри ```app/front-scss/pages/```. SCSS недопустимо располагать вместе с pug.
    * Pug представляет из себя набор констант с информацией для отображения на сайте и набор используемых миксинов секций и компилируется в html. Head должен быть вынесен в отдельную секцию, как и header, и footer. Вставка скриптов не допустима в Pug и выполняется автоматически
    * SCSS файл страницы импортируется в JS-файл страницы ```app/front-js/pages/```. В бандл-сборке данный файл не учавствует, так как в бандл и так собираются все parts и все sections стили. 
    * *Важно!* Для корректной сборки в режиме бандла необходимо данный импорт исключить  в JS, поэтому в JS файле страницы, куда произведён импорт стилей страницы, необходимо все импорты стилей разместить между комментариями ```/* START_EXCLUDE_JS_BUNDLE */``` и ```/* END_EXCLUDE_JS_BUNDLE */```. В ином случае они могут импортироваться дважды в конечную bundle - сборку или привести к ошибке webpack! 
    * Общий файл страниц не существует, так как они используются только в постраничной сборке.

### Javascript
* JS разбивается на компоненты (например, функционал класса хедера), утилитарные импортируемые функции (например ```croppText()```) и pages — файлы скрипта каждой страницы. 
* JS пишется в функциональной парадигме, допустимо использование ООП.
* JS страницы располагается в ```app/front-js/pages``` представляет собой файл, в котором: 
    * Импортируются стили страницы с отбивкой комментарием для бандл сборки
    * Импортируются функции из папки components и utils
    * Объявляются константы данной страницы
    * Декларируются функции, используемые только на данной странице
    * Декларируется и экспортируется главная функция ```export default function pageName() {...}``` вызывающая все импортированные и декларированные функции. Данная функция импортируется и вызывается в ```app/front-js/bundle.js``` 
    * Вызывается главная функция с отбивкой комментарием для бандл сборки
    * Пример JS страницы: 
        ```javascript
        /* START_EXCLUDE_JS_BUNDLE */
        import "../../front-scss/pages/index.scss"; // импорт стилей для постраничной сборки
        /* END_EXCLUDE_JS_BUNDLE */
        import test from "../utils/utils"; // импорт функций из utils или components или библиотек

        // constants 
        const CONFIG = {
          TEXT: "I am index script",
          NAME: "Alex",
        };

        // functions
        function logConfig(config) {
          Object.values(config).forEach((value) => {
            console.log(value);
          });
        }
        function destination() {
          const summ = 1 + 15;
          console.log(summ);
        }

        // init
        export default function mainPage() {
          test();
          logConfig(CONFIG);
          destination();
        }

        /* START_EXCLUDE_JS_BUNDLE */
        // запуск в постраничной сборке
        mainPage();
        /* END_EXCLUDE_JS_BUNDLE */

        ```
    * Пример bundle.js для бандл-сборки:
        ```javascript
        import "../front-scss/bundle.styles";
        import mainPage from "./pages";
        import aboutPage from "./pages/about";

        function init() {
          mainPage();
          aboutPage();
        }
        init();
        ```

### Шрифты
* Шрифты находятся в папке ```app/vendor/fonts/[font_name]/```
    * используйте преимущественно [форматы](https://caniuse.com/#search=woff) ```.woff``` и ```.woff2```
    * шрифты подключаются в файл ```app/vendor/fonts/fonts.scss```, который в свою очередь импортируется в ```app/front-scss/utils/utils.scss```
    * сконвертировать шрифты можно с помощью [данного сервиса](https://convertio.co/ru/ttf-woff2/)
    * шрифты выгружаются в ```dist/recourses/fonts```

### Изображения
* изображения находятся в папке ```app/images```
    * изображения автоматически сжимаются при сборке и размещаются в папке ``` dist/resources/images```
    * изображения в pug встраиваются через тег img с использованием require, использование alt обязательно. Пример прямого встраиваения: ```img(src=require("../images/webpack_thumbnail.png") alt="thumbnail")```. Пример встраивания через объект констант (передачи в компонент):
        ```pug
        //- index.pug
        //- ...
        var certificateCardData={
          title: 'Сертификат соответствия ISO 9001-2015',
          text: 'Этот сертификат подтверждает, что наше производство соответствует международным стандартам качества, что позволяет нам выпускать продукцию, отвечающую высоким требованиям наших клиентов.',
          imgSrc: require('../images/docAbout.svg'),
          imgAlt: 'icon'
        }
        //- ...
        html(lang= 'ru')
          head 
            +head(headData)
          body.body 
            +header(headerData)
            main.main 
              +certificate-about(certificateData)
            +footer(footerData)

        //- certificate.pug
        include ../../parts/roundseparator.pug
        mixin certificate-about({caption, title, text, certificate})
          section.section.certificate-about
            .section__scaleble.certificate-about__scaleble
              .container.certificate-about__container 
                +rounded-sep({color: 'orange', caption})
                .certificate-about__content
                  .certificate-about__hero
                    h2.h2.certificate-about__title.text-animation !{title} 
                    p.text_16.certificate-about__text.text-animation !{text}
                    img.certificate-about__icon.text-animation(src=certificate.imgSrc, alt=certificate.imgAlt)
                    h3.h5.certificate-about__card-title.text-animation !{certificate.title}
                    p.text_16.certificate-about__card-text.text-animation !{certificate.text}
        ```
    * Изображение для генерации фавиконок должно находиться в папке ```app/images``` и иметь размер не менее ```1080px x 1080px```. Также необходимо пройти по всем конфигурациям Webpack и установить путь до изображения в плагине ```FaviconsWebpackPlugin``` по ключу ```logo```. Favicons выгружаются в ```dist/recourses/favicons```

    * SVG автоматически встраиваются аналогично изображениям и выгружаются в ```dist/resources/svg```. Изменить стили svg можно по классу или по тегу через родительскую обёртку, например:
        ```scss
        .image {
          fill: blue;
        }

        .image__box svg {
          fill: blue;
        }
        ```
    Бывает такая ситуация, когда стили иконки поменять не получается. Это связано с тем, что при экспорте из Figma в svg добавляется лишний код — ширина, высота, заливка и тп. Например:
        ```html
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.90918 4.04542L13.091 9.54088L4.90918 14.9545L4.90918 4.04542Z" fill="#1B1B1D"/>
        </svg>
        ```
        Нужно удалить ```fill="none"``` и ```fill="#1B1B1D"```. Должно получиться так:
        ```html
        <svg width="18" height="19" viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.90918 4.04542L13.091 9.54088L4.90918 14.9545L4.90918 4.04542Z"/>
        </svg> 
        ```

### Сторонние библиотеки
* все сторонние библиотеки устанавливаются в папку ```node_modules```
    * для загрузки утилитарных библиотек, которые не будут в конечной сборке воспользуйтеcь командой ```npm i -D package_name``` или ```npm i package_name --save-dev```. Для загрузки библиотек, идущих в продакшн, например слайдеров, анимаций используйте ```npm i gsap swiper``` (gsap и swiper — названия пакетов)
    * для подключения JS-файлов библиотек импортируйте их в самом начале JS-файла, который использует скрипт и убедитесь, что вы не запихали импорт в игнорирование бандлером, например:
        ```javascript
        import swiper from "swiper";
        /* START_EXCLUDE_JS_BUNDLE */
        import "../../front-scss/pages/about.scss";
        /* END_EXCLUDE_JS_BUNDLE */
        import test from "../utils/utils";

        // constants
        // ...

        // functions
        // ...

        // init function page()
        // ...

        /* START_EXCLUDE_JS_BUNDLE */
        page()
        /* END_EXCLUDE_JS_BUNDLE */
        ```
    * для подключения стилевых файлов библиотек импортируйте их в файл ```app/vendor/libs.scss```
    * JS-файлы и стилевые файлы библиотек самостоятельно изменять нельзя. Для работы со стилями используйте дополнительные классы или их комбинацию.

## Short English Description

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

We have 2 webpack configs wich use different features and level of code optimization:

* <strong>webpack.dev.js:</strong> This is simple configuration for dev mode, wich used webpack-dev-server with hot replacement and without compressing and difficult processing.
* <strong>webpack.prod.js:</strong> This is hard configuration for production with JS, CSS, HTML and assets optimization.

### Main tasks:
* <strong>npm run dev:</strong> Use for starting developing mode. Default browser with project will open automaticly. If you have a local internet, you'll be able to open the site on mobile. For that, look at the adress in terminal.
* <strong>npm run build:</strong> Use for getting complete optimized project.
* <strong>npm run deploy:</strong> Project deployment on GitHub pages. 

### src's & dist's:
* All src files located in app/
* All pages files located in app/pages in Pug format
* Main SCSS src files located in app/front-scss/pages/(page-name).scss
* Main SCRIPT src files located in app/front-js/pages/(page-name).js
* All compressed styles located in dist/styles/(page-name).css
* All compressed scripts located in dist/scripts/(page-name).js
* All src images placed in app/images/ folder
* All compressed images placed in dist/resources/(folder)
* Components folder is opened for place there often used html part and sections with Pug

## Issues
No Issues at that time.

# Bundle

To make bundle with 1 entry point and bundle output files, like *.html, main.css, main.js use <npm run bundle:build>. 
Before it you should place scss and js imports correctly. To achive it: 
* Import all of parts into parts.bundle.scss, sections into sections.bundle.scss, constants and other global styles in utils.scss
* Don't import pages!
* To escape cross - over and repeatable import in parts or sections use START_EXCLUDE_STYLE_BUNDLE end END_EXCLUDE_STYLE_BUNDLE comments
* Do the same for js files, using START_EXCLUDE_JS_BUNDLE and END_EXCLUDE_JS_BUNDLE


