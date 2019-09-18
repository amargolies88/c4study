var guiGrid = document.getElementById('guiGrid');
var playerText = document.getElementById('playerText');
var player = 1;
var victoryText = document.getElementById('victoryText');
var ctx = guiGrid.getContext('2d');
var masterGrid = [[],[],[],[],[],[],[]];
var scoreP1 = 0;
var scoreP2 = 0;
var scoreTextP1 = document.getElementById('scoreTextP1');
var scoreTextP2 = document.getElementById('scoreTextP2');

var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var b3 = document.getElementById('b3');
var b4 = document.getElementById('b4');
var b5 = document.getElementById('b5');
var b6 = document.getElementById('b6');
var b7 = document.getElementById('b7');

guiGrid.width = 800;

drawGrid();

function bigExec(slot){
	for (i = 6; i > 0; i--){
		if (masterGrid[slot-1][i-1] == "empty"){
				var xPos = (((slot*2)-1)/14)*guiGrid.width;	//horizontal center of chip to draw
				var yPos = (((i*2)-1)/12)*guiGrid.height;	//vertical center of chip to draw
				drawChip(xPos, yPos);
				masterGrid[slot-1][i-1] = player;
				victoryCheck(slot-1, i-1);
				switchPlayer();
				break;
		}
	}	
}

function victoryCheck(cx,cy){
	var hPoints = 1;	// Horizontal
	var vPoints = 1;	// Vertical
	var dpPoints = 1;	// Diagnol Positive (/)
	var dnPoints = 1;	// Diagnol Negative (\)

	//Victory Check Left
	for (i = (cx-1); i >= 0; i--){
		if (masterGrid[i][cy]==player){
			hPoints++;
			//alert("pointsbruh " + hPoints); //test if points are applying
		}else{
			break;
		}
	}

	//Victory Check Right
	for (i = (cx+1); i <= 6; i++){
		if (masterGrid[i][cy]==player){
			hPoints++;
		}else{
			break;
		}
	}

	//Victory Check Down
	if (cy < 3){	//Only check if chip lands in top 3 rows 'cause gravity and collision and stuff.
		for (i = cy; i < 5; i++){
			if (masterGrid[cx][i+1]==player){
				vPoints++;
			}else{
				break;
			}
		}
	}

	//Victory Check Diagnol Positive Up (^ /)
	for (i = (cx+1), j = (cy-1); (i <= 6) && (j >= 0); i++, j--){
		if (masterGrid[i][j] == player){
			dpPoints++;
		}else{
			break;
		}
	}

	//Victory Check Diagnol Positve Down (v /)
	for (i = (cx-1), j = (cy+1); (i >= 0) && (j <= 5); i--, j++){
		if (masterGrid[i][j] == player){
			dpPoints++;
		}else{
			break;
		}
	}

		//Victory Check Diagnol Negative Up (^ \)
	for (i = (cx-1), j = (cy-1); (i >= 0) && (j >= 0); i--, j--){
		if (masterGrid[i][j] == player){
			dnPoints++;
		}else{
			break;
		}
	}

	//Victory Check Diagnol Negative Down (v \)
	for (i = (cx+1), j = (cy+1); (i <= 6) && (j <= 5); i++, j++){
		if (masterGrid[i][j] == player){
			dnPoints++;
		}else{
			break;
		}
	}
	
	if (hPoints >= 4 || vPoints >= 4 || dpPoints >= 4 || dnPoints >= 4){
		winner(player);
	}
}

//Displays winner, updates, score, restarts match
function winner(x){
	victoryText.innerHTML ="Player " + x + " WON!!!";
	if (x == 1){
		scoreP1++;
		scoreTextP1.innerHTML = "Player 1 Score: " + scoreP1;
	}else{
		scoreP2++;
		scoreTextP2.innerHTML = "Player 2 Score: " + scoreP2;
	}
	alert("PLAYER " + x + " VICTORY!!!");
	player = 2; //sets player to 2 because bigExec switches player (maybe better way to do this?)
	drawGrid();
}

b1.onclick = function(){
	bigExec(1);
};
b2.onclick = function(){
	bigExec(2);
};
b3.onclick = function(){
	bigExec(3);
};
b4.onclick = function(){
	bigExec(4);
};
b5.onclick = function(){
	bigExec(5);
};
b6.onclick = function(){
	bigExec(6);
};
b7.onclick = function(){
	bigExec(7);
};

//Switches player variable and updates turn display
function switchPlayer(){
	if (player == 1){
		playerText.innerHTML = "Turn: Player 2";
		player = 2;
	}else{
		playerText.innerHTML = "Turn: Player 1";
		player = 1;
	}
}

function drawChip(x, y){
	ctx.beginPath();
	if ((guiGrid.width / guiGrid.height) <= (7/6)){
		ctx.arc( x, y, ((1/14)*guiGrid.width)-2, 0, 2 * Math.PI, false);
	}else{
		ctx.arc( x, y, ((1/12)*guiGrid.height)-2, 0, 2 * Math.PI, false);	
	}
	ctx.lineWidth = 1;
	if (player == 1){
		ctx.fillStyle = 'red';
	}else{
		ctx.fillStyle = 'black';
	}
	ctx.fill();
}

function drawWhiteChip(x, y){
	ctx.beginPath();
	if ((guiGrid.width / guiGrid.height) <= (7/6)){
		ctx.arc( x, y, ((1/14)*guiGrid.width)-1, 0, 2 * Math.PI, false);
	}else{
		ctx.arc( x, y, ((1/12)*guiGrid.height)-1, 0, 2 * Math.PI, false);
	}
	ctx.lineWidth = 3;
	ctx.fillStyle = 'white';
	ctx.fill();
}

function drawGrid(){

	if (guiGrid.getContext){
		//Draw horizontal lines
		for (i=1; i<=5; i++){
			//alert("test " + i);
			ctx.beginPath();
			ctx.moveTo(0, guiGrid.height * (i/6));
			ctx.lineTo(guiGrid.width, guiGrid.height * (i/6));
			ctx.stroke();
		}

		//Draw vertical lines
		for (i=1; i<=6; i++){
			//alert("test " + i);
			ctx.beginPath();
			ctx.moveTo((i/7) * guiGrid.width, 0);
			ctx.lineTo((i/7) * guiGrid.width, guiGrid.height);
			ctx.stroke();
		}

		//Fill with white circles and reset array
		for (a = 1; a <= 6; a++){
			for (i = 1; i <= 7; i++){
					
				var xPos = (((i*2)-1)/14)*guiGrid.width;
				var yPos = (((a*2)-1)/12)*guiGrid.height;
				drawWhiteChip(xPos, yPos);
				masterGrid[i-1][a-1] = "empty";
			}
		}
	}
}