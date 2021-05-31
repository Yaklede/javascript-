const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-colors");


canvas.width = 700;
canvas.height = 700;


ctx.lineWidth = 2.5;
ctx.strokeStyle = "rgb(44,44,44)";
let painting = false;

function stopPainting(event) {
    painting = false;
}

function startPainting(event) {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
        
    }
}
function onMouseDown(event) {
    painting = true;
}

function handdleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}


if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("mousedown",startPainting)
    canvas.addEventListener("mouseup",stopPainting)
    canvas.addEventListener("mouseleave",stopPainting)
}

Array.from(colors).forEach(color =>
    color.addEventListener("click",handdleColorClick)
);
