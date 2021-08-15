<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Custom-Webpack-Configuration</h1>
  <p>
    Webpack is a module bundler. It is made primarily for JavaScript, but it can transform front-end assets such as HTML, CSS, and images if the corresponding loaders are included. webpack takes modules with dependencies and generates static assets representing those modules.
  </p>
  <p>Author: <a href="https://github.com/IstiyakRiyad" target="_blank">Md. Istiyak Hossain</a> </p>
</div>


## Build Process:

``` bash
# Download repository:
git clone https://github.com/IstiyakRiyad/Custom-Webpack-Configuration.git

# Go to parent directory:
cd Custom-Webpack-Configuration

# Install dependencies:
npm i

# Webpack dev server with hot reload at http://localhost:8080/
npm start

# Output will be at build/ folder(This is for Production)
npm run build

# Output will be at build/ folder(This is for Development)
npm run build-dev
```
## Project Structure:

* `src/template.html` - main HTML file(Make this HTML file without linking JavaScript and CSS)
* `src/styles` - put custom CSS styles here. Don't forget to import them in `main.js`
* `src/scripts` - put custom app scripts here
* `src/scripts/main.js` - main javaScript file where you include/import all required libs
* `src/assets/image` - put images here. Don't forget to use correct path
* `src/assets/fonts` - put fonts here. Don't forget to use correct path

![Webpack](https://user-images.githubusercontent.com/54698049/129415445-2a5a7fd9-601f-4864-b43f-ab6cf684fd13.jpg)

