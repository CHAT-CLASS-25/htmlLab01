export function onDOMLoaded(){
    document.addEventListener("DOMContentLoaded",()=>{

        console.log ("Script file linked correctly! Good job");

        const txtInput = document.querySelector("input");
        const btnSubmit = document.querySelector("button, input[type='submit'], input[type='button']");
        const dvText = document.createElement("div");
        const guid = "f2b7c4e5-8b4e-4f2d-8d2c-2b6e6c1b0c6a";
        const maxpts = 75;
        const ptspercontrol = 5;
        let totpts = 0;
        let rempts = maxpts;
        let output = "";

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

        // Define control elements and their respective selectors
        const arrControls = {
            "divs": () => document.querySelectorAll("div:not(div#__dvText):not(div#loom-companion-mv3)"),
            "spans": () => document.querySelectorAll("span"),
            "buttons": () => document.querySelectorAll('input[type="button"], button'),
            "text boxes": () => document.querySelectorAll('input[type="text"]'),
            "textareas": () => document.querySelectorAll("textarea"),
            "drop downs": () => document.querySelectorAll("select"),
            "paragraphs": () => document.querySelectorAll("p"),
            "links": () => document.querySelectorAll("a"),
            "tables": () => document.querySelectorAll("table"),
            "images": () => document.querySelectorAll("img"),
            "headings": () => document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
            "lists": () => document.querySelectorAll("ul, ol"),
            "forms": () => document.querySelectorAll("form"),
            "iframes": () => document.querySelectorAll("iframe"),
            "videos": () => document.querySelectorAll("video"),
            "audio": () => document.querySelectorAll("audio"),
            "embeds": () => document.querySelectorAll("embed")
        };

        // Controls that should be filtered based on their inner content
        const arrTextControls = ["divs", "spans", "textareas", "paragraphs", "headings"];

        // Observe changes to the div and calculate points based on visible controls
        const observer = new MutationObserver(() => {
            const currTime = new Date().toLocaleTimeString();
            let htBody = "";

            // Collect HTML of body excluding certain tags
            document.querySelectorAll("html > body *:not(script):not(style):not(div#__dvText):not(div#loom-companion-mv3)").forEach(node => {
                htBody += node.outerHTML + "\n";
            });

            // Helper function to check if an element has meaningful content
            const hasContent = (el) => {
                return (el.textContent && el.textContent.trim() !== "") || Array.from(el.childNodes).some(child => {
                    return child.nodeType !== Node.TEXT_NODE || (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== "");
                });
            };

            // Loop through each control and calculate points
            for (const [key, getControls] of Object.entries(arrControls)) {
                const elements = getControls();
                const validElements = arrTextControls.includes(key) ? Array.from(elements).filter(hasContent) : elements;

                if (validElements.length) {
                    let pts = Math.min(validElements.length * ptspercontrol, 15);
                    totpts += pts;
                    pts = Math.min(Math.max(rempts, 0), pts);
                    rempts -= pts;
                    output += `${key}: ${validElements.length} (${pts} points)\n`;
                }
            }

            // Cap total points at maxpts
            totpts = Math.min(totpts, maxpts);

            // Clear console and log results
            console.clear();
            console.log(`Time: ${currTime} | ${guid} | ${dvText.textContent}\n${output}\nTotal: ${totpts} points\n\n---------------------------------\nHTML body:\n\n${htBody}\n---------------------------------`);

            // Alert the user to copy the console log
            alert("Lab complete! Copy the console log and paste it into your submission.");
        });

        // Start observing changes to the dvText element
        observer.observe(dvText, { childList: true });

    })

}

export function myNewFunc(){
    alert("My new function is ready!")
}