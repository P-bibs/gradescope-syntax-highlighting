# Better syntax highlighting for Gradescope graders

Boot strapped with [Chrome Extension Webpack Boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate).

## Instructions

1. Check if your Node.js version is >= 6.
2. Clone the repository.
4. Run either `yarn` or `npm install`.
7. Run `yarn run start` or `npm start`
8. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
9. Have fun.

## Packing

After the development of your extension run the command

```bash
$ NODE_ENV=production yarn run build # or `npm run build`
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Relevant Docs

* [Webpack docs](https://webpack.js.org)
* [Chrome Extension](https://developer.chrome.com/extensions/getstarted) 