const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-colors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSavs");


const INITIAL_COLOR = "rgb(44,44,44)";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

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
    ctx.fillStyle = color;
}
function handdleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handdleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }
    else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handdleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}
function handdleCM(event){
    event.preventDefault();
    console.log(event);
}

function handdleSaveClick(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("mousedown",startPainting)
    canvas.addEventListener("mouseup",stopPainting)
    canvas.addEventListener("mouseleave",stopPainting)
    canvas.addEventListener("click",handdleCanvasClick)
    canvas.addEventListener("contextmenu",handdleCM)
}

Array.from(colors).forEach(color =>
    color.addEventListener("click",handdleColorClick)
);

if(range){
    range.addEventListener("input",handdleRangeChange)
}

if(mode){
    mode.addEventListener("click",handdleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click",handdleSaveClick)
}