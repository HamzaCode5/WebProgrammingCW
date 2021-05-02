const textBox = document.querySelector("#in");
const submitBtn = document.querySelector("#submit");

function save() {
    localStorage.setItem("savedText", textBox.value);
}

function save4() {
    localStorage.setItem("savedText", textBox.value);
}