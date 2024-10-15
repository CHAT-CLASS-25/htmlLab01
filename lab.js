document.addEventListener("DOMContentLoaded", () => {
    const txtInput = document.querySelector("input");
    const btnSubmit = document.querySelector("button");
    const dvText = document.createElement("div");
    const guid = "f2b7c4e5-8b4e-4f2d-8d2c-2b6e6c1b0c6a";
    const ptspercontrol = 5;
    let totpts = 0;
    let rempts = 100;
    let output = "";
    if (!txtInput || !btnSubmit) {
        console.error("Missing input or button");
        return;
    }
    dvText.id = "__dvText";
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
        const arrControls = {
            "divs": document.querySelectorAll("div:not(div#__dvText):not(div#loom-companion-mv3)"),
            "spans": document.querySelectorAll("span"),
            "buttons": document.querySelectorAll('input[type="button"], button'),
            "text boxes": document.querySelectorAll('input[type="text"]'),
            "textareas": document.querySelectorAll("textarea"),
            "drop downs": document.querySelectorAll("select"),
            "paragraphs": document.querySelectorAll("p"),
            "links": document.querySelectorAll("a"),
            "tables": document.querySelectorAll("table"),
            "images": document.querySelectorAll("img"),
            "headings": document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
            "lists": document.querySelectorAll("ul, ol"),
            "forms": document.querySelectorAll("form"),
            "iframes": document.querySelectorAll("iframe"),
            "videos": document.querySelectorAll("video"),
            "audio": document.querySelectorAll("audio"),
            "embeds": document.querySelectorAll("embed")
        }
        const arrTextControls = ["divs", "spans", "textareas", "paragraphs", "headings"];
        let htBody = "";
    
        document.querySelectorAll("html > body *:not(script):not(style):not(div#__dvText):not(div#loom-companion-mv3)").forEach((node) => {
            htBody += node.outerHTML + "\n";
        })

        for (const [key, value] of Object.entries(arrControls)) {
            if (value.length) {
        
                if ((arrTextControls.includes(key) && (value[0].hasChildNodes() || value[0].innerText.trim() !== "")) || 
                    !arrTextControls.includes(key)) {
        
                    let pts = value.length * ptspercontrol > 15 ? 15 : value.length * ptspercontrol;
                    totpts += pts;
        
                    pts = rempts < 0 ? 0 : rempts < pts ? rempts : pts;
                    rempts -= pts;
        
                    output += `${key}: ${value.length} (${pts} points)\n`;
                }
            }
        }
        

        totpts = totpts > 100 ? 100 : totpts;

        console.clear();

        console.log(`Time: ${currTime} | ${guid} | ${dvText.textContent}` + "\n" + output + "\nTotal: " + totpts + " points" + "\n\n---------------------------------\nHTML body:\n\n" + htBody +"\n---------------------------------");
        alert("Lab complete! Copy the console log and paste it into your submission.");
    });
    observer.observe(dvText, { childList: true });
});
