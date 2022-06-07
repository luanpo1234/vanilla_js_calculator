function main (){

	const operandStrings = {
		add : "+",
		sub : "-",
		div : "÷",
		mult : "×",
		abs : "|x|",
		equal : "="
	};
	const display = document.getElementById("display");
	const buttons = Array.from(document.getElementsByClassName("button"));
	const defaultVal = 0;
	let operands = [];
	let display2Str = "";
	//let currOperator;
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
		if (isNaN(val)){
			operands = [];
			erase = true;
		} else {
			operands = [val];
		};
		return [displayStr, operands];
	}

	function handleOperator(operator, values) {
		if (values.filter(elmt => isNaN(elmt)).length > 0){
			return "Invalid values!";
		}
		switch(operator){
		case operandStrings.add:
			outVal = values[0] + values[1];
			break;
		case operandStrings.sub:
			outVal = values[0] - values[1];
			break;
		case operandStrings.div:
			if (Math.abs(values[1]) === 0) {
				return "Cannot divide by zero!";
			};
			outVal = values[0] / values[1];
			break;
		case operandStrings.mult:
			outVal = values[0] * values[1];
			break;
		default:
			break;
		};
		return outVal;
	}

	function resetVals() {
		operands = [];
		displayStr = String(defaultVal);
		display2Str = "";
	}

	buttons.map( button => {
		button.addEventListener("click", e => {
			if (erase) {
				displayStr = "";
				erase = false;
			};
			console.log(`operands before: ${operands}`);
			operands.filter(elmt => !isNaN(elmt));
			console.log(`operands after: ${operands}`);
			switch(e.target.innerText){
				case "C":
					resetVals();
					break;
				case "←":
					if (displayStr.length == 1){
						displayStr = String(defaultVal);
					} else {
						displayStr = displayStr.slice(0, -1);
					}
					break;
				case "π":
					displayStr = String(Math.PI);
					break;
				case operandStrings.abs:
					if (!isNaN(displayStr)){
						displayStr = String(Math.abs(Number(displayStr)));
					};
					break;
				case operandStrings.add:
				case operandStrings.div:
				case operandStrings.sub:
				case operandStrings.mult:
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
				case operandStrings.equal:
					display2Str += displayStr;
					//display2Str += " = ";
					display2Str = "";
					let temp = solve(displayStr, operator, operands);
					displayStr = temp[0];
					operands = [];
					break;
				case ".":
					if (display.innerText.includes(".")){
						break;
					};
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
};

main();