// Assign code entry point to window:load event
//  - prevents page from running until whole html page has finished loading any necessary resources
//  -making sure assets used are available before use

// window.onload = function () {
// }
const canvasEl = document.querySelector('canvas') // reference to canvas element

const context = canvasEl.getContext('2d')
// Once you have the canvas context, you can use the canvas api method
//  you can call to draw a white background ~
// (context.fillRect) : fillRect takes 4 arguments (x, y, width, height)
// context.fillRect(0, 0, canvas.width, canvas.height)

// set width and height properties to canvas element
canvasEl.width = 1024
canvasEl.height = 576
// == - best to keep original size dimensions but still scale the canvas style (bounding box)
// == - actual width and height attributes: change the physical size of the canvas image area
// == - bounding boc: changes the dimensions of how it is drawn on the page
// == - can also move hard coded value to an object and replace the values with the object and get same result

// checks that variable are created
console.log(context)
console.log(canvasEl)
//   console.log('Document is ready!') // checks to make sure page is loading properly
