
width = 100;
height = 100;
var space = new	Array(height);
var spaceCp = new Array(height);
board = document.getElementById('board');
board.style['grid-template-columns']= 'repeat(' + width +', 1fr)';

function copySpace(){
	for (i = 1; i< height-1; i++){
		for (j = 1; j< width-1; j++){
			spaceCp[i][j] = space[i][j];
		}
	}
}
function reverseCell(inp)
{
	x = inp.id % 100;
	y = Math.floor(inp.id / 100);
	if (space[y][x] == 0){
		space[y][x] = 1;
		inp.style['background-color'] = "#ff0";
	}
	else{
		space[y][x] = 0;
		inp.style['background-color'] = "#689";
	}
}

function timeLoop(){
	copySpace();
	for (i = 1; i< height-1; i++){
		for (j = 1; j< width-1; j++){
			sum = spaceCp[i-1][j-1] + spaceCp[i-1][j] + spaceCp[i-1][j+1] + spaceCp[i][j-1] + spaceCp[i][j+1] + spaceCp[i+1][j-1] + spaceCp[i+1][j] + spaceCp[i+1][j+1] ;
			if (spaceCp[i][j] > 0){
				if (sum >4){
					space[i][j] = 0;
					document.getElementById(i*width + j).style['background-color'] = "#689";
				}
			}
			else{
				if (sum > 1 && sum <5){
					space[i][j] = 1;
					document.getElementById(i*width +j).style['background-color'] = "#ff0";
				}
			}
		}
	}
}

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
		//cell.addEventListener('click',reverseCell);
		cell.setAttribute("onclick","reverseCell(this);");
		board.appendChild(cell);
	}
}

