function setup() {
  noCanvas();
  but = createButton("Average");
  but.mousePressed( () =>{
    let sum = [];
    for(let i =0; i<3; i++)
    sum.push(int(prompt("Enter a number:")));
    
    let t = 0;
    sum.forEach(v=>{
      t += v;
    })
    alert(`The average is ${t/sum.length}`);
  
  });
}

