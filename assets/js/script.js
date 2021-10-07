let direcciones = {x: 0, y: 0}; 

const sonidoComida = new Audio('/assets/music/food.mp3');
const sonidoJuegoTerminado = new Audio('/assets/music/gameover.mp3');
const SonidoMovimiento = new Audio('/assets/music/move.mp3');
const SonidoMusica = new Audio('/assets/music/music.mp3');

let velocidad = 7;
let puntuacionInicial = 0;
let ultimaVez = 0;
let snakeArreglo = [{x: 13, y: 15}];

comida = {x: 6, y: 7};

function main(tiempo) 
{
    window.requestAnimationFrame(main);

    if((tiempo - ultimaVez)/1000 < 1/speed)
    {
        return;
    }

    ultimaVez = tiempo;

    gameEngine();
}

function colisiono(snake) 
{
    for (let i = 1; i < snakeArreglo.length; i++) 
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }

    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0)
    {
        return true
    }
        
    return false;
}