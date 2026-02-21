function setup() {
  noCanvas();
  text_area = createElement('textarea');
  text_area.style("width","400px");
  text_area.style("height","400px");
  
  button = createButton("Submit");
  button.style("display","block");
  button.mousePressed(() =>{
   
    
    let url = 'https://grading-server.mrsacco.repl.co';
  let data = { userId: 1, title: 'p5 Clicked!', body: 'p5.js is way cool.' };
    
    let options = {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
        
      },
      body:JSON.stringify(data)

    }
    console.log('fetching')
    fetch('https://grading-server.mrsacco.repl.co/',options);

    
    
  });
  
}

function draw() {
  background(220);
}