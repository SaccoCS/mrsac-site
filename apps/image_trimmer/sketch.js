let img; // A p5.Image to store the clipboard image

let minX, maxX, minY, maxY;

function setup() {
  can = createCanvas(200, 100);
  // img = loadImage('Screenshot 2026-01-12 093428.png'); // Load a placeholder
  // Listen for the paste event on the window
  window.addEventListener("paste", pasteHandler);
  textAlign(CENTER, CENTER);
  text("Click or paste image here!", width / 2, height / 2);
}

function draw() {
  background(0);

  fill(255);

  if (img) {
    
    image(img, 0, 0);
    text("Pasted Image", width / 2, height / 2);

    if (maxX) {
      stroke(222, 0, 99);
      image(img, 0, 0, wid, hei, minX, minY, wid, hei);
    }
  } else {
    fill(255);
    noStroke();
    text("Paste Image Here", width / 2, height / 2);
  }
}

function isBlack(img, x, y) {
  let p = img.get(x, y);

  return p[0] + p[1] + p[2] == 0 && p[3] != 0;
}

function imageLoaded() {
  // resizeCanvas(img.width, img.height);

  let name = prompt("Question #?");

  minX = img.width;
  maxX = -1;

  minY = img.height;
  maxY = -1;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let p = img.get(x, y);
      // if (p[0] + p[1] + p[2] != 255 * 3 && p[3] != 0)

      if (isBlack(img, x, y)) {
        minX = min(minX, x);
        minY = min(minY, y);
        maxX = max(maxX, x);
        maxY = max(maxY, y);
        // console.log(x,minX,p)

        // if( x == 0)
        //   console.log(`${x},${y}`,p)
      }
    }
  }

  while (isBlack(img, minX, minY)) {
    minX++;
    minY++;
  }
  while (isBlack(img, maxX, maxY)) {
    maxX--;
    maxY--;
  }

  minX += 1;
  minY += 1;

  wid = maxX - minX;
  hei = maxY - minY;

  resizeCanvas(wid, hei);

  noLoop();
  draw();
  saveCanvas("Q" + name);
}

function pasteHandler(event) {
  console.log("PASTE");
  // Check if the event contains image data
  if (event.clipboardData && event.clipboardData.items) {
    for (let i = 0; i < event.clipboardData.items.length; i++) {
      let item = event.clipboardData.items[i];
      // Check if the item is an image
      if (item.type.indexOf("image") > -1) {
        let blob = item.getAsFile(); // Get the image as a File/Blob
        let reader = new FileReader();
        reader.onload = function (e) {
          // Create a new p5.Image from the data URL
          img = loadImage(e.target.result, imageLoaded);
        };
        reader.readAsDataURL(blob); // Read the image data
        event.preventDefault(); // Prevent default paste behavior

        break; // Stop after finding the first image
      }
    }
  }
}

// Optional: Prompt user to paste by clicking
function mousePressed() {
  // Maybe add a prompt to paste here if not already handled
}
