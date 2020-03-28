const container = document.getElementById('div-container')

function makeGrid(n){

	container.style.setProperty('--grid-rows', n);
 	container.style.setProperty('--grid-cols', n);

  	for (c = 0; c < (n * n); c++)
  	{
	    var cell = document.createElement("div");
	    id = 'gridbox' + c.toString()
	    cell.setAttribute('id', id)
	    cell.setAttribute('onmouseover', 'cursor()')
			container.appendChild(cell).className = "grid-item";
	}
}

function resize(){
	var curGrid = document.getElementsByClassName("grid-item")
	var newSize = document.getElementById("gridSize").value

	if (newSize == ""){
		return
	}

	// removes current divs and remakes grid
	for (var i = 0; i < curGrid.length; i++){
		curGrid[i].parentNode.removeChild(curGrid[i])
	}
	makeGrid(newSize)
	reset()
}

function cursor(){
	var temp = event.target.id
	var rainbowMode = document.getElementById('onoff').value
	if(rainbowMode == 'RAINBOW'){
		this.addEventListener('mouseover', rainbow(temp))
	}
	else{
		this.addEventListener('mouseover', darken(temp))
	}
}

function get_random_color(){
	return ('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
}

function rainbow(temp){
	let op = document.getElementById(temp).style.opacity;
	let randColor = get_random_color()

	document.getElementById(temp).style.opacity = 1
	document.getElementById(temp).style.background = randColor
}

function darken(temp){
	let op = document.getElementById(temp).style.opacity;
	let curColor = document.getElementById('color').value

	op = Number(op) + .1;
	document.getElementById(temp).style.opacity = op
	document.getElementById(temp).style.background = curColor
}

function reset(){
	var temp = document.getElementsByClassName("grid-item")

	for (var i = 0; i < temp.length; i++){
		temp[i].style.opacity = 0;
	}
}

function onoff(){
	var val = document.getElementById('onoff').value
	if (val == 'RAINBOW'){
		document.getElementById('onoff').value = 'NORMAL'
	}
	else{
		document.getElementById('onoff').value = 'RAINBOW'
	}
}

makeGrid(16)
