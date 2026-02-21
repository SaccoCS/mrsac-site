function setup() {
  noCanvas();
  but = createButton("Win-Loss");
  but.mousePressed( () =>{
    let sum = [];
    sum.push(int(prompt("How many wins?")));
    sum.push(int(prompt("How many losses?")));
    
    let t = 0;
    sum.forEach(v=>{
      t += v;
    })
    alert(`${sum[0]} wins and ${sum[1]} losses\nWin Percentage: ${sum[0]/t*100}%`);
  
  });
}

