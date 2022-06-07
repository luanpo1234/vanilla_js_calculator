/*jshint esversion: 6 */

function main() {

	const operandStrings = {
		add: "+",
		sub: "-",
		div: "÷",
		mult: "×",
		abs: "|x|",
		equal: "=",
		clear: "C",
		delete: "←"
	};
	const validKeys = {
		"1": "1",
		"2": "2",
		"3": "3",
		"4": "4",
		"5": "5",
		"6": "6",
		"7": "7",
		"8": "8",
		"9": "9",
		"0": "0",
		".": ".",
		"=": operandStrings.equal,
		"Enter": operandStrings.equal,
		"-": operandStrings.sub,
		"+": operandStrings.add,
		"/": operandStrings.div,
		"*": operandStrings.mult,
		"Escape": operandStrings.clear,
		"Backspace": operandStrings.delete
	};
	const display = document.getElementById("display");
	const display2 = document.getElementById("display2");
	const buttons = Array.from(document.getElementsByClassName("button"));
	const defaultVal = 0;
	let operands = [];
	let display2Str = "";
	display.innerText = String(defaultVal);
	let displayStr = display.innerText;
	let operator = "";
	let erase = false;

	function solve(displayStr, operator, values) {
		if (!operator || values.length === 0) {
			return [displayStr, values];
		}
		if (displayStr != display.innerText) {
			return [display.innerText, values];
		}
		values.push(Number(displayStr));
		let val = handleOperator(operator, operands);
		displayStr = String(val);
		if (isNaN(val)) {
			operands = [];
			erase = true;
		} else {
			operands = [val];
		}
		return [displayStr, operands];
	}

	function handleOperator(operator, values) {
		if (values.filter(elmt => isNaN(elmt)).length > 0) {
			return "Invalid values!";
		}
		if (values.length < 2) {
			return values[0];
		}
		let outVal;
		switch (operator) {
			case operandStrings.add:
				outVal = values[0] + values[1];
				break;
			case operandStrings.sub:
				outVal = values[0] - values[1];
				break;
			case operandStrings.div:
				if (Math.abs(values[1]) === 0) {
					return "Cannot divide by zero!";
				}
				outVal = values[0] / values[1];
				break;
			case operandStrings.mult:
				outVal = values[0] * values[1];
				break;
			default:
				break;
		}
		return outVal;
	}

	function resetVals() {
		operands = [];
		displayStr = String(defaultVal);
		display2Str = "";
	}

	function handleKey(k) {
		console.log(operator);
		//displayStr = display.innerText;
		{
			if (erase) {
				displayStr = "";
				erase = false;
			}
			operands.filter(elmt => !isNaN(elmt));
			switch (k) {
				case operandStrings.clear:
					resetVals();
					break;
				case operandStrings.delete:
					if (displayStr.length == 1) {
						displayStr = String(defaultVal);
					} else {
						displayStr = displayStr.slice(0, -1);
					}
					break;
				case "π":
					displayStr = String(Math.PI);
					break;
				case operandStrings.abs:
					if (!isNaN(displayStr)) {
						displayStr = String(Math.abs(Number(displayStr)));
					}
					break;
				case operandStrings.add:
				case operandStrings.div:
				case operandStrings.sub:
				case operandStrings.mult:
					display2Str += displayStr;
					if (operands.length === 1) {
						let temp = solve(displayStr, operator, operands);
						displayStr = temp[0];
						operands = temp[1];
					} else {
						operands.push(Number(displayStr));
					}
					console.log(`Operands: ${operands}`);
					operator = k;
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
					if (display.innerText.includes(".")) {
						break;
					}
				default:
					//If display shows 0, replace str, else concatenate with k.
					displayStr === "0" ? displayStr = k : displayStr += k;
					break;
			}
			display.innerText = displayStr;
			display2.innerText = display2Str;
			console.log("clicked");
		}
	}

	document.addEventListener('keydown', e => {
		let key = e.key;
		console.log(key);
		if (validKeys[key]) {
			handleKey(validKeys[key]);
		} else {
			console.log("Invalid key.");
		}
	}, false);

	buttons.map(button => {
		button.addEventListener("click", e => {
			handleKey(e.target.innerText);
		});
	});
}

main();