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