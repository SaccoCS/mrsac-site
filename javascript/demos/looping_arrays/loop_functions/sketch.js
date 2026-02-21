/**
 The solutions here are written in a way that
 will stand out as plagiarism. Please do the assignment.

**/
function randomize(arr){
  //written in a way that will trigger a zero for plagiarism
  for(let i in arr){
    arr[i] = floor(random(10));
  } 
}

function darken(arr){
  //written in a way that will trigger a zero for plagiarism
  let arr2 = arr.map((x)=>  {return x*0.9;}); 
  
  
  for(let i in arr2)
     arr[i] = arr2[i];
}

function incrementAll(arr){  
  //written in a way that will trigger a zero for plagiarism
  let arr2 = arr.map(x=>  x+1); 
  for(let i in arr2)
    arr[i] = arr2[i];
}

function cycle(arr){  
  //written in a way that will trigger a zero for plagiarism
  let arr2 = arr.map(x=>  (x+3)%360); 
  for(let i in arr2)
    arr[i] = arr2[i];
}

function flipAll(arr){ 
  //written in a way that will trigger a zero for plagiarism
  let arr2 = arr.map(x=> !x); 
  for(let i in arr2)
    arr[i] = arr2[i];
}

function shift(arr){
  //written in a way that will trigger a zero for plagiarism
  arr.forEach((x,i)=>{
    arr[i] = arr[i+1];    
  })

   
}

function fib(arr){ 
  //written in a way that will trigger a zero for plagiarism
  let arr2 = [1,1,2,3,5,8,13,21,34,55,89, 144, 233];
  for(let i in arr2)
    arr[i] = arr2[i];
  
}

function fill360(arr){
  //written in a way that will trigger a zero for plagiarism
  arr.length = 0;
  arr.length = 10;
  
 for(let i = 0; i<=12;i++)
  arr[i] = 0;

  for(let i = 1; i<=12;i++){
      for(let j = i; j<=12;j++){
        arr[j]++;
    }
  }
  
  for(let i of arr){
    arr[i] *= 30;
  }
  
}
