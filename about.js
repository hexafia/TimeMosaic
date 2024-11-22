document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.querySelector('.intro-section').classList.add('animate-intro');
        document.querySelector('.box-section').classList.add('animate-boxes');
    }, 100);
});

function expandBox(box) {
    // Collapse any previously expanded box
    const expandedBox = document.querySelector('.expanded');
    if (expandedBox && expandedBox !== box) {
        expandedBox.classList.remove('expanded');
        expandedBox.remove();  // Remove the old expanded box
    }

    const title = box.getAttribute('data-title');
    const shortDescription = box.getAttribute('data-short-description');
    const description = box.getAttribute('data-description');

    // Create an expanded box element
    const expandedDiv = document.createElement('div');
    expandedDiv.classList.add('expanded');

    // Set the background image to the GIF of the clicked box
    const gifUrl = box.querySelector('img').src; // Assuming the GIF is in an <img> tag inside the box
    expandedDiv.style.backgroundImage = `url(${gifUrl})`; // Set the background image
    expandedDiv.style.backgroundSize = 'cover'; // Ensure the background covers the entire box
    expandedDiv.style.backgroundPosition = 'center'; // Center the background image

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.textContent = 'Close';

    // Close button functionality
    closeButton.onclick = function() {
        expandedDiv.remove();  // Remove the expanded box from the DOM
    };

    // Create a container for the text with a white background
    const textContainer = document.createElement('div');
    textContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Semi-transparent white background
    textContainer.style.padding = '20px'; // Add some padding
    textContainer.style.borderRadius = '10px'; // Rounded corners
    textContainer.style.color = 'black'; // Text color

    // Add content to the text container
    textContainer.innerHTML = `
        <h2>${title}</h2>
        <p>${shortDescription}</p>
        <p class="full-description">${description}</p>
    `;

    // Append the text container and close button to the expanded box
    expandedDiv.appendChild(textContainer);
    expandedDiv.appendChild(closeButton);  // Append the close button at the end

    // Append the expanded box to the body
    document.body.appendChild(expandedDiv);
}

document.addEventListener("DOMContentLoaded", function() {
    // Delay for the introduction animation
    setTimeout(() => {
        document.querySelector('.intro-section').classList.add('animate-intro');
    }, 100); // Delay for the intro section

    // Delay for the box section animation
    setTimeout(() => {
        document.querySelector('.box-section').classList.add('animate-boxes');
    }, 300); // Delay for the box section
});

