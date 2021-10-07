let direcciones = {x: 0, y: 0}; 
const sonidoComida = new Audio('assets/music/food.mp3');
const sonidoJuegoTerminado = new Audio('assets/music/gameover.mp3');
const sonidoMovimiento = new Audio('assets/music/move.mp3');
const sonidoMusica = new Audio('assets/music/music.mp3');
let velocidad = 7;
let puntuacion = 0;
let ultimaVez = 0;
let snakeArreglo = [{x: 13, y: 15}];

food = {x: 6, y: 7};

function main(tiempo) 
{
    window.requestAnimationFrame(main);

    if((tiempo - ultimaVez)/1000 < 1/velocidad)
    {
        return;
    }

    ultimaVez = tiempo;

    gameEngine();
}

function isCollide(snake) 
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

function gameEngine(){
    if(isCollide(snakeArreglo))
    {
        sonidoJuegoTerminado.play();
        sonidoMusica.pause();
        direcciones =  {x: 0, y: 0}; 
        alert("Juego Terminado, presione cualquier tecla para continuar");
        snakeArreglo = [{x: 13, y: 15}];
        sonidoMusica.play();
        puntuacion = 0; 
    }

    if(snakeArreglo[0].y === food.y && snakeArreglo[0].x ===food.x)
    {
        sonidoComida.play();
        puntuacion += 1;
        if(puntuacion>hiscoreval)
        {
            hiscoreval = puntuacion;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Puntuación Maxima: " + hiscoreval;
        }

        scoreBox.innerHTML = "Puntuación: " + puntuacion;
        snakeArreglo.unshift({x: snakeArreglo[0].x + direcciones.x, y: snakeArreglo[0].y + direcciones.y});

        let a = 2;
        let b = 16;

        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snakeArreglo.length - 2; i>=0; i--) 
    { 
        snakeArreglo[i+1] = {...snakeArreglo[i]};
    }

    snakeArreglo[0].x += direcciones.x;
    snakeArreglo[0].y += direcciones.y;

    board.innerHTML = "";
    snakeArreglo.forEach((e, index)=>
    {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

sonidoMusica.play();

let hiscore = localStorage.getItem("hiscore");

if(hiscore === null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else
{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Puntuación Maxima: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>
{
    direcciones = {x: 0, y: 1}
    sonidoMovimiento.play();

    switch (e.key) 
    {
        case "ArrowUp":
            direcciones.x = 0;
            direcciones.y = -1;
            break;

        case "ArrowDown":
            direcciones.x = 0;
            direcciones.y = 1;
            break;

        case "ArrowLeft":
            direcciones.x = -1;
            direcciones.y = 0;
            break;

        case "ArrowRight":
            direcciones.x = 1;
            direcciones.y = 0;
            break;
        default:
            break;
    }
});