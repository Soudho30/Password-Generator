const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lengthInput = document.getElementById('length-input');
const uppercaseCb = document.getElementById('uppercase-cb');
const lowercaseCb = document.getElementById('lowercase-cb');
const numbersCb = document.getElementById('numbers-cb');
const symbolsCb = document.getElementById('symbols-cb');
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
function generatePassword() {
    let length = parseInt(lengthInput.value);
    if (isNaN(length) || length < 4) length = 4;
    if (length > 50) length = 50;
    lengthInput.value = length;
    let allowedPool = "";
    let forcedCharacters = [];
    if (uppercaseCb.checked) {
        allowedPool += uppercaseChars;
        forcedCharacters.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
    }
    if (lowercaseCb.checked) {
        allowedPool += lowercaseChars;
        forcedCharacters.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
    }
    if (numbersCb.checked) {
        allowedPool += numberChars;
        forcedCharacters.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    }
    if (symbolsCb.checked) {
        allowedPool += symbolChars;
        forcedCharacters.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
    }
    if (allowedPool === "") {
        passwordDisplay.value = "Select at least 1 option";
        return;
    }
    let generatedPassword = [...forcedCharacters];
    const remainingLength = length - forcedCharacters.length;
    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedPool.length);
        generatedPassword.push(allowedPool[randomIndex]);
    }
    generatedPassword = generatedPassword.sort(() => Math.random() - 0.5);
    passwordDisplay.value = generatedPassword.join('');
}
async function copyToClipboard() {
    const password = passwordDisplay.value;
    if (!password || password === "Click Generate..." || password === "Select at least 1 option") return;
    try {
        await navigator.clipboard.writeText(password);
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i class="fa-solid fa-check" style="color: #10b981;"></i>`;
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 1500);
    } catch (err) {
        console.error("Failed to copy password: ", err);
    }
}
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);