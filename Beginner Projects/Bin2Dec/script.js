const inputField = document.getElementById('binary');
let binaryValue = "";

if (inputField) {
    inputField.addEventListener('input', (event) => {
        const current = event.data;

        if (current == null || current == '0' || current == '1')
            binaryValue = inputField.value;
        else {
            notifyUser();
            inputField.value = binaryValue;
        }
    })

}

const notifyUser = () => alert(`Digite somente 0's ou 1's`);

