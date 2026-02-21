class FlowField {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.vectors = [];
    this.fillRand();

  }

  fillRand() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.vectors.push(p5.Vector.random2D());
      }
    }
  }
  
  isValid(row,col){
    row = floor(row);
    col = floor(col);
    return !(row < 0 || col < 0 || row >= this.rows || col >= this.cols);
  }

  get(row, col) {
    row = floor(row);
    col = floor(col);
   // console.log(row+" "+col);
    if (row < 0 || col < 0 || row >= this.rows || col >= this.cols)
      return null;

   

    return this.vectors[row * this.rows + col];
  }

//   set(val, row, col) {
     //     this.vectors[row * this.rows + col] = val;
     //   }


  draw() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {

        let x = c * 10;
        let y = r * 10;

        rectMode(CORNER);
        stroke(0);
        fill(255);
       // rect(x, y, 10, 10);
        
        x+=5;
        y+=5;

        let v = this.get(r, c);
       // console.log(v);
        let nx1 = x + 3 * v.x;
        let ny1 = y + 3 * v.y;
        stroke(0);
        //line(x, y, nx, ny);
        
         let nx2 = x - 3 * v.x;
         let ny2 = y - 3 * v.y;
        line(nx1,ny1,nx2,ny2);
      }
    }
  }


}