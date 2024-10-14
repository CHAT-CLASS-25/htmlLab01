document.addEventListener("DOMContentLoaded", () => {
    const txtInput = document.querySelector("input");
    const btnSubmit = document.querySelector("button");
    const dvText = document.createElement("div");
    const guid = "f2b7c4e5-8b4e-4f2d-8d2c-2b6e6c1b0c6a";
    if (!txtInput || !btnSubmit) {
        console.error("Missing input or button");
        return;
    }
    dvText.id = "dvText";
    btnSubmit.insertAdjacentElement("afterend", dvText);
    btnSubmit.addEventListener("click", () => {
        const inputValue = txtInput.value.trim();
        if (inputValue) {
            dvText.textContent = inputValue;
            txtInput.value = "";
        } else {
            console.error("Missing input value");
        }
    });
    const observer = new MutationObserver(() => {
        const currTime = new Date().toLocaleTimeString();
        console.log(`Time: ${currTime} | ${guid} | ${dvText.textContent}`);
        alert("Lab complete! Copy the console log and paste it into your submission.");
    });
    observer.observe(dvText, { childList: true });
});
