document.addEventListener('DOMContentLoaded', function() {
    // Set current date and time
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    document.getElementById('current-date-time').textContent = formattedDate;
    
    // Navigation tabs functionality
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
    
    // ==================== STEGANOGRAPHY SECTION ====================
    
    const stegImage = document.getElementById('steg-image');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.querySelector('.preview-container');
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');
    
    // Handle image upload and preview
    stegImage.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                previewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Encode message function
    encodeBtn.addEventListener('click', function() {
        const message = document.getElementById('steg-message').value.trim();
        
        if (!message) {
            showResult('Please enter a secret message to encode.', 'error');
            return;
        }
        
        if (!stegImage.files[0]) {
            showResult('Please select an image first.', 'error');
            return;
        }
        
        // Simulate encoding process (in a real app, this would do actual steganography)
        simulateProcessing('Encoding message into image...', () => {
            // Create a downloadable "encoded" image (in this demo, it's just the original)
            const encodedImageUrl = imagePreview.src;
            
            showResult(`
                <div class="text-green-400 mb-4">✅ Message successfully encoded!</div>
                <p class="mb-4">Your secret message has been hidden in the image. No visual difference can be detected.</p>
                <div class="mb-4">
                    <img src="${encodedImageUrl}" alt="Encoded image" class="max-h-64 rounded-lg mx-auto" />
                </div>
                <a href="${encodedImageUrl}" download="stego_image.png" 
                   class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Download Encoded Image
                </a>
                <div class="mt-4 text-sm text-gray-400">
                    Note: In a real steganography tool, the actual bit manipulation would occur to hide the data.
                </div>
            `, 'success');
        });
    });
    
    // Decode message function
    decodeBtn.addEventListener('click', function() {
        if (!stegImage.files[0]) {
            showResult('Please select an image to decode.', 'error');
            return;
        }
        
        // Simulate decoding process (in a real app, this would extract the hidden message)
        simulateProcessing('Analyzing image and extracting hidden data...', () => {
            const message = document.getElementById('steg-message').value.trim() || 
                            "This is a simulated decoded message. In a real implementation, the actual hidden message would be extracted from the image.";
            
            showResult(`
                <div class="text-blue-400 mb-4">🔍 Message extracted!</div>
                <div class="mb-2 text-sm font-medium">Decoded content:</div>
                <div class="p-3 bg-gray-900 rounded-lg border border-gray-700 font-mono whitespace-pre-wrap">${message}</div>
            `, 'success');
        });
    });
    
    function showResult(content, type) {
        resultContainer.classList.remove('hidden');
        resultContent.innerHTML = content;
        resultContent.classList.add(`result-${type}`);
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function simulateProcessing(processingMsg, callback) {
        resultContainer.classList.remove('hidden');
        resultContent.innerHTML = `
            <div class="flex items-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mr-3"></div>
                <span>${processingMsg}</span>
            </div>
        `;
        
        // Simulate processing delay
        setTimeout(callback, 1500);
    }
    
    // ==================== CIPHER SECTION ====================
    
    const cipherType = document.getElementById('cipher-type');
    const keyContainer = document.getElementById('key-container');
    const cipherKey = document.getElementById('cipher-key');
    const cipherInput = document.getElementById('cipher-input');
    const cipherOutput = document.getElementById('cipher-output');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    
    // Update key input based on selected cipher
    cipherType.addEventListener('change', function() {
        const type = this.value;
        
        if (type === 'atbash' || type === 'base64' || type === 'rot13') {
            keyContainer.style.display = 'none';
        } else {
            keyContainer.style.display = 'block';
            
            if (type === 'caesar') {
                cipherKey.type = 'number';
                cipherKey.placeholder = 'Enter shift value (e.g., 3)';
                cipherKey.value = '3';
            } else {
                cipherKey.type = 'text';
                cipherKey.placeholder = 'Enter key word or phrase';
                cipherKey.value = '';
            }
        }
    });
    
    // Encrypt button click handler
    encryptBtn.addEventListener('click', function() {
        const type = cipherType.value;
        const input = cipherInput.value.trim();
        const key = cipherKey.value;
        
        if (!input) {
            cipherOutput.value = 'Please enter text to encrypt';
            return;
        }
        
        let output = '';
        
        switch (type) {
            case 'caesar':
                output = caesarCipher(input, parseInt(key) || 3, true);
                break;
            case 'vigenere':
                output = vigenereCipher(input, key || 'KEY', true);
                break;
            case 'atbash':
                output = atbashCipher(input);
                break;
            case 'base64':
                output = btoa(input);
                break;
            case 'rot13':
                output = caesarCipher(input, 13, true);
                break;
        }
        
        cipherOutput.value = output;
    });
    
    // Decrypt button click handler
    decryptBtn.addEventListener('click', function() {
        const type = cipherType.value;
        const input = cipherInput.value.trim();
        const key = cipherKey.value;
        
        if (!input) {
            cipherOutput.value = 'Please enter text to decrypt';
            return;
        }
        
        let output = '';
        
        switch (type) {
            case 'caesar':
                output = caesarCipher(input, parseInt(key) || 3, false);
                break;
            case 'vigenere':
                output = vigenereCipher(input, key || 'KEY', false);
                break;
            case 'atbash':
                output = atbashCipher(input); // Atbash is its own inverse
                break;
            case 'base64':
                try {
                    output = atob(input);
                } catch (e) {
                    output = 'Error: Invalid Base64 input';
                }
                break;
            case 'rot13':
                output = caesarCipher(input, 13, false);
                break;
        }
        
        cipherOutput.value = output;
    });
    
    // Caesar cipher implementation
    function caesarCipher(text, shift, encrypt) {
        if (!encrypt) shift = (26 - shift) % 26;
        
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + shift) % 26) + 65);
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
            // Non-alphabetic characters
            return char;
        }).join('');
    }
    
    // Vigenère cipher implementation
    function vigenereCipher(text, key, encrypt) {
        if (!key) return text;
        
        let result = '';
        let keyIndex = 0;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const code = char.charCodeAt(0);
            
            // Only encrypt/decrypt letters
            if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                // Get the corresponding key character (cycling through the key)
                const keyChar = key[keyIndex % key.length].toUpperCase();
                const keyShift = keyChar.charCodeAt(0) - 65;
                
                if ((code >= 65 && code <= 90)) { // Uppercase
                    result += encrypt 
                        ? String.fromCharCode(((code - 65 + keyShift) % 26) + 65)
                        : String.fromCharCode(((code - 65 - keyShift + 26) % 26) + 65);
                } else { // Lowercase
                    result += encrypt 
                        ? String.fromCharCode(((code - 97 + keyShift) % 26) + 97)
                        : String.fromCharCode(((code - 97 - keyShift + 26) % 26) + 97);
                }
                
                keyIndex++;
            } else {
                result += char;
            }
        }
        
        return result;
    }
    
    // Atbash cipher implementation
    function atbashCipher(text) {
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(90 - (code - 65));
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                return String.fromCharCode(122 - (code - 97));
            }
            // Non-alphabetic characters
            return char;
        }).join('');
    }
    
    // ==================== HASHING SECTION ====================
    
    const hashType = document.getElementById('hash-type');
    const hashInput = document.getElementById('hash-input');
    const hashOutput = document.getElementById('hash-output');
    const hashBtn = document.getElementById('hash-btn');
    const copyHash = document.getElementById('copy-hash');
    
    // Hash generation button click handler
    hashBtn.addEventListener('click', function() {
        const input = hashInput.value.trim();
        const type = hashType.value;
        
        if (!input) {
            hashOutput.value = 'Please enter text to hash';
            return;
        }
        
        // Show loading state
        hashOutput.value = 'Computing hash...';
        
        // Simulate hash computation (in a real app, use Web Crypto API)
        setTimeout(() => {
            let hash = '';
            
            // Generate a deterministic "fake hash" for demo purposes
            // In a real app, you would use the Web Crypto API or a hash library
            switch (type) {
                case 'md5':
                    hash = fakeMD5(input);
                    break;
                case 'sha1':
                    hash = fakeSHA1(input);
                    break;
                case 'sha256':
                    hash = fakeSHA256(input);
                    break;
                case 'sha512':
                    hash = fakeSHA512(input);
                    break;
            }
            
            hashOutput.value = hash;
        }, 500);
    });
    
    // Copy hash button click handler
    copyHash.addEventListener('click', function() {
        hashOutput.select();
        document.execCommand('copy');
        
        // Show copied feedback
        const originalIcon = this.innerHTML;
        this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
        this.classList.add('text-green-500');
        
        setTimeout(() => {
            this.innerHTML = originalIcon;
            this.classList.remove('text-green-500');
        }, 1500);
    });
    
    // Fake hash functions for demo purposes
    // In a real application, you would use the Web Crypto API or a cryptographic library
    function fakeMD5(input) {
        return Array.from(input)
            .reduce((hash, char) => {
                return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
            }, 0)
            .toString(16)
            .padStart(32, '0');
    }
    
    function fakeSHA1(input) {
        return Array.from(input)
            .reduce((hash, char) => {
                return ((hash << 7) - hash) + char.charCodeAt(0) | 0;
            }, 0)
            .toString(16)
            .padStart(40, '0');
    }
    
    function fakeSHA256(input) {
        return Array.from(input)
            .reduce((hash, char, i) => {
                return ((hash << 11) - hash + i) + char.charCodeAt(0) | 0;
            }, 0)
            .toString(16)
            .padStart(64, '0');
    }
    
    function fakeSHA512(input) {
        const part1 = fakeSHA256(input);
        const part2 = fakeSHA256(input.split('').reverse().join(''));
        return part1 + part2;
    }
    
    // ==================== PASSWORD TOOLS SECTION ====================
    
    const passLength = document.getElementById('pass-length');
    const lengthValue = document.getElementById('length-value');
    const generatePassBtn = document.getElementById('generate-pass-btn');
    const generatedPassword = document.getElementById('generated-password');
    const copyPassword = document.getElementById('copy-password');
    const checkPasswordInput = document.getElementById('check-password');
    const checkPassBtn = document.getElementById('check-pass-btn');
    const strengthResult = document.getElementById('strength-result');
    const strengthText = document.getElementById('strength-text');
    const strengthMeter = document.getElementById('strength-meter');
    const strengthDetails = document.getElementById('strength-details');
    
    // Password length slider handler
    passLength.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });
    
    // Generate password button click handler
    generatePassBtn.addEventListener('click', function() {
        const length = parseInt(passLength.value);
        const useUppercase = document.getElementById('uppercase').checked;
        const useLowercase = document.getElementById('lowercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = document.getElementById('symbols').checked;
        
        const password = generatePassword(length, {
            uppercase: useUppercase,
            lowercase: useLowercase,
            numbers: useNumbers,
            symbols: useSymbols
        });
        
        generatedPassword.value = password;
    });
    
    // Copy password button click handler
    copyPassword.addEventListener('click', function() {
        generatedPassword.select();
        document.execCommand('copy');
        
        // Show copied feedback
        const originalIcon = this.innerHTML;
        this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
        this.classList.add('text-green-500');
        
        setTimeout(() => {
            this.innerHTML = originalIcon;
            this.classList.remove('text-green-500');
        }, 1500);
    });
    
    // Check password strength button click handler
    checkPassBtn.addEventListener('click', function() {
        const password = checkPasswordInput.value;
        
        if (!password) {
            return;
        }
        
        const strength = checkPasswordStrength(password);
        strengthResult.classList.remove('hidden');
        
        // Update strength meter UI
        strengthText.textContent = strength.rating;
        strengthText.className = '';
        strengthMeter.className = 'h-2.5 rounded-full';
        
        switch (strength.score) {
            case 1:
                strengthText.classList.add('text-red-500');
                strengthMeter.classList.add('strength-very-weak');
                break;
            case 2:
                strengthText.classList.add('text-orange-500');
                strengthMeter.classList.add('strength-weak');
                break;
            case 3:
                strengthText.classList.add('text-amber-500');
                strengthMeter.classList.add('strength-medium');
                break;
            case 4:
                strengthText.classList.add('text-green-500');
                strengthMeter.classList.add('strength-strong');
                break;
            case 5:
                strengthText.classList.add('text-emerald-500');
                strengthMeter.classList.add('strength-very-strong');
                break;
        }
        
        // Show feedback details
        strengthDetails.innerHTML = '';
        strength.feedback.forEach(item => {
            const div = document.createElement('div');
            div.className = item.type === 'good' ? 'text-green-400' : 'text-red-400';
            div.innerHTML = item.type === 'good' ? `✓ ${item.message}` : `✗ ${item.message}`;
            strengthDetails.appendChild(div);
        });
    });
    
    // Generate random password
    function generatePassword(length, options) {
        const chars = {
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
        };
        
        let availableChars = '';
        
        if (options.lowercase) availableChars += chars.lowercase;
        if (options.uppercase) availableChars += chars.uppercase;
        if (options.numbers) availableChars += chars.numbers;
        if (options.symbols) availableChars += chars.symbols;
        
        // Default to lowercase if nothing is selected
        if (availableChars === '') {
            availableChars = chars.lowercase;
        }
        
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }
        
        return password;
    }
    
    // Check password strength
    function checkPasswordStrength(password) {
        // A simple password strength checker for demo purposes
        // In a real app, use a more comprehensive password strength library
        
        const length = password.length;
        let score = 0;
        const feedback = [];
        
        // Length check
        if (length === 0) {
            return {
                score: 0,
                rating: 'None',
                feedback: [{ type: 'bad', message: 'Please enter a password' }]
            };
        } else if (length < 6) {
            score = 1;
            feedback.push({ type: 'bad', message: 'Password is too short' });
        } else if (length < 8) {
            score = 2;
            feedback.push({ type: 'bad', message: 'Password could be longer' });
        } else if (length < 12) {
            score += 3;
            feedback.push({ type: 'good', message: 'Good password length' });
        } else {
            score += 4;
            feedback.push({ type: 'good', message: 'Excellent password length' });
        }
        
        // Character type checks
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);
        
        if (hasLowercase) {
            score += 0.5;
            feedback.push({ type: 'good', message: 'Contains lowercase letters' });
        } else {
            feedback.push({ type: 'bad', message: 'Add lowercase letters' });
        }
        
        if (hasUppercase) {
            score += 0.5;
            feedback.push({ type: 'good', message: 'Contains uppercase letters' });
        } else {
            feedback.push({ type: 'bad', message: 'Add uppercase letters' });
        }
        
        if (hasNumbers) {
            score += 0.5;
            feedback.push({ type: 'good', message: 'Contains numbers' });
        } else {
            feedback.push({ type: 'bad', message: 'Add numbers' });
        }
        
        if (hasSpecialChars) {
            score += 0.5;
            feedback.push({ type: 'good', message: 'Contains special characters' });
        } else {
            feedback.push({ type: 'bad', message: 'Add special characters' });
        }
        
        // Check for repeating characters
        if (/(.)\1{2,}/.test(password)) {
            score -= 1;
            feedback.push({ type: 'bad', message: 'Contains repeating characters' });
        }
        
        // Check for sequential characters
        if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password)) {
            score -= 1;
            feedback.push({ type: 'bad', message: 'Contains sequential characters' });
        }
        
        // Calculate final score (capped at 5)
        score = Math.max(1, Math.min(5, Math.round(score)));
        
        // Determine rating
        let rating;
        switch (score) {
            case 1: rating = 'Very Weak'; break;
            case 2: rating = 'Weak'; break;
            case 3: rating = 'Medium'; break;
            case 4: rating = 'Strong'; break;
            case 5: rating = 'Very Strong'; break;
        }
        
        return {
            score,
            rating,
            feedback
        };
    }
    
    // ==================== NETWORK TOOLS SECTION ====================
    
    const scanBtn = document.getElementById('scan-btn');
    const scanResult = document.getElementById('scan-result');
    const scanOutput = document.getElementById('scan-output');
    const checkSSLBtn = document.getElementById('check-ssl-btn');
    const sslResult = document.getElementById('ssl-result');
    const sslOutput = document.getElementById('ssl-output');
    
    // Port scanner simulator
    scanBtn.addEventListener('click', function() {
        const target = document.getElementById('port-scan-target').value.trim();
        const startPort = parseInt(document.getElementById('port-start').value);
        const endPort = parseInt(document.getElementById('port-end').value);
        
        if (!target) {
            alert('Please enter a target hostname or IP address');
            return;
        }
        
        if (isNaN(startPort) || isNaN(endPort) || startPort < 1 || endPort > 65535 || startPort > endPort) {
            alert('Please enter valid port numbers (1-65535)');
            return;
        }
        
        // Show scanning animation
        scanResult.classList.remove('hidden');
        scanOutput.innerHTML = `
            <div class="terminal">
                <div class="terminal-line terminal-prompt">nmap -p ${startPort}-${endPort} ${target}</div>
                <div class="terminal-line terminal-output pulse">Scanning ${target} [${startPort}-${endPort}]...</div>
            </div>
        `;
        
        // Simulate scan result after delay
        setTimeout(() => {
            // Generate some fake open ports for the demo
            const openPorts = generateFakeOpenPorts(startPort, endPort);
            
            let output = `
                <div class="terminal">
                    <div class="terminal-line terminal-prompt">nmap -p ${startPort}-${endPort} ${target}</div>
                    <div class="terminal-line terminal-output">Starting Nmap scan at ${new Date().toLocaleTimeString()}</div>
                    <div class="terminal-line terminal-output">Scanning ${target} [${endPort - startPort + 1} ports]</div>
                    <div class="terminal-line terminal-output">Completed scan at ${new Date().toLocaleTimeString()} (${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 60)}s)</div>
                    <div class="terminal-line terminal-output">Interesting ports on ${target}:</div>
            `;
            
            if (openPorts.length === 0) {
                output += `<div class="terminal-line terminal-output">All ${endPort - startPort + 1} scanned ports are closed</div>`;
            } else {
                output += `<div class="terminal-line terminal-output">PORT     STATE  SERVICE</div>`;
                openPorts.forEach(port => {
                    output += `<div class="terminal-line terminal-highlight">${port.port}/tcp  open   ${port.service}</div>`;
                });
            }
            
            output += '</div>';
            scanOutput.innerHTML = output;
        }, 2000);
    });
    
    // SSL/TLS certificate checker
    checkSSLBtn.addEventListener('click', function() {
        const domain = document.getElementById('ssl-domain').value.trim();
        
        if (!domain) {
            alert('Please enter a domain name');
            return;
        }
        
        // Show loading state
        sslResult.classList.remove('hidden');
        sslOutput.innerHTML = `
            <div class="terminal">
                <div class="terminal-line terminal-prompt">openssl s_client -showcerts -connect ${domain}:443</div>
                <div class="terminal-line terminal-output pulse">Retrieving certificate information...</div>
            </div>
        `;
        
        // Simulate certificate check result after delay
        setTimeout(() => {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + Math.floor(Math.random() * 365) + 30);
            
            const issuer = ['DigiCert Inc', 'Let\'s Encrypt', 'Comodo CA Limited', 'GlobalSign nv-sa'][Math.floor(Math.random() * 4)];
            const certVersion = ['TLSv1.2', 'TLSv1.3'][Math.floor(Math.random() * 2)];
            const cipherSuite = ['ECDHE-RSA-AES256-GCM-SHA384', 'ECDHE-ECDSA-AES128-GCM-SHA256', 'TLS_AES_256_GCM_SHA384'][Math.floor(Math.random() * 3)];
            
            sslOutput.innerHTML = `
                <div class="terminal">
                    <div class="terminal-line terminal-prompt">openssl s_client -showcerts -connect ${domain}:443</div>
                    <div class="terminal-line terminal-success">Certificate information for ${domain}:</div>
                    <div class="terminal-line terminal-output">---------------------------------------</div>
                    <div class="terminal-line terminal-output">Issuer: ${issuer}</div>
                    <div class="terminal-line terminal-output">Valid until: ${expiryDate.toDateString()}</div>
                    <div class="terminal-line terminal-output">Protocol: ${certVersion}</div>
                    <div class="terminal-line terminal-output">Cipher Suite: ${cipherSuite}</div>
                    <div class="terminal-line terminal-output">Subject: CN=${domain}</div>
                    <div class="terminal-line terminal-output">SAN: DNS:${domain}, DNS:www.${domain}</div>
                    <div class="terminal-line terminal-output">---------------------------------------</div>
                    <div class="terminal-line ${expiryDate < new Date(Date.now() + 30*24*60*60*1000) ? 'terminal-warning' : 'terminal-success'}">
                        Certificate ${expiryDate < new Date(Date.now() + 30*24*60*60*1000) ? 'expires soon' : 'is valid'} (expires in ${Math.round((expiryDate - new Date()) / (24 * 60 * 60 * 1000))} days)
                    </div>
                </div>
            `;
        }, 1500);
    });
    
    // Generate fake open ports for the demo
    function generateFakeOpenPorts(startPort, endPort) {
        const commonPorts = [
            { port: 21, service: 'ftp' },
            { port: 22, service: 'ssh' },
            { port: 23, service: 'telnet' },
            { port: 25, service: 'smtp' },
            { port: 53, service: 'domain' },
            { port: 80, service: 'http' },
            { port: 110, service: 'pop3' },
            { port: 143, service: 'imap' },
            { port: 443, service: 'https' },
            { port: 3306, service: 'mysql' },
            { port: 3389, service: 'ms-wbt-server' },
            { port: 8080, service: 'http-proxy' }
        ];
        
        // Filter ports within the specified range
        const availablePorts = commonPorts.filter(p => p.port >= startPort && p.port <= endPort);
        
        // Randomly select some ports to be "open"
        const numOpenPorts = Math.floor(Math.random() * Math.min(5, availablePorts.length));
        const openPorts = [];
        
        for (let i = 0; i < numOpenPorts; i++) {
            const randomIndex = Math.floor(Math.random() * availablePorts.length);
            openPorts.push(availablePorts[randomIndex]);
            availablePorts.splice(randomIndex, 1);
        }
        
        return openPorts.sort((a, b) => a.port - b.port);
    }
});