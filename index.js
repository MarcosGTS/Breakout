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
        return (getLeft() < rect.getRight() &&
                getRigth() > rect.getLeft() &&
                getTop() < rect.getBottom() &&
                getBottom > rect.getTop());
    }

    function setX(newX) {
        position.x = newX;
    }

    function setY(newY) {
        position.y = newY;
    }

    function render(ctx) {
        const {x, y, w, h} = getInfo();
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
    };

    return {
        render,
        getCollision,
    }
};

const createGame = () => {
    const paddle = createPaddle(150, 400); 
    const bricks = []; 

    function render(ctx) {
        // Render paddle
        paddle.render(ctx);
        // Render Ball
        // Render Briks
    };

    function update() {};
    
    return {
        render,
        update,
    };
};

const canvas = document.querySelector("#gameScreen");
const context = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 600;

let game = createGame();
game.render(context);
