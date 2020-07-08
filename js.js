
width = 100;
height = 100;
var space;
var spaceCp;
board = document.getElementById('board');
var bornMin=1, bornMax=3, dieMax=2;
var cellSize, cellSizeP;
var intId;
drawBoard();

function drawBoard(){	
	width = parseInt(document.getElementById("width").value);
	height = parseInt(document.getElementById("height").value);
	bHeight =  window.innerHeight-4*board.offsetTop;
	if (window.innerWidth > bHeight){
		board.style["width"] = bHeight + 'px';
		board.style["height"] = bHeight+ 'px';
		cellSize = window.innerHeight / height  ;
	}
	else{
		board.style["width"] = window.innerWidth + 'px';
		board.style["height"] = window.innerWidth + 'px';
		cellSize = window.innerWidth / width  ;
	}
	cellSizeP = cellSize + 'px';
	space = new	Array(height);
	spaceCp = new Array(height);
	board.innerHTML = '';	
//	board.style['grid-template-columns']= 'repeat(' + width +', 1fr)';
//	board.style['grid-template-rows']= 'repeat(' + width +', 1fr)';
	for ( i=0; i < height; i++){
		space[i]= new Array(width)
		spaceCp[i]= new Array(width)
		space[i]= new Array(width).fill(0);
		spaceCp[i]= new Array(width).fill(0);
	}
	
	for (i=0; i < height; i++)
	{
		for(j=0; j<width; j++)
		{
			var cell = document.createElement("div");
			cell.id = i* width + j ;
			cell.className = "cell";
			cell.style['width'] = cellSizeP;
			cell.style['height'] = cellSizeP;
			cell.style['top'] = i*cellSize;
			cell.style['left'] = j*cellSize;
			cell.setAttribute("onclick","reverseCell(this);");
			board.appendChild(cell);
		}
	}

}

function updateRule(){
	bornMin = document.getElementById("bornMin").value;
	bornMax = document.getElementById("bornMax").value;
	dieMax = document.getElementById("dieMax").value;
}

function copySpace(){
	for (i = 1; i< height-1; i++){
		for (j = 1; j< width-1; j++){
			spaceCp[i][j] = space[i][j];
		}
	}
}
function reverseCell(inp)
{
	x = inp.id % width;
	y = Math.floor(inp.id / width);
	if (space[y][x] == 0){
		space[y][x] = 1;
		inp.style['background-color'] = "#fa0";
	}
	else{
		space[y][x] = 0;
		inp.style['background-color'] = "#04f";
	}
}

function nextStep(){
	copySpace();
	for (i = 1; i< height-1; i++){
		for (j = 1; j< width-1; j++){
			sum = spaceCp[i-1][j-1] + spaceCp[i-1][j] + spaceCp[i-1][j+1] + spaceCp[i][j-1] + spaceCp[i][j+1] + spaceCp[i+1][j-1] + spaceCp[i+1][j] + spaceCp[i+1][j+1] ;
			if (spaceCp[i][j] > 0){
				if (sum >= dieMax){
					space[i][j] = 0;
					document.getElementById(i*width + j).style['background-color'] = "#04f";
				}
			}
			else{
				if (sum >= bornMin && sum <= bornMax){
					space[i][j] = 1;
					document.getElementById(i*width +j).style['background-color'] = "#fa0";
				}
			}
		}
	}
}

function play(){
	intv = document.getElementById("interval").value;
	intId = setInterval(nextStep, intv);
}

function stop(){
	clearInterval(intId);
}
