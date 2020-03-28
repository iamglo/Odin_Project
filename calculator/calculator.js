
addActions()
curVal = ""
curOperation = ""
figures = []


function addActions(){
	var keys = document.getElementsByClassName("key")
	var id = keys.id

	for (i = 0; i < keys.length; i++)
	{

		if (!isNaN(keys[i].innerHTML) || keys[i].innerHTML == '.')
		{
			keys[i].setAttribute('onclick', 'addNumber(this.id)')
		}
		else if (keys[i].innerHTML == 'DEL'){
			keys[i].setAttribute('onclick', 'del()')
		}
		else if (keys[i].innerHTML == 'AC'){
			keys[i].setAttribute('onclick', 'clean()')
		}
		else if (keys[i].innerHTML == '='){
			keys[i].setAttribute('onclick', 'calculate()')
		}
		else{
			keys[i].setAttribute('onclick', 'addOperator(this.id)')
		}
	}
}

function addNumber(id){
	var element = document.getElementById(id)
	curVal = curVal + element.innerHTML
	document.getElementById("output").innerHTML = curVal
}

function addOperator(id){
	var element = document.getElementById(id)
	if (figures.length < 1 && curVal != ""){
		figures.push(curVal)
		curOperation = element.innerHTML
		curVal = ""
	}
	else if (curVal == ""){
		return
	}
	else{
		calculate()
	}
}

function del(){
	curVal = curVal.substring(0, curVal.length-1)
	document.getElementById("output").innerHTML = curVal
}

function clean(){
	curVal = ""
	curOperation = ""
	figures = []
	document.getElementById("output").innerHTML = curVal
}

function calculate(){
	math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    'x': function (x, y) { return x * y },
    '/': function (x, y) { return x / y }}

	figures.push(curVal)

	if (figures.length > 1){
		num1 = parseFloat(figures.shift())
		num2 = parseFloat(figures.shift())
		calculatedVal = math_it_up[curOperation](num1, num2)

		document.getElementById("output").innerHTML = calculatedVal
		curVal = calculatedVal.toString()
	}
}
