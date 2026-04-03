const inputField = document.getElementById('binary');
let binaryValue = "";

inputField.addEventListener('input', () => {
    const index = parseInt(inputField.value.length - 1);
    const current = inputField.value[index];

    if (isNaN(current) || current == " ") notifyUser();
    else if (current > 1) notifyUser();
    else binaryValue = inputField.value;
})

const notifyUser = () => { alert(`Digite somente 0's ou 1's`); inputField.value = binaryValue }