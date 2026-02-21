function setup() {
  createCanvas(300, 255);
  chal = createCheckbox("Challenge Mode",true);
  chal.style("font-family", "Consolas,Lucida Console,courier,monaco,monospace");
  chal.style("font-size", "10pt");
  chal.hide();
  

  ops = [];
  ops.push(
    new op(">", "<=", (a, b) => {
      return a > b;
    })
  );
  ops.push(
    new op("<", ">=", (a, b) => {
      return a < b;
    })
  );
  ops.push(
    new op("==", "!=", (a, b) => {
      return a == b;
    })
  );
  ops.push(
    new op("<=", ">", (a, b) => {
      return a <= b;
    })
  );
  ops.push(
    new op(">=", "<", (a, b) => {
      return a >= b;
    })
  );
  ops.push(
    new op("!=", "==", (a, b) => {
      return a != b;
    })
  );

  initQuestion();

  streak = 0;
  longestStreak = -1;

  // showSolution = false;
}

function draw() {
  background(255);
  fill(0);
  textAlign(CENTER, CENTER);
  textFont("Consolas,Lucida Console,courier,monaco,monospace");
  textSize(18);

  text(
    `Simplify\n!( ${signA.toString("a", "b")} ${andOr.sign} ${signB.toString(
      "x",
      "y"
    )} )\n\n   a    b    x    y`,
    width / 2,
    70
  );

  solA.paint();
  solB.paint();
  midSol.paint();
  textSize(14);
  rectMode(CENTER);
  //  text(flipA.sign +" "+ solA.sel +" "+  flipB.sign+" "+ solB.sel+" "+checkSol(), 150,250);
  if (solReady()) {
    noFill();
    
    rect(160, 150, 90, 30); //115 205  135  165
    fill(0);
    text(buttonText, 160, 150);
  }

  if (chal.checked()) {
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(12);
    text("Current Streak:" + streak, 5, 10);
    if(longestStreak != -1)
    text("Longest Streak:" + longestStreak, 175, 10);
    textAlign(CENTER, CENTER);
  }

  if (showSolution) {
    fill(222, 0, 0);
    textSize(18);
    text(
      `${flipA.toString("a", "b")} ${andOrFlip.sign} ${flipB.toString(
        "x",
        "y"
      )}`,
      width / 2 + 10,
      190
    );
  }
}

function mousePressed() {
  if (mouseX < 205 && mouseX > 115 && mouseY > 135 && mouseY < 165) {
    if (solReady()) {
      if (showSolution) {
        initQuestion();
      } else if (checkSol()) {
        initQuestion();
        streak++;
        // buttonText = "Correct!"
      } else {
        if(streak>0)
        longestStreak = max(longestStreak,streak);
        streak = 0;
        showSolution = true;
        buttonText = "Next";
      }
      return;
    }
  }  
    solA.mousePressed();
    solB.mousePressed();
    midSol.mousePressed();
  
}

function initQuestion() {
  signA = random(ops);
  signB = random(ops);

  flipA = signA.flipped();
  flipB = signB.flipped();

  andOr = new op("&&", "||", (a, b) => {
    return a && b;
  });
  andOrFlip = new op("||", "&&", (a, b) => {
    return a || b;
  });
  if (random() < 0.5) {
    let x = andOr;
    andOr = andOrFlip;
    andOrFlip = x;
  }

  solA = new opSel();
  solA.x = 115;
  solA.y = 104;
  solB = new opSel();
  solB.x = 215;
  solB.y = 104;
  midSol = new opSel(["&&", "||"]);
  midSol.x = 165;
  midSol.y = 104;

  showSolution = false;
  buttonText = "submit";
}

function solReady() {
  return (
    !solA.menu &&
    !solB.menu &&
    !midSol.menu &&
    solA.sel != "__" &&
    solB.sel != "__" &&
    midSol.sel != "__" 
  );
}

function checkSol() {
  return (
    flipA.sign == solA.sel &&
    flipB.sign == solB.sel &&
    andOrFlip.sign == midSol.sel
  );
}

function opSel(list) {
  if (list == undefined) list = [">", "<", "==", "<=", ">=", "!="];
  this.options = list;
  this.sel = "__";
  this.menu = true;

  this.toString = () => {
    return this.isPressed() ? "?" : this.sel;
  };

  this.paint = () => {
    fill(0);
    text(this.toString(), this.x, this.y);

    fill(192);
    if (this.menu) {
      push();
      translate(0, 5);
      for (let s of this.options) {
        translate(0, 20);
        text(s, this.x, this.y);
      }

      pop();
    }
  };

  this.mousePressed = () => {
    if (this.menu) {
      let y = this.y + 5;
      for (let i in this.options) {
        y += 20;

        if (dist(mouseX, mouseY, this.x, y) < 10) {
          this.sel = this.options[i];
          this.menu = false;
          return;
        }
      }
    }

    if (dist(mouseX, mouseY, this.x, this.y) < 10) {
      this.menu = !this.menu;
    }
  };

  this.isPressed = () => {
    if (!this.menu) return dist(mouseX, mouseY, this.x, this.y) < 10;
  };
}

function op(sign, opposite, func, negate) {
  this.sign = sign;
  this.opposite = opposite;
  this.func = func;
  this.not = negate != undefined ? negate : random(7) < 1 ? true : false;

  this.toString = (a, b) => {
    let str = `${a} ${this.sign} ${b}`;
    return this.not ? "!(" + str + ")" : str;
  };

  this.copy = () => {
    return new op(this.sign, this.opposite, this.func, this.not);
  };

  this.flipped = () => {
    if (this.not) return new op(this.sign, this.opposite, this.func, false);

    for (let o of ops) {
      if (o.sign == this.opposite) {
        let cop = o.copy();
        cop.not = false;
        return cop;
      }
    }
  };
}
