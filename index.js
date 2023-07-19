const createPaddle = (x, y, w = 50, h = 12.5) => {
    const position = {
        x: x - w/2,
        y: y - h/2
    };
    const dimensions = {w, h};
     
    function render(ctx) {
        const {x, y} = position;
        const {w, h} = dimensions; 
        ctx.fillRect(x, y, w, h);
    }

    function getPosition() {};
    function getCollision(body) {};

    return {
        render,
        getPosition,
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
