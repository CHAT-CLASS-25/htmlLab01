document.addEventListener('DOMContentLoaded', () => {
    // Set const variables for the input box, button, and the div to display the text value
    const txtInput = document.querySelector('input');
    const btnSubmit = document.querySelector('button');
    const dvText = document.createElement('div');
    const guid = 'f2b7c4e5-8b4e-4f2d-8d2c-2b6e6c1b0c6a';
    const currTime = new Date().toLocaleTimeString();
    dvText.id = 'dvText';
    
    // Check to make sure elements exist
    if (txtInput && btnSubmit) {
        // Attach div to the DOM right after the button
        btnSubmit.insertAdjacentElement('afterend', dvText);
        
        // Add click event listener to the button
        btnSubmit.addEventListener('click', () => {
            if (txtInput.value) {
                dvText.innerHTML = txtInput.value;
                // Clear the input box
                txtInput.value = '';
            } else {
                console.error('Missing input value');
            }
        });
    
    } else {
        console.error('Missing input or button');
    }
    
    // Add click event listener to the div to log the current time and guid to the console when the value is updated
    dvText.addEventListener('DOMSubtreeModified', () => {
        console.log(`Time: ${currTime} | ${guid} | ${dvText.innerHTML}`);
    
        // alert the user that the value has been updated
        alert('Lab complete! Copy the console log and paste it into your submission.');
    });
})