/**
 * PURPOSE: To add buttons to hide or show the description, chat pane and/or the emojis which overlay the video
 * 
 * INSTRUCTIONS:
 * - Right click anywhere on the browser page, choose 'Inspect'
 * - Select the tab called 'Console'
 * - Paste all of this script into the console and press 'Enter'
 * - You'll see two buttons at the top of the screen to show/hide chat and emojis
 * 
 * - Any isssues contact: Daniel Aldous-Critchley (dan.aldouscritchley@servicenow.com)
 * 
**/


// Create a new div element for the button container
const containerDiv = document.createElement('div');

// Style the container div to be at the top and above other elements
Object.assign(containerDiv.style, {
    position: 'fixed', // Position relative to the viewport
    bottom: '0', // Place it at the bottom edge
    left: '50%', // Start 50% from the left
    transform: 'translateX(-50%)', // Shift back by half its width to center
    width: 'fit-content', // Make it only as wide as its content
    height: 'auto', // Make it only as tall as its content
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: add a semi-transparent background
    padding: '10px', // Optional: add some padding
    zIndex: '10000', // Ensure it's above most other content
    borderTopLeftRadius: '10px', // Add rounded top-left corner
    borderTopRightRadius: '10px' // Add rounded top-right corner
});

// Configuration for the buttons and their target elements
const buttonConfigs = [{
    text: 'Hide description 📕',
    targetClasses: 'tw-mt-4 tw-w-full tw-p-4'
}, {
    text: 'Hide chat 💬',
    targetClasses: 'tw-h-full tw-w-96 tw-bg-gray-900 tw-text-gray-300'
}, {
    text: 'Hide emojis 🙃',
    targetClasses: 'tw-absolute tw-inset-x-0 tw-bottom-0'
}];

// Loop through the button configurations and create a button for each
buttonConfigs.forEach(buttonConfig => {
    const button = document.createElement('button');
    button.textContent = buttonConfig.text;
    button.dataset.targetClasses = buttonConfig.targetClasses; // Use data attribute for target classes

    // Style the button
    Object.assign(button.style, {
        backgroundColor: 'green',
        color: 'white', // Text color
        marginRight: '10px', // Space between buttons
        padding: '5px 10px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '10px', // Add rounded top-left corner
    });

    // Add a click event listener to each button
    button.addEventListener('click', function () {
        const currentButton = this; // Reference to the clicked button
        const targetClasses = currentButton.dataset.targetClasses.split(' '); // Get target classes from data attribute

        // Determine the desired display style and new button text
        const isHiding = currentButton.textContent.startsWith('Hide');
        const newTextContent = isHiding ? currentButton.textContent.replace('Hide', 'Show') : currentButton.textContent.replace('Show', 'Hide');
        const newDisplayStyle = isHiding ? 'none' : 'block';

        // Find target elements by class names
        const elementsToToggle = document.getElementsByClassName(targetClasses.join(' '));

        // Toggle the display of each target element
        Array.from(elementsToToggle).forEach(el => {
            el.style.display = newDisplayStyle;
        });

        // Update the button's text content
        currentButton.textContent = newTextContent;
    });

    // Append the button to the container div
    containerDiv.appendChild(button);
});

//Create a close button to remove the div
const closeButton = document.createElement('button');
closeButton.textContent = '🅇';
containerDiv.appendChild(closeButton);
closeButton.addEventListener('click', function () {
    containerDiv.remove();
});

// Append the container div to the body of the document
document.body.appendChild(containerDiv);
