const WINDOW_WIDTH = 300;
const WINDOW_HEIGHT = 600;

const createReact = (x, y, w, h) => {
  const position = { x, y };
  const dimensions = { w, h };

  function getInfo() {
    const { x, y } = position;
    const { w, h } = dimensions;

    return { x, y, w, h };
  }

  function getLeft() {
    return x;
  }

  function getRight() {
    return x + w;
  }

  function getTop() {
    return y;
  }

  function getBottom() {
    return y + h;
  }

  function checkRectCollision(rect) {
    return (
      getLeft() < rect.getRight() &&
      getRight() > rect.getLeft() &&
      getTop() < rect.getBottom() &&
      getBottom > rect.getTop()
    );
  }

  function setX(newX) {
    position.x = newX;
  }

  function setY(newY) {
    position.y = newY;
  }

  function render(ctx) {
    const { x, y, w, h } = getInfo();
    ctx.fillRect(x, y, w, h);
  }

  return {
    setX,
    setY,
    getLeft,
    getRight,
    getTop,
    getBottom,
    checkRectCollision,
    render,
  };
};

const createPaddle = (x, y, w = 50, h = 12.5) => {
  const rect = createReact(x, y, w, h);
  const velocity = 10;

  function render(ctx) {
    rect.render(ctx);
  }

  function getRect() {
    return rect;
  }

  function getCollision(rectBody) {
    return rect.checkRectCollision(rectBody);
  }

  return {
    render,
    getCollision,
  };
};

const createBrick = (x, y, w = 50, h = 12.5, life = 1) => {
  const rect = createReact(x, y, w, h);

  function checkContact(body) {
    if (getCollision(body)) life--;
  }

  function getCollision(rectBody) {
    return rect.checkRectCollision(rectBody);
  }

  function isBreak() {
    return life <= 0;
  }

  function render(ctx) {
    rect.render(ctx);
  }

  return {
    checkContact,
    isBreak,
    render,
  };
};

const createLayout = () => {
  const layout = [
    ["#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#"],
    [" ", "#", " ", "#", " ", "#"],
    ["#", "#", " ", "#", " ", "#"],
    ["#", " ", "#", "#", "#", "#"],
  ];
  const BRICK_WIDTH = WINDOW_WIDTH / layout[0].length;
  const BRICK_HEIGHT = 12.5;

  function getBricks() {
    const bricks = [];

    for ([rowNumber, row] of layout.entries()) {
      for ([colNumber, col] of row.entries()) {
        if (col != "#") continue;

        const brickX = colNumber * BRICK_WIDTH;
        const brickY = rowNumber * BRICK_HEIGHT;

        const newBrick = createBrick(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
        bricks.push(newBrick);
      }
    }

    return bricks;
  }

  return {
    getBricks,
  };
};

const createGame = () => {
  const paddle = createPaddle(150, 400);
  const bricks = createLayout().getBricks();

  function render(ctx) {
    // Render paddle
    paddle.render(ctx);
    // Render Ball
    // Render Bricks
    bricks.forEach((brick) => brick.render(ctx));
  }

  function update() {}

  return {
    render,
    update,
  };
};

const canvas = document.querySelector("#gameScreen");
const context = canvas.getContext("2d");
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

let game = createGame();
game.render(context);
