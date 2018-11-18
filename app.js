var snake;
const body = [];
const food = [];
let speed = 10;
let score = 0;
let size = score + 4;
var font,
    fontsize = 32;

function preload() {
  font = loadFont('PressStart2P-Regular.ttf')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  snake = new Snake;
};

function draw() {
  background(0);
  welcome();
  if (frameCount % speed === 0) {
    snake.moves();
  }
  snake.show(size);
  updateScore();
  if (body[0][0] >= width - snake.pieceSize || body[0][0] <= 0 || body[0][1] + snake.pieceSize >= height || body[0][1] <= 0) {
    snake.dies();
  }

  body.forEach((piece, index) => {
    if (body[0][0] === body[index][0] && body[0][1] === body[index][1] && index != 0) {
      snake.dies();
    }
  });

  if (frameCount % 300 === 0) {
    food.push(new Food());
  }

  food.forEach((piece, index) => {
    piece.show();
    if (piece.isEaten()) {
      food.splice(index, 1);
      score ++
      size ++
      if (score % 3 == 0) {
       speed --
      }
    }
  })
};

function Piece(x, y) {
  this.x = x;
  this.y = y;
  this.pieceSize = 25;
  this.piece = [this.x, this.y]
}

function Snake() {
  this.x = width / 2;
  this.y = height / 2;
  this.pieceSize = 25
  this.direction = 'right';
  piece = new Piece(this.x, this.y)
  body.push([piece.piece[0], piece.piece[1]])
  for (var i = 1; i < size + 1; i++) {
    body.push([piece.piece[0] - (i * 25), piece.piece[1]])
  }

  this.show = () => {
    fill(255);
    stroke(0);
    body.forEach((part) => {
      rect(part[0], part[1], 25, 25)
    });
  };

  this.moves = () => {
    if (this.direction === 'left') {
      body.splice(0, 0, [body[0][0] - 25, body[0][1]])
    } else if (this.direction === 'right') {
      body.splice(0, 0, [body[0][0] + 25, body[0][1]])
    } else if (this.direction === 'up') {
      body.splice(0, 0, [body[0][0], body[0][1] - 25])
    } else if (this.direction === 'down') {
      body.splice(0, 0, [body[0][0], body[0][1] + 25])
    }
    if (body.length === size + 2) {
      body.pop();
    }
  }

  this.dies = () => {
    fill(255);
    textFont(font);
    textAlign(CENTER);
    textSize(2 * fontsize);
    text(`Game Over! Score: ${score}`, width / 2, height / 2);
    noLoop();
  }
};

function Food() {
  this.x = Math.floor(Math.random() * (window.innerWidth - 50)) + 50;
  this.y = Math.floor(Math.random() * (window.innerHeight - 50)) + 50;
  this.magn = 25

  this.show = () => {
    fill(255);
    stroke(255);
    rect(this.x, this.y, this.magn, this.magn)
  }

  this.isEaten = () => {
    const headLeftSide = body[0][0]
    const headRightSide = body[0][0] + snake.pieceSize
    const headTop = body[0][1]
    const headBottom = body[0][1] + snake.pieceSize

    const foodLeftSide = this.x
    const foodRightSide = this.x + this.magn
    const foodTop = this.y
    const foodBottom = this.y + this.magn

    if (headRightSide < foodRightSide && headRightSide > foodLeftSide) {
      if (headTop < foodBottom && headTop > foodTop) {
        return true
      }

      if (headBottom > foodTop && headBottom < foodBottom) {
        return true
      }
    }

    if (headLeftSide > foodLeftSide && headLeftSide < foodRightSide) {
      if (headTop < foodBottom && headTop > foodTop) {
        return true
      }

      if (headBottom > foodTop && headBottom < foodBottom) {
        return true
      }
    }
  }
}

function keyPressed() {
  welcome.message = ''
  if (key == 'w' && snake.direction != 'down') {
    snake.direction = 'up'
  }

  if (key == 'a' && snake.direction != 'right') {
    snake.direction = 'left'
  }

  if (key == 'd' && snake.direction != 'left') {
    snake.direction = 'right'
  }

  if (key == 's' && snake.direction != 'up') {
    snake.direction = 'down'
  }
}

const updateScore = () => {
  fill(255);
  textFont(font);
  textAlign(RIGHT);
  textSize(fontsize);
  text(`Score: ${score}`, width - 100, 100);
};

const welcome = () => {
  this.message = "w a s d to move\nGame over if the snake\nhits itself or the edges"
  textFont(font);
  textAlign(CENTER);
  textSize(fontsize);
  text(this.message, width / 2, height / 2);
}
