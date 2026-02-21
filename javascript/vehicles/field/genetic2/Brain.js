class Brain {


  constructor(flow) {
    this.score = -1;
    if (flow)
      this.flow = flow;
    else
      this.flow = new FlowField(55, 85);



  }

 

  scorem(blocks, goal) {
    let vehs = vehicleGrid(this);


    while (!this.completed(vehs)) {
      this.updateVehicles(vehs);
      this.vehicleCollision(vehs, blocks,goal);
    }
    let sum = 0;
    for (let v of vehs) {
      sum += goal.distTo(v);
    }

    this.score = sum;

  }


  updateVehicles(vehicles) {
    for (let v of vehicles) {

      if (!v.isActive)
        continue;

      v.steerField();
      v.update();
    }
  }

  vehicleCollision(vehicles, blocks,goal) {
    for (let v of vehicles) {

      if (!v.isActive)
        continue;

      let futureX = v.pos.x + 2 * v.vel.x;
      let futureY = v.pos.y + 2 * v.vel.y;

      for (let r = 0; r < blocks.length; r++) {
        if (blocks[r].contains(futureX, futureY)) {
          v.isActive = false;
        }
      }

      if (futureX < 0 || futureY < 0 || futureX > 850 || futureY > 550)
        v.isActive = false;

      if (goal.distTo(v) < goal.r) {
        v.isActive = false;
      }
    }
  }

  completed(vehicles) {
    for (let v of vehicles) {

      if (v.isActive)
        return false;
    }
    return true;
  }


  vehicleGrid(brain) {
    ve = [];
    for (let x = 25; x < width; x += 50) {
      for (let y = 25; y < height; y += 50) {
        ve.push(new Vehicle(x, y, brain));
      }

    }

    return ve;
  }

  distSum(x, y) {
    let sum = 0;

    for (let v of vehicles)
      sum += goal.distTo(v);

    return sum;
  }
}