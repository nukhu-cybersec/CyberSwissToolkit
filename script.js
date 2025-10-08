// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigationAndTabs();
    initCipherTools();
    initModernEncryption();
    initHashingTools();
    initPasswordTools();
    initEnigmaMachine();
    initSteganography();
    
    // Add copy functionality to all copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.previousElementSibling.id;
            const textToCopy = document.getElementById(targetId).value;
            copyToClipboard(textToCopy);
            
            // Show feedback
            const originalText = this.textContent;
            this.textContent = "Copied!";
            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);
        });
    });
    
    // Add clear functionality to all clear buttons
    document.querySelectorAll('.clear-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Get the parent tool content
            const toolContent = this.closest('.tool-content');
            
            // Clear all inputs and outputs in this tool
            toolContent.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), textarea').forEach(el => {
                el.value = '';
            });
            
            // Reset radio buttons to default
            toolContent.querySelectorAll('input[type="radio"]').forEach(radio => {
                if (radio.hasAttribute('checked')) {
                    radio.checked = true;
                }
            });
            
            // Reset checkboxes to default
            toolContent.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (checkbox.hasAttribute('checked')) {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            });
            
            // Clear any result displays or strength indicators
            const strengthIndicator = toolContent.querySelector('.strength-indicator');
            if (strengthIndicator) {
                strengthIndicator.style.width = '0';
                strengthIndicator.style.backgroundColor = '#eee';
            }
            
            const strengthText = toolContent.querySelector('.strength-text');
            if (strengthText) {
                strengthText.textContent = 'Password strength will appear here';
            }
            
            const strengthDetails = toolContent.querySelector('.strength-details');
            if (strengthDetails) {
                strengthDetails.innerHTML = '';
            }
        });
    });
});

// Navigation and Tabs
function initNavigationAndTabs() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
    
    // Tab switching within tool sections
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Get parent tool container
            const toolContainer = this.closest('.tool-container');
            
            // Remove active class from all buttons in this container
            toolContainer.querySelectorAll('.tool-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tool contents in this container
            toolContainer.querySelectorAll('.tool-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the target content
            const targetId = this.getAttribute('data-tool');
            const targetContent = document.getElementById(targetId);
            targetContent.classList.add('active');
        });
    });
}

// Classical Cipher Tools
function initCipherTools() {
    // Caesar Cipher
    if (document.getElementById('caesar-encrypt')) {
        document.getElementById('caesar-encrypt').addEventListener('click', function() {
            const input = document.getElementById('caesar-input').value;
            const shift = parseInt(document.getElementById('caesar-shift').value);
            document.getElementById('caesar-output').value = caesarCipher(input, shift);
        });
        
        document.getElementById('caesar-decrypt').addEventListener('click', function() {
            const input = document.getElementById('caesar-input').value;
            const shift = parseInt(document.getElementById('caesar-shift').value);
            document.getElementById('caesar-output').value = caesarCipher(input, (26 - shift) % 26);
        });
    }
    
    // Vigenère Cipher
    if (document.getElementById('vigenere-encrypt')) {
        document.getElementById('vigenere-encrypt').addEventListener('click', function() {
            const input = document.getElementById('vigenere-input').value;
            const key = document.getElementById('vigenere-key').value;
            document.getElementById('vigenere-output').value = vigenereCipher(input, key, true);
        });
        
        document.getElementById('vigenere-decrypt').addEventListener('click', function() {
            const input = document.getElementById('vigenere-input').value;
            const key = document.getElementById('vigenere-key').value;
            document.getElementById('vigenere-output').value = vigenereCipher(input, key, false);
        });
    }
    
    // Atbash Cipher
    if (document.getElementById('atbash-convert')) {
        document.getElementById('atbash-convert').addEventListener('click', function() {
            const input = document.getElementById('atbash-input').value;
            document.getElementById('atbash-output').value = atbashCipher(input);
        });
    }
    
    // Rail Fence Cipher
    if (document.getElementById('railfence-encrypt')) {
        document.getElementById('railfence-encrypt').addEventListener('click', function() {
            const input = document.getElementById('railfence-input').value;
            const rails = parseInt(document.getElementById('railfence-rails').value);
            document.getElementById('railfence-output').value = railFenceEncrypt(input, rails);
        });
        
        document.getElementById('railfence-decrypt').addEventListener('click', function() {
            const input = document.getElementById('railfence-input').value;
            const rails = parseInt(document.getElementById('railfence-rails').value);
            document.getElementById('railfence-output').value = railFenceDecrypt(input, rails);
        });
    }
}

