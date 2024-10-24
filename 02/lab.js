export function onDOMLoaded(){
    document.addEventListener("DOMContentLoaded",()=>{

        console.log ("Script file linked correctly! Good job");

        // create const variables for textbox, button, and div
        const txtInput = document.querySelector("input");
        const btnSubmit = document.querySelector("button, input[type='submit'], input[type='button']");
        const dvText = document.createElement("div");

        // Check for missing input or button
        if (!txtInput || !btnSubmit) {
            console.error("Missing input or button");
            return;
        }

        // Set up the div to display the text input
        dvText.id = "__dvText";
        btnSubmit.insertAdjacentElement("afterend", dvText);

        // Handle button click event
        btnSubmit.addEventListener("click", () => {
            const inputValue = txtInput.value.trim();
            if (inputValue) {
                dvText.textContent = inputValue;
                txtInput.value = "";
            } else {
                console.error("Missing input value");
            }
        });

        // Display alert message with current time and textbox entry when user clicks button while holding the Shift key
        // btnSubmit.addEventListener("keydown", (event) => {
        //     if (event.shiftKey) {
        //         const currTime = new Date().toLocaleTimeString();
        //         alert(`Time: ${currTime} | ${dvText.textContent}`);
        //     }
        // })

        // Start observing changes to the dvText element
        observer.observe(dvText, { childList: true });

    }) 

}
