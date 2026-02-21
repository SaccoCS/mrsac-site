class Generation {

   constructor(blocks, goal,oldBrains) {
      this.blocks = blocks;
      this.goal = goal;

     

      if (oldBrains) {
         this.brains = this.breed(oldBrains);

      } else {
         this.brains = this.newBrains(200);
      }
      
      
      this.scoreBrains();
      this.sortBrains();

   }
   
   
   
   scoreBrains(){
      for(let b of this.brains){
         b.scorem(this.blocks,this.goal);
      }
   }
   
   sortBrains(){
      for (let i = 1; i < this.brains.length; i++) {
         let j = i;
         while (j > 0 && this.brains[j - 1].score > this.brains[j].score) {
            
            let hold = this.brains[j - 1];
            this.brains[j - 1] = this.brains[j];
            this.brains[j] = hold;
            j--;
         }
      }
   }

   alpha() {
      return this.brains[0];
   }

   newBrains(size) {
      let ret = [];

      while (ret.length < size)
         ret.push(new Brain());

      return ret;
   }

   breed(oldBrains) {


      //score and minscore
      let minScore = oldBrains[0].score;
      for (let b of oldBrains) {
         
            b.scorem(this.blocks, this.goal);
         

         if (b.score < minScore)
            minScore = b.score;
      }



      //send scores 
     




      //sortAscending

    
      for (let i = 1; i < oldBrains.length; i++) {
         let j = i;
         while (j > 0 && oldBrains[j - 1].score > oldBrains[j].score) {
            
            let hold = oldBrains[j - 1];
            oldBrains[j - 1] = oldBrains[j];
            oldBrains[j] = hold;
            j--;
         }
      }

  
      console.log(oldBrains);
     


    let  pool = [];
      let sum = 0;

      let min = oldBrains[0].score;
      let max = oldBrains[oldBrains.length-1].score;
      let range = max - min;
      
     
      
      for (let b of oldBrains) {
         b.score -= min*.98;

         b.score /= range;
          b.score = 1 /( b.score*b.score);
         
      }

      
      pool.push(oldBrains[0]);
      
      for (let i = 0; i < oldBrains.length / 4; i++) {
         pool.push(oldBrains[i]);

         sum += oldBrains[i].score;

      }

      
      
       
      

      let nextGen =[];// [oldBrains[0]];
   //   oldBrains[0].score = -1;

      while (nextGen.length < oldBrains.length) {

         let mom = this.randomBrain(pool, sum).flow;
         let dad = this.randomBrain(pool, sum).flow;

         let baby = new Brain(mom.cross(dad));

         baby.flow.mutate(0.05);
         nextGen.push(baby);
      }



   return nextGen;


   }



   randomBrain(pool, sum) {
      
      let rand = random(0, sum);
      let i = 0;
      while (rand > pool[i].score) {
         rand -= pool[i].score;
         i++;
      }

      return pool[i];
   }



}