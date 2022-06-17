let  container=document.querySelector('.grid-container');
let  cells= document.querySelectorAll('.grid-cells');

container.addEventListener("click",function(evert){
    newColor='#'+Math.floor(Math.random()*16777215).toString(16);
    cells.forEach(function(cell){
        cell.style.background=newColor;
    })
});