// Modern Encryption Tools
function initModernEncryption() {
    // AES Encryption
    if (document.getElementById('aes-encrypt')) {
        document.getElementById('aes-encrypt').addEventListener('click', function() {
            const input = document.getElementById('aes-input').value;
            const key = document.getElementById('aes-key').value;
            
            try {
                const encrypted = CryptoJS.AES.encrypt(input, key).toString();
                document.getElementById('aes-output').value = encrypted;
            } catch (e) {
                document.getElementById('aes-output').value = "Error: " + e.message;
            }
        });
        
        document.getElementById('aes-decrypt').addEventListener('click', function() {
            const input = document.getElementById('aes-input').value;
            const key = document.getElementById('aes-key').value;
            
            try {
                const decrypted = CryptoJS.AES.decrypt(input, key).toString(CryptoJS.enc.Utf8);
                document.getElementById('aes-output').value = decrypted;
            } catch (e) {
                document.getElementById('aes-output').value = "Error: Invalid ciphertext or key";
            }
        });
    }
    
    // RSA Encryption (Demo)
    if (document.getElementById('rsa-generate')) {
        document.getElementById('rsa-generate').addEventListener('click', function() {
            const crypt = new JSEncrypt({default_key_size: 512}); // Small key for demo purposes
            const privateKey = crypt.getPrivateKey();
            const publicKey = crypt.getPublicKey();
            
            document.getElementById('rsa-private-key').value = privateKey;
            document.getElementById('rsa-public-key').value = publicKey;
        });
        
        document.getElementById('rsa-encrypt').addEventListener('click', function() {
            const input = document.getElementById('rsa-input').value;
            const publicKey = document.getElementById('rsa-public-key').value;
            
            if (!publicKey) {
                document.getElementById('rsa-output').value = "Please generate keys first";
                return;
            }
            
            try {
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(publicKey);
                const encrypted = encrypt.encrypt(input);
                document.getElementById('rsa-output').value = encrypted;
            } catch (e) {
                document.getElementById('rsa-output').value = "Error: " + e.message;
            }
        });
        
        document.getElementById('rsa-decrypt').addEventListener('click', function() {
            const input = document.getElementById('rsa-output').value;
            const privateKey = document.getElementById('rsa-private-key').value;
            
            if (!privateKey) {
                document.getElementById('rsa-output').value = "Please generate keys first";
                return;
            }
            
            try {
                const decrypt = new JSEncrypt();
                decrypt.setPrivateKey(privateKey);
                const decrypted = decrypt.decrypt(input);
                document.getElementById('rsa-output').value = decrypted || "Decryption failed";
            } catch (e) {
                document.getElementById('rsa-output').value = "Error: " + e.message;
            }
        });
    }
    
    // Base64 Encoding/Decoding
    if (document.getElementById('base64-encode')) {
        document.getElementById('base64-encode').addEventListener('click', function() {
            const input = document.getElementById('base64-input').value;
            try {
                const encoded = btoa(encodeURIComponent(input));
                document.getElementById('base64-output').value = encoded;
            } catch (e) {
                document.getElementById('base64-output').value = "Error: " + e.message;
            }
        });
        
        document.getElementById('base64-decode').addEventListener('click', function() {
            const input = document.getElementById('base64-input').value;
            try {
                const decoded = decodeURIComponent(atob(input));
                document.getElementById('base64-output').value = decoded;
            } catch (e) {
                document.getElementById('base64-output').value = "Error: Invalid Base64 input";
            }
        });
    }
}

// Hashing Tools
function initHashingTools() {
    // Text Hashing
    if (document.getElementById('text-hash-generate')) {
        document.getElementById('text-hash-generate').addEventListener('click', function() {
            const input = document.getElementById('text-hash-input').value;
            const algorithm = document.querySelector('input[name="text-hash-algo"]:checked').value;
            
            try {
                let hash;
                switch(algorithm) {
                    case 'md5':
                        hash = CryptoJS.MD5(input).toString();
                        break;
                    case 'sha1':
                        hash = CryptoJS.SHA1(input).toString();
                        break;
                    case 'sha256':
                        hash = CryptoJS.SHA256(input).toString();
                        break;
                    case 'sha512':
                        hash = CryptoJS.SHA512(input).toString();
                        break;
                    default:
                        hash = CryptoJS.MD5(input).toString();
                }
                
                document.getElementById('text-hash-output').value = hash;
            } catch (e) {
                document.getElementById('text-hash-output').value = "Error: " + e.message;
            }
        });
    }
    
    // File Hashing
    if (document.getElementById('file-hash-generate')) {
        document.getElementById('file-hash-generate').addEventListener('click', function() {
            const fileInput = document.getElementById('file-hash-input');
            const algorithm = document.querySelector('input[name="file-hash-algo"]:checked').value;
            const outputElement = document.getElementById('file-hash-output');
            
            if (!fileInput.files || !fileInput.files[0]) {
                outputElement.value = "Please select a file first";
                return;
            }
            
            const file = fileInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                try {
                    const fileContent = event.target.result;
                    let hash;
                    
                    switch(algorithm) {
                        case 'md5':
                            hash = CryptoJS.MD5(CryptoJS.lib.WordArray.create(fileContent)).toString();
                            break;
                        case 'sha1':
                            hash = CryptoJS.SHA1(CryptoJS.lib.WordArray.create(fileContent)).toString();
                            break;
                        case 'sha256':
                            hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(fileContent)).toString();
                            break;
                        case 'sha512':
                            hash = CryptoJS.SHA512(CryptoJS.lib.WordArray.create(fileContent)).toString();
                            break;
                        default:
                            hash = CryptoJS.MD5(CryptoJS.lib.WordArray.create(fileContent)).toString();
                    }
                    
                    outputElement.value = hash;
                } catch (e) {
                    outputElement.value = "Error generating hash: " + e.message;
                }
            };
            
            reader.onerror = function() {
                outputElement.value = "Error reading file";
            };
            
            reader.readAsArrayBuffer(file);
        });
    }
    
    // Hash Comparison
    if (document.getElementById('hash-compare-btn')) {
        document.getElementById('hash-compare-btn').addEventListener('click', function() {
            const hash1 = document.getElementById('hash-1').value.trim().toLowerCase();
            const hash2 = document.getElementById('hash-2').value.trim().toLowerCase();
            const resultElement = document.getElementById('hash-compare-result');
            
            if (!hash1 || !hash2) {
                resultElement.innerHTML = `<div class="alert alert-warning">Please enter both hashes to compare</div>`;
                return;
            }
            
            if (hash1 === hash2) {
                resultElement.innerHTML = `
                    <div class="alert alert-success">
                        <strong>Match!</strong> The hashes are identical.
                    </div>
                `;
            } else {
                resultElement.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>No Match!</strong> The hashes are different.
                    </div>
                    <div class="hash-details">
                        <p>Hash 1: ${hash1}</p>
                        <p>Hash 2: ${hash2}</p>
                    </div>
                `;
            }
        });
    }
}

// Password Tools
function initPasswordTools() {
    // Password Generator
    if (document.getElementById('generate-password')) {
        document.getElementById('generate-password').addEventListener('click', function() {
            const length = parseInt(document.getElementById('password-length').value);
            const
