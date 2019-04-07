function draw()
{
	var canvas = document.getElementById('circle');

	if (canvas.getContext){
		var ctx = canvas.getContext('2d'); 
		/*
		var X = canvas.width / 2;
		var Y = canvas.height / 2;
		var R = 5;
		
		ctx.beginPath();
		ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
		ctx.lineWidth = 3;
		ctx.fillStyle = '#000000';
		ctx.fill();
		*/
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(0, canvas.width);
		ctx.lineTo(canvas.height, canvas.width);
		ctx.lineTo(canvas.height, 0);
		ctx.lineTo(0,0);
		ctx.stroke();

		//Draw horizontal lines
		for (i=1; i<=5; i++){
			//alert("test " + i);
			ctx.beginPath();
			ctx.moveTo(0, canvas.height * (i/6));
			ctx.lineTo(canvas.width, canvas.height * (i/6));
			ctx.stroke();
		}

		//Draw vertical lines
		for (i=1; i<=6; i++){
			//alert("test " +i);
			ctx.beginPath();
			ctx.moveTo((i/7) * canvas.width, 0);
			ctx.lineTo((i/7) * canvas.width, canvas.height);
			ctx.stroke();
		}

		//Draw circles in grid
		for (a = 1; a <= 6; a++){
			for (i = 1; i <= 7; i++){

				ctx.beginPath();
				alert("shush" + i + ", " + a);
				ctx.arc( (((i*2)-1)/14)*canvas.width, (((a*2)-1)/12)*canvas.height, ((1/14)*canvas.width)-1, 0, 2 * Math.PI, false);
				ctx.lineWidth = 2;
				ctx.fillStyle = '#000000';
				ctx.fill();
			}
		}
	}
}