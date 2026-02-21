function setup() {
  
  noCanvas();
  d = createDiv();
  d.html("")
  left = createButton("LEFT");
  right = createButton("RIGHT");
  //url = 'http://192.168.86.199:3000/sides/'
  url = 'http://174.66.178.224:3000/sides/'
  fetch(url)
  .then(response => response.json())
  .then(data => d.html(data.msg));
  
  
}

function draw() {
  background(220);
}