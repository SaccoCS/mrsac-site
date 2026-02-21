class FlowField {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.vectors = [];
    this.fillRand();
    this.image = null;

  }



  fillRand() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.vectors.push(p5.Vector.random2D());
      }
    }
  }

  isValid(row, col) {
    row = floor(row);
    col = floor(col);
    return !(row < 0 || col < 0 || row >= this.rows || col >= this.cols);
  }

  get(row, col) {
 
    
    row = floor(row);
    col = floor(col);
    //     console.log(row+" "+col);
    if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) {

      return createVector(0, 0);
    }



    return this.vectors[row * this.rows + col];
  }

 
  getImage() {
    if (this.image != null)
      return this.image;

    this.image = createGraphics(851, 551);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {

        let x = c * 10;
        let y = r * 10;

        this.image.rectMode(CORNER);
        this.image.stroke(200);
        this.image.fill(255);
        this.image.strokeWeight(1);
        // rect(x, y, 10, 10);

        x += 5;
        y += 5;

        let v = this.get(r, c);
        // console.log(v);
        let nx1 = x + 4 * v.x;
        let ny1 = y + 4 * v.y;
//         this.image.stroke(100,200,100,50);
//         this.image.line(x, y, nx1, ny1);

        let nx2 = x - 3 * v.x;
        let ny2 = y - 3 * v.y;
        this.image.stroke(200,100,100,50);
        this.image.line(x, y, nx2, ny2);
        
        this.image.stroke(100,200,100);
        this.image.line(x, y, nx1, ny1);
      }
    }
    return this.image;
  }

  draw() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {

        let x = c * 10;
        let y = r * 10;

        rectMode(CORNER);
        
        stroke(0);
        fill(255);
        // rect(x, y, 10, 10);

        x += 5;
        y += 5;

        let v = this.get(r, c);
        // console.log(v);
        let nx1 = x + 4 * v.x;
        let ny1 = y + 4 * v.y;
        stroke(0);
        line(x, y, nx1, ny1);

        let nx2 = x - 2 * v.x;
        let ny2 = y - 2 * v.y;
        line(x, y, nx2, ny2);
      }
    }
  }

  
  mutate(percent){
    for(let i = 0; i<this.vectors.length; i++){
      
      if(random(1)<percent)
      this.vectors[i] = p5.Vector.random2D();
    }
  }

  cross(other) {
    let cVectors = [];

    let r1 = random(0, this.rows);
    let r2 = random(0, this.rows);
    let c1 = random(0, this.cols);
    let c2 = random(0, this.cols);

    let minR = Math.min(r1, r2);
    let maxR = Math.max(r1, r2);
    let minC = Math.min(c1, c2);
    let maxC = Math.max(c1, c2);


    for (let i = 0; i < this.vectors.length; i++) {

      let r = i / this.cols;
      let c = i % this.cols;

      if (random(1) < 0.05)
      {
        let angle =  this.vectors[i].heading();
        cVectors[i] = p5.Vector.random2D();
        return;//fromAngle(angle+random(-PI/2,PI/2));
      }  else  if (r >= minR && r <= maxR && c >= minC && c <= maxC)
        cVectors.push(this.vectors[i]);
      else
        cVectors.push(other.vectors[i]);
      
//       else 
//       if(random(1)<0.5)
//         {
//           cVectors.push(this.vectors[i])
//         }
//       else
//         cVectors.push(other.vectors[i]);
      
      
     
    }

    let f = new FlowField(this.rows, this.cols);
    f.vectors = cVectors;

    return f;
  }

 cross2(other) {
    let cVectors = [];

   

    for (let i = 0; i < this.vectors.length; i++) {

      let r = i / this.cols;
      let c = i % this.cols;

      if (random(1) < 0.05)
      {
        let angle =  this.vectors[i].heading();
        cVectors[i] = p5.Vector.fromAngle(angle+random(-PI/3,PI/3));
      }  
      else if(random(1)<0.5)
        {
          cVectors.push(this.vectors[i])
        }
      else
        cVectors.push(other.vectors[i]);
      
      
      if(0===0)
        continue;
//       else if (r >= minR && r <= maxR && c >= minC && c <= maxC)
//         cVectors.push(this.vectors[i]);
//       else
//         cVectors.push(other.vectors[i]);
    }

    let f = new FlowField(this.rows, this.cols);
    f.vectors = cVectors;

    return f;
  }

}