const element = document.getElementById('telNo');

const maskOptions = { mask: '(00)0' };
const mask = IMask(element, maskOptions);

element.addEventListener("input", (evt) => {
    if (evt.target.value.indexOf(')9') !== -1) {
        mask.updateOptions({mask: '(00)00000-0000'})
    } else {
        mask.updateOptions({mask: '(00)0000-0000'})
    }
});
