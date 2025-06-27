import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here
  let gameBoard = [
    [1,1,1,1,1,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,1,1,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0]
];
const mensaje = document.getElementById("mensaje");

let celdaSeleccionada = null;
let ySeleccionada = null;
let xSeleccionada = null;

for (let y=0; y<10; y++){
    for (let x=0; x<10; x++){
    let celda = getCelda(y,x);
    celda.addEventListener("click", () =>{
        if (celdaSeleccionada){
            celdaSeleccionada.style.border = "";
        }

        celdaSeleccionada = celda;
        ySeleccionada = y;
        xSeleccionada = x;

        celda.style.border = "1px solid red";
     
    });
    }
}

function getCelda(y,x) {
    let columnas = document.querySelectorAll(".columna");
    let columna = columnas[x+1];
    return columna.children[y+1];
}

function fireTorpedo(y,x) {
    let valor =  gameBoard[y][x];
    let celda = getCelda(y,x);
   
    if (valor === 1){
        gameBoard[y][x] = 2;
        celda.style.backgroundColor ="red";
        mensaje.textContent = "💥¡Tocado!";
        
    } else if(valor === 0) {
        gameBoard[y][x] = 3;
        celda.style.backgroundColor ="blue";
        mensaje.textContent = "😞¡Has fallado! Intentalo otra vez.";
    }else{
        mensaje.textContent = "⚠️¡Ya has disparado aquí!";
    }
}

let fire = document.getElementById("fire");
fire.addEventListener ("click", ()=>{
    if (ySeleccionada !== null && xSeleccionada !== null){
        fireTorpedo(ySeleccionada,xSeleccionada);
        if (celdaSeleccionada){
            celdaSeleccionada.style.border = "";
        }
        celdaSeleccionada = null;
        ySeleccionada = null;
        xSeleccionada = null;
    } else {
        mensaje.textContent = "⚠️¡Selecciona una celda primero!";
    }
});

let showShipVisible = false;
let showShips = document.getElementById("show-ships");
showShips.addEventListener("click", ()=>{

    for (let y=0; y<10; y++){
        for (let x=0; x<10; x++){
            let valor =  gameBoard[y][x];
            let celda = getCelda(y,x);

            if (!showShipVisible){
                if (valor === 1 || valor === 2){
                celda.style.backgroundColor ="red";
                }
            } else {
                if (valor === 1){
                celda.style.backgroundColor ="";
                }
            }
        }
    } 
    showShipVisible = !showShipVisible;
    showShips.textContent = showShipVisible ? "Hide Ships" : "Show Ships"  
});
};

// 0 = empty
// 1 = part of a ship
// 2 = a sunken part of a ship
// 3 = a missed shot
