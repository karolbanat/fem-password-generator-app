import './style.css';

interface PasswordOptions {
	length: number;
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeNumbers: boolean;
	includeSymbols: boolean;
}

/* constants */
const LOWERCASE_LETTERS: string = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_LETTERS: string = LOWERCASE_LETTERS.toUpperCase();
const NUMBERS: string = '1234567890';
const SYMBOLS: string = '~`!@#$%^&*()_-+={[}]|:;"\'<,>.?/';

/* elements */
const passwordOutput: HTMLOutputElement = document.querySelector('#generated-password')!;
const passwordGeneratorForm: HTMLFormElement = document.querySelector('#password-generator-form')!;
const lengthInput: HTMLInputElement = passwordGeneratorForm.querySelector('#password-length')!;
const lengthOutput: HTMLOutputElement = passwordGeneratorForm.querySelector('#password-length-output')!;
const uppercaseCheckbox: HTMLInputElement = passwordGeneratorForm.querySelector('#uppercase-letters')!;
const lowercaseCheckbox: HTMLInputElement = passwordGeneratorForm.querySelector('#lowercase-letters')!;
const numbersCheckbox: HTMLInputElement = passwordGeneratorForm.querySelector('#number-characters')!;
const symbolsCheckbox: HTMLInputElement = passwordGeneratorForm.querySelector('#symbol-characters')!;
const passwordGeneratorSubmit: HTMLButtonElement = passwordGeneratorForm.querySelector('button[type="submit"]')!;

/* event listeners */
lengthInput.addEventListener('input', _ => {
	lengthOutput.innerText = lengthInput.value;
});

passwordGeneratorSubmit.addEventListener('click', (e: Event) => {
	e.preventDefault();
	const length: number = Number(lengthInput.value);
	const includeUppercase: boolean = uppercaseCheckbox.checked;
	const includeLowercase: boolean = lowercaseCheckbox.checked;
	const includeNumbers: boolean = numbersCheckbox.checked;
	const includeSymbols: boolean = symbolsCheckbox.checked;

	passwordOutput.innerText = generatePassword({
		length,
		includeUppercase,
		includeLowercase,
		includeNumbers,
		includeSymbols,
	});
});

function generatePassword({
	length = 8,
	includeUppercase = true,
	includeLowercase = true,
	includeNumbers = false,
	includeSymbols = false,
}: PasswordOptions): string {
	let password = '';
	let chars: string = '';

	if (includeUppercase) chars += UPPERCASE_LETTERS;
	if (includeLowercase) chars += LOWERCASE_LETTERS;
	if (includeNumbers) chars += NUMBERS;
	if (includeSymbols) chars += SYMBOLS;

	/* if all options are passed as false, then generates password from uppercase and lowercase letters */
	if (chars === '') chars += UPPERCASE_LETTERS + LOWERCASE_LETTERS;

	for (let i = 0; i < length; i++) {
		password += chars[Math.floor(Math.random() * chars.length)];
	}

	return password;
}
