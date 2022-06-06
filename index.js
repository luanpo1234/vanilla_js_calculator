console.log("Estamos aí");

const display = document.getElementById("display");
const buttons = Array.from(document.getElementsByClassName("button"));
//const operators = ["+", "-", "/", "*"];
const defaultVal = 0;
let numEls = [];
let display2Str = "";
let currOperator;
display.innerText = String(defaultVal);
let displayStr = display.innerText;
let operator = "";
let erase = false;

function solve(displayStr, operator, values) {
	values.push(Number(displayStr));
	val = handleOperator(operator, numEls);
	displayStr = String(val);
	numEls = [val];
	return [displayStr, numEls];
}
function handleOperator(operator, values) {
	let outVal;
	switch(operator){
	case "+":
		outVal = values[0] + values[1];
		values = outVal;
		return values;
		break;
	case "-":
		outVal = values[0] - values[1];
		values = outVal;
		return values;
		break;
	case "/":
		outVal = values[0] / values[1];
		values = outVal;
		return values;
		break;
	case "*":
		outVal = values[0] * values[1];
		values = outVal;
		return values;
		break;
	default:
		return 0;
		break;
	}
}

buttons.map( button => {
	button.addEventListener("click", e => {
		if (erase) {
			displayStr = "";
			erase = false;
		};
		switch(e.target.innerText){
			case "C":
				numEls = [];
				displayStr = String(defaultVal);
				display2Str = "";
				break;
			case "←":
				if (displayStr.length == 1){
					displayStr = String(defaultVal);
				} else {
					displayStr = displayStr.slice(0, -1);
				}
				break;
			case "+":
			case "-":
			case "/":
			case "*":
				operator = e.target.innerText;
				display2Str += displayStr;
				display2Str += ` ${operator} `;
				if(numEls.length > 0){
					let temp = solve(displayStr, operator, numEls);
					displayStr = temp[0];
					numEls = temp[1];
					console.log("should not erase");
				} else {
					numEls.push(Number(displayStr));
				};
				erase = true;
				break;
			case "=":
				display2Str += displayStr;
				display2Str += " = ";
				let temp = solve(displayStr, operator, numEls);
				displayStr = temp[0];
				numEls = [];
				break;
			default:
				//If display shows 0, replace str, else concatenate with text in e.
				displayStr === "0" ? displayStr = e.target.innerText : displayStr += e.target.innerText;
				break;
		}
		display.innerText = displayStr;
		display2.innerText = display2Str;
		console.log("clicked");
		console.log(e);
		console.log(e.target);
		console.log(e.target.innerText);
	});
});