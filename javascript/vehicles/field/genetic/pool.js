class Pool {
  constructor(vehicles) {
    this.sort(vehicles);
    this.vehicles = vehicles;
    //let v = this.vehicles;
    

    this.min = this.vehicles[0].minDist-1;
    this.max = this.vehicles[this.vehicles.length-1].minDist;

    this.totalPoints = 0;
    for (let v of this.vehicles) {
      v.minDist -= this.min;
      
     this.totalPoints += this.score(v);
    }

//     console.log(this.vehicles[0]);
//      console.log(this.vehicles[this.vehicles.length-1]);
    
   // console.log("pomts"+this.totalPoints);
  

  }
  
  score(v){
    let d = v.minDist;
    
    
    let s = 100/(d*d);
    s *= v.hitBonus;
    v.score = s;
    
    return s;
    
  }
  
 
  
  randomCross(){
//     if(random(1)<0.05)
//      {
//        let v =new Vehicle(spawnX,spawnY);
//         v.pos = createVector(spawnX, spawnY);
//        console.log('random');
//        return v;
//      } 
    
    let total = 0;
    for(let i = 0; i<vehicles.length/3;i++)
      {
        total += vehicles[i].score;
      }
    
    
    let rand = random(0,total);
    
    let indexA = 0;
    while(rand>this.vehicles[indexA].score){
      rand -= this.vehicles[indexA].score;
      indexA++;
    }
    
    rand = random(0,total);
    
    let indexB = 0;
    while(rand>this.vehicles[indexB].score){
      rand -= this.vehicles[indexB].score;
      indexB++;
    }
    
   
    
     
    let mom = this.vehicles[indexA];
    let dad = this.vehicles[indexB];
    
    if(random(1)<0.00)
     {
       let v =new Vehicle(spawnX,spawnY);
        v.pos = createVector(spawnX, spawnY);
       mom = v;
     } 
//       console.log(indexA+" "+indexB);
    
    let childF = mom.field.cross(dad.field);
    let child = new Vehicle();
    child.pos = createVector(spawnX, spawnY);
    
    if(random(1)<0.98)
    child.field = childF;
    
    
    return child;
    
    
  }
  
  leader(){
    return this.vehicles[0];
  }



  sort(v) {
    for (let i = 0; i < v.length; i++) {
      let small = i;
      for (let j = i + 1; j < v.length; j++) {
        if (v[j].minDist < v[small].minDist) {
          small = j;
        }
      }

      let hodor = v[i];
      v[i] = v[small];
      v[small] = hodor;
    }
  }
}