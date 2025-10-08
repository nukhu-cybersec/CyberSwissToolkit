// CryptoSteg - Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabs();
    initSteganography();
    initCiphers();
    initHashing();
    initPasswordTools();
    initEnigmaMachine();
    
    // Set current date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Update the date and time display
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 8);
    document.getElementById('current-time').textContent = `${dateStr} ${timeStr} UTC`;
    document.getElementById('current-date').textContent = dateStr;
}

// Initialize tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Activate selected tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Helper functions
function showNotification(element, message) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    // If the element already has a notification, remove it
    const existingNotification = element.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Add the new notification
    element.appendChild(notification);
    
    // Remove the notification after animation completes
    setTimeout(() => {
        notification.remove();
    }, 1500);
}

async function copyToClipboard(text, element, message = 'Copied!') {
    try {
        await navigator.clipboard.writeText(text);
        showNotification(element.parentNode, message);
    } catch (err) {
        console.error('Failed to copy: ', err);
        showNotification(element.parentNode, 'Copy failed!');
    }
}

// ============= STEGANOGRAPHY MODULE =============
function initSteganography() {
    // Image upload areas
    const encodeUploadArea = document.getElementById('image-upload-area');
    const decodeUploadArea = document.getElementById('decode-upload-area');
    const encodeInput = document.getElementById('image-input');
    const decodeInput = document.getElementById('decode-image-input');
    const previewImageEncode = document.getElementById('preview-image-encode');
    const previewImageDecode = document.getElementById('preview-image-decode');
