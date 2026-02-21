function setup() {
  createCanvas(401, 401);
  textAlign(CENTER, CENTER);
  nums = [];

  for (var i = 1; i < 256; i++) {
    nums.push(i);
  }
  gridWid = 15;
  size = (width - 1) / gridWid;

  selected = 8;

}

function draw() {
  background(220);
  for (var r = 0; r < gridWid; r++) {
    for (var c = 0; c < gridWid; c++) {
      
      var index = gridWid * r + c;
      var t = nums[index];
      
     
      fill(255);
      
      rect(size * c, r * size, size, size);

      fill(0);
      
      text(t, size * c + size / 2, size * r + size / 2);

    }
  }
}

function keyPressed(){
  if(key == 'r'){
    nums = [];

  for (var i = 1; i < 256; i++) {
    nums.push(i);
  }
  }

}

function mousePressed() {
  var r = floor(mouseY / size);
  var c = floor(mouseX / size);
  var index = gridWid * r + c;
  var val = nums[index];
  selected = val;

  if(selected>-2)
  for (var i = nums.length-1; i >=0 ; i--) {
	if( nums[i] %nums[index] == 0 && i != index){
    nums.splice(i,1);
  }
  }
}