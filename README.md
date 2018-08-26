# aio

> Realtime audio analysis tool

aio is built uppon [meyda](https://github.com/meyda/meyda) and is basically a GUI for this library.

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```

#### Usage

aio lets you use [spacebro](https://github.com/spacebro/spacebro) to send your audio datas accross any other app. aio will emit an `aio-datas` event with the raw extract datas as its payload everytime the `RMS` will go uppon your threshold.

For the feature selection, please refer to the [meyda documentation](https://github.com/meyda/meyda/wiki/Audio-Features).

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
