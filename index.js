console.log("Estamos aí");

const display = document.getElementById("display");
const buttons = Array.from(document.getElementsByClassName("button"));
//const operators = ["+", "-", "/", "*"];
const defaultVal = 0;
let operands = [];
let display2Str = "";
let currOperator;
display.innerText = String(defaultVal);
let displayStr = display.innerText;
let operator = "";
let erase = false;

function solve(displayStr, operator, values) {
	if (!operator || values.length === 0) {
		return [displayStr, values];
	}
	values.push(Number(displayStr));
	val = handleOperator(operator, operands);
	displayStr = String(val);
	operands = [val];
	return [displayStr, operands];
}
function handleOperator(operator, values) {
	switch(operator){
	case "+":
		outVal = values[0] + values[1];
		break;
	case "-":
		outVal = values[0] - values[1];
		break;
	case "/":
		outVal = values[0] / values[1];
		break;
	case "*":
		outVal = values[0] * values[1];
		break;
	default:
		break;
	};
	return outVal;
}

buttons.map( button => {
	button.addEventListener("click", e => {
		if (erase) {
			displayStr = "";
			erase = false;
		};
		switch(e.target.innerText){
			case "C":
				operands = [];
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
				display2Str += displayStr;
				if(operands.length > 0){
					let temp = solve(displayStr, operator, operands);
					displayStr = temp[0];
					operands = temp[1];
					console.log("should not erase");
				} else {
					operands.push(Number(displayStr));
				};
				operator = e.target.innerText;
				display2Str += ` ${operator} `;
				erase = true;
				break;
			case "=":
				display2Str += displayStr;
				display2Str += " = ";
				let temp = solve(displayStr, operator, operands);
				displayStr = temp[0];
				operands = [];
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