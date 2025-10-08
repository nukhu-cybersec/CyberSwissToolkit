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
// Enigma Machine Implementation
class EnigmaMachine {
  constructor() {
    // Historical rotor wirings
    this.rotorWirings = {
      'I': 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
      'II': 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
      'III': 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
      'IV': 'ESOVPZJAYQUIRHXLNFTGKDCMWB',
      'V': 'VZBRGITYUPSDNHLXAWMJQOFECK'
    };
    
    // Notch positions that cause the next rotor to step
    this.rotorNotches = {
      'I': 'Q', // Rotor I steps the next rotor when Q transitions to R
      'II': 'E',
      'III': 'V',
      'IV': 'J',
      'V': 'Z'
    };
    
    // Reflector wirings
    this.reflectorWirings = {
      'B': 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
      'C': 'FVPJIAOYEDRZXWGCTKUQSBNMHL'
    };
    
    // Initialize the machine
    this.reset();
  }
  
  reset() {
    // Default configuration
    this.rotorTypes = ['I', 'II', 'III'];
    this.rotorPositions = ['A', 'A', 'A']; // Initial positions
    this.reflector = 'B';
    this.plugboard = {}; // Empty plugboard
    
    // For tracking signal path visualization
    this.currentPath = [];
    
    return this;
  }
  
  setRotorTypes(types) {
    if (types.length !== 3) throw new Error("Must specify exactly 3 rotor types");
    this.rotorTypes = types;
    return this;
  }
  
  setRotorPositions(positions) {
    if (positions.length !== 3) throw new Error("Must specify exactly 3 rotor positions");
    
    // Validate positions are letters A-Z
    for (let pos of positions) {
      if (!pos.match(/^[A-Z]$/)) 
        throw new Error("Rotor positions must be uppercase letters A-Z");
    }
    
    this.rotorPositions = positions;
    return this;
  }
  
  setReflector(type) {
    if (!this.reflectorWirings[type]) 
      throw new Error(`Unknown reflector type: ${type}`);
    
    this.reflector = type;
    return this;
  }
  
  // Add a plugboard connection between two letters
  connect(a, b) {
    if (a === b) return this; // Can't connect a letter to itself
    
    // Remove existing connections for these letters
    this.disconnect(a);
    this.disconnect(b);
    
    // Add the new connection
    this.plugboard[a] = b;
    this.plugboard[b] = a;
    return this;
  }
  
  // Remove a plugboard connection
  disconnect(letter) {
    const connected = this.plugboard[letter];
    if (connected) {
      delete this.plugboard[letter];
      delete this.plugboard[connected];
    }
    return this;
  }
  
  // Clear all plugboard connections
  clearPlugboard() {
    this.plugboard = {};
    return this;
  }
  
  // Step the rotors (happens before encoding a letter)
  step() {
    // Clear previous signal path
    this.currentPath = [];
    
    // Check if middle rotor will cause a double-step
    const middleRotorAtNotch = this.rotorPositions[1] === this.rotorNotches[this.rotorTypes[1]];
    
    // Check if right rotor will step the middle rotor
    const rightRotorAtNotch = this.rotorPositions[2] === this.rotorNotches[this.rotorTypes[2]];
    
    // Step the rotors
    if (middleRotorAtNotch) {
      // Double-stepping mechanism: middle rotor steps, causing the left rotor to step too
      this.stepRotor(0); // Step left rotor
      this.stepRotor(1); // Step middle rotor
    } else if (rightRotorAtNotch) {
      // Normal stepping: right rotor causes middle rotor to step
      this.stepRotor(1); // Step middle rotor
    }
    
    // Right rotor always steps
    this.stepRotor(2);
    
    return this;
  }
  
  // Step a single rotor
  stepRotor(rotorIndex) {
    const currentPos = this.rotorPositions[rotorIndex];
    const newPos = String.fromCharCode(((currentPos.charCodeAt(0) - 65 + 1) % 26) + 65);
    this.rotorPositions[rotorIndex] = newPos;
  }
  
  // Encrypt/decrypt a single character
  encryptChar(char) {
    // Uppercase and ensure it's a letter
    char = char.toUpperCase();
    if (!char.match(/^[A-Z]$/)) return char;
    
    // Track the signal path for visualization
    this.currentPath = [];
    
    // Step the rotors before encoding
    this.step();
    
    // Store original character for path tracking
    const originalChar = char;
    this.addToPath('input', originalChar);
    
    // Apply plugboard substitution (if any)
    if (this.plugboard[char]) {
      char = this.plugboard[char];
      this.addToPath('plugboard-forward', char);
    } else {
      this.addToPath('plugboard-forward', char);
    }
    
    // Pass through rotors from right to left
    for (let i = 2; i >= 0; i--) {
      char = this.passRotor(char, i, 'forward');
      this.addToPath(`rotor-${i+1}-forward`, char);
    }
    
    // Pass through reflector
    char = this.passReflector(char);
    this.addToPath('reflector', char);
    
    // Pass through rotors from left to right
    for (let i = 0; i <= 2; i++) {
      char = this.passRotor(char, i, 'backward');
      this.addToPath(`rotor-${i+1}-backward`, char);
    }
    
    // Apply plugboard again
    if (this.plugboard[char]) {
      char = this.plugboard[char];
      this.addToPath('plugboard-backward', char);
    } else {
      this.addToPath('plugboard-backward', char);
    }
    
    this.addToPath('output', char);
    return char;
  }
  
  // Add a point to the signal path
  addToPath(component, letter) {
    this.currentPath.push({
      component,
      letter
    });
  }
  
  // Get the signal path for visualization
  getSignalPath() {
    return this.currentPath;
  }
  
  // Pass a character through a rotor
  passRotor(char, rotorIndex, direction) {
    const rotorType = this.rotorTypes[rotorIndex];
    const rotorWiring = this.rotorWirings[rotorType];
    const rotorPosition = this.rotorPositions[rotorIndex];
    
    // Calculate offset based on rotor position
    const offset = rotorPosition.charCodeAt(0) - 65; // A=0, B=1, etc.
    
    if (direction === 'forward') {
      // Input -> Output through rotor
      // Adjust for current rotor position, find the corresponding output
      const inputIndex = (char.charCodeAt(0) - 65 + offset) % 26;
      const outputChar = rotorWiring.charAt(inputIndex);
      // Adjust output back based on rotor position
      return String.fromCharCode(((outputChar.charCodeAt(0) - 65 - offset + 26) % 26) + 65);
    } else {
      // Output -> Input (reverse direction)
      // Adjust for current rotor position
      const adjustedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + offset) % 26) + 65);
      // Find where this character is in the wiring
      const outputIndex = rotorWiring.indexOf(adjustedChar);
      // Convert back to a character and adjust for rotor position
      return String.fromCharCode(((outputIndex - offset + 26) % 26) + 65);
    }
  }
  
  // Pass a character through the reflector
  passReflector(char) {
    const reflectorWiring = this.reflectorWirings[this.reflector];
    const index = char.charCodeAt(0) - 65;
    return reflectorWiring.charAt(index);
  }
  
  // Encrypt an entire message
  encrypt(message) {
    let result = '';
    for (let i = 0; i < message.length; i++) {
      const char = message.charAt(i);
      if (char.match(/[A-Za-z]/)) {
        result += this.encryptChar(char);
      } else {
        result += char; // Non-alphabetic characters pass through unchanged
      }
    }
    return result;
  }
  
  // Get the current configuration as an object (for saving)
  getConfiguration() {
    return {
      rotorTypes: [...this.rotorTypes],
      rotorPositions: [...this.rotorPositions],
      reflector: this.reflector,
      plugboard: {...this.plugboard}
    };
  }
  
  // Load a saved configuration
  loadConfiguration(config) {
    this.rotorTypes = config.rotorTypes;
    this.rotorPositions = config.rotorPositions;
    this.reflector = config.reflector;
    this.plugboard = config.plugboard;
    return this;
  }
}

// UI Controller for the Enigma Machine
class EnigmaUI {
  constructor() {
    this.enigma = new EnigmaMachine();
    this.selectedPlugboardSocket = null;
    this.activeConnections = [];
    this.inputMessage = '';
    this.outputMessage = '';
    
    this.canvas = document.getElementById('enigma-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.init();
  }
  
  init() {
    this.setupRotors();
    this.setupReflector();
    this.setupPlugboard();
    this.setupKeyboard();
    this.setupButtons();
    this.updateRotorDisplays();
    this.render();
  }
  
  setupRotors() {
    // Rotor position controls
    document.querySelectorAll('.rotor-up').forEach(button => {
      button.addEventListener('click', (e) => {
        const rotorIndex = parseInt(e.target.dataset.rotor) - 1;
        const currentPos = this.enigma.rotorPositions[rotorIndex];
        const newPos = String.fromCharCode(((currentPos.charCodeAt(0) - 65 + 1) % 26) + 65);
        this.enigma.rotorPositions[rotorIndex] = newPos;
        this.updateRotorDisplays();
      });
    });
    
    document.querySelectorAll('.rotor-down').forEach(button => {
      button.addEventListener('click', (e) => {
        const rotorIndex = parseInt(e.target.dataset.rotor) - 1;
        const currentPos = this.enigma.rotorPositions[rotorIndex];
        const newPos = String.fromCharCode(((currentPos.charCodeAt(0) - 65 - 1 + 26) % 26) + 65);
        this.enigma.rotorPositions[rotorIndex] = newPos;
        this.updateRotorDisplays();
      });
    });
    
    // Rotor type selectors
    for (let i = 1; i <= 3; i++) {
      const selector = document.getElementById(`rotor-${i}-type`);
      selector.addEventListener('change', (e) => {
        const rotorIndex = i - 1;
        this.enigma.rotorTypes[rotorIndex] = e.target.value;
      });
    }
  }
  
  setupReflector() {
    const reflectorSelector = document.getElementById('reflector-type');
    reflectorSelector.addEventListener('change', (e) => {
      this.enigma.reflector = e.target.value;
    });
  }
  
  setupPlugboard() {
    const plugboard = document.getElementById('plugboard');
    plugboard.innerHTML = '';
    
    // Create the 26 sockets for each letter
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      const socket = document.createElement('div');
      socket.className = 'plugboard-socket';
      socket.textContent = letter;
      socket.dataset.letter = letter;
      socket.addEventListener('click', () => this.handlePlugboardClick(socket));
      plugboard.appendChild(socket);
    }
  }
  
  handlePlugboardClick(socket) {
    const letter = socket.dataset.letter;
    
    // If there's already a connection for this letter, remove it first
    if (this.enigma.plugboard[letter]) {
      const connectedLetter = this.enigma.plugboard[letter];
      this.enigma.disconnect(letter);
      this.updatePlugboardDisplay();
      return;
    }
    
    // If this is the first socket being clicked, select it
    if (!this.selectedPlugboardSocket) {
      this.selectedPlugboardSocket = socket;
      socket.classList.add('selected');
      return;
    }
    
    // If this is the second socket, make the connection
    const firstLetter = this.selectedPlugboardSocket.dataset.letter;
    if (firstLetter !== letter) {
      this.enigma.connect(firstLetter, letter);
    }
    
    // Reset selection
    this.selectedPlugboardSocket.classList.remove('selected');
    this.selectedPlugboardSocket = null;
    
    // Update the display
    this.updatePlugboardDisplay();
  }
  
  updatePlugboardDisplay() {
    // Reset all sockets
    document.querySelectorAll('.plugboard-socket').forEach(socket => {
      socket.classList.remove('connected');
    });
    
    // Remove all wires
    document.querySelectorAll('.plugboard-wire').forEach(wire => {
      wire.remove();
    });
    
    // Add connections
    const plugboard = document.getElementById('plugboard');
    const processed = new Set();
    
    for (const [letterA, letterB] of Object.entries(this.enigma.plugboard)) {
      if (processed.has(letterA)) continue;
      
      const socketA = document.querySelector(`.plugboard-socket[data-letter="${letterA}"]`);
      const socketB = document.querySelector(`.plugboard-socket[data-letter="${letterB}"]`);
      
      if (socketA && socketB) {
        socketA.classList.add('connected');
        socketB.classList.add('connected');
        
        // Create a wire connecting these sockets
        this.drawPlugboardWire(socketA, socketB);
        
        processed.add(letterA);
        processed.add(letterB);
      }
    }
  }
  
  drawPlugboardWire(socketA, socketB) {
    const rectA = socketA.getBoundingClientRect();
    const rectB = socketB.getBoundingClientRect();
    const plugboardRect = document.getElementById('plugboard').getBoundingClientRect();
    
    // Calculate positions relative to the plugboard
    const x1 = rectA.left - plugboardRect.left + rectA.width/2;
    const y1 = rectA.top - plugboardRect.top + rectA.height/2;
    const x2 = rectB.left - plugboardRect.left + rectB.width/2;
    const y2 = rectB.top - plugboardRect.top + rectB.height/2;
    
    const wire = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wire.classList.add('plugboard-wire');
    wire.style.position = 'absolute';
    wire.style.top = '0';
    wire.style.left = '0';
    wire.style.width = '100%';
    wire.style.height = '100%';
    wire.style.pointerEvents = 'none';
    
    // Set viewBox to plugboard dimensions
    wire.setAttribute('viewBox', `0 0 ${plugboardRect.width} ${plugboardRect.height}`);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}`);
    path.setAttribute('stroke', '#52ff8d');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    
    wire.appendChild(path);
    document.getElementById('plugboard').appendChild(wire);
  }
  
  setupKeyboard() {
    const keyboard = document.querySelector('.enigma-keyboard');
    keyboard.innerHTML = '';
    
    // Create keys for each letter
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      const key = document.createElement('div');
      key.className = 'enigma-key';
      key.textContent = letter;
      key.dataset.letter = letter;
      key.addEventListener('click', () => this.handleKeyPress(letter));
      keyboard.appendChild(key);
    }
    
    // Listen for keyboard events
    document.addEventListener('keydown', (e) => {
      const letter = e.key.toUpperCase();
      if (letter.match(/^[A-Z]$/)) {
        const keyElement = document.querySelector(`.enigma-key[data-letter="${letter}"]`);
        if (keyElement) {
          keyElement.classList.add('active');
          this.handleKeyPress(letter);
        }
      }
    });
    
    document.addEventListener('keyup', (e) => {
      const letter = e.key.toUpperCase();
      if (letter.match(/^[A-Z]$/)) {
        const keyElement = document.querySelector(`.enigma-key[data-letter="${letter}"]`);
        if (keyElement) {
          keyElement.classList.remove('active');
        }
      }
    });
  }
  
  handleKeyPress(letter) {
    // Light up the key
    const keyElement = document.querySelector(`.enigma-key[data-letter="${letter}"]`);
    if (keyElement) {
      keyElement.classList.add('active');
      setTimeout(() => {
        keyElement.classList.remove('active');
      }, 200);
    }
    
    // Process the letter through the Enigma
    const encryptedLetter = this.enigma.encryptChar(letter);
    
    // Update the messages
    this.inputMessage += letter;
    this.outputMessage += encryptedLetter;
    
    // Update the display
    document.getElementById('input-message').textContent = this.inputMessage;
    document.getElementById('output-message').textContent = this.outputMessage;
    
    // Animate the signal path
    this.animateSignalPath();
  }
  
  setupButtons() {
    // Reset button
    document.getElementById('reset-enigma').addEventListener('click', () => {
      this.enigma.reset();
      this.updateRotorDisplays();
      this.updatePlugboardDisplay();
      this.inputMessage = '';
      this.outputMessage = '';
      document.getElementById('input-message').textContent = '';
      document.getElementById('output-message').textContent = '';
      this.render();
    });
    
    // Clear plugboard
    document.getElementById('clear-plugboard').addEventListener('click', () => {
      this.enigma.clearPlugboard();
      this.selectedPlugboardSocket = null;
      this.updatePlugboardDisplay();
    });
    
    // Random plugboard setup
    document.getElementById('random-plugboard').addEventListener('click', () => {
      this.setupRandomPlugboard();
    });
    
    // Save configuration
    document.getElementById('save-config').addEventListener('click', () => {
      const config = this.enigma.getConfiguration();
      localStorage.setItem('enigma-config', JSON.stringify(config));
      alert('Configuration saved!');
    });
    
    // Load configuration
    document.getElementById('load-config').addEventListener('click', () => {
      const savedConfig = localStorage.getItem('enigma-config');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        this.enigma.loadConfiguration(config);
        this.updateRotorDisplays();
        this.updatePlugboardDisplay();
        alert('Configuration loaded!');
      } else {
        alert('No saved configuration found.');
      }
    });
  }
  
  setupRandomPlugboard() {
    // Clear existing connections
    this.enigma.clearPlugboard();
    
    // Create an array of available letters
    const available = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
    
    // Shuffle the array
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }
    
    // Create 10 random connections
    for (let i = 0; i < 10; i++) {
      if (available.length >= 2) {
        const a = available.pop();
        const b = available.pop();
        this.enigma.connect(a, b);
      }
    }
    
    this.updatePlugboardDisplay();
  }
  
  updateRotorDisplays() {
    for (let i = 0; i < 3; i++) {
      const display = document.querySelector(`#rotor-${i+1} .rotor-display`);
      display.textContent = this.enigma.rotorPositions[i];
      
      // Update the rotor type dropdown
      const selector = document.getElementById(`rotor-${i+1}-type`);
      selector.value = this.enigma.rotorTypes[i];
    }
    
    // Update reflector
    document.getElementById('reflector-type').value = this.enigma.reflector;
  }
  
  animateSignalPath() {
    // Get the signal path from the last encryption
    const path = this.enigma.getSignalPath();
    
    // Clear the canvas
    this.render();
    
    // Animate the path
    let step = 0;
    const animate = () => {
      if (step < path.length) {
        this.drawPathStep(path, step);
        step++;
        setTimeout(animate, 100); // Speed of animation
      }
    };
    
    animate();
  }
  
  drawPathStep(path, step) {
    const currentStep = path[step];
    
    // Draw all steps up to the current one
    for (let i = 0; i <= step; i++) {
      const pathStep = path[i];
      // Different colors for different components
      let color;
      
      if (pathStep.component === 'input' || pathStep.component === 'output') {
        color = '#52ff8d'; // Green
      } else if (pathStep.component.includes('plugboard')) {
        color = '#ff5252'; // Red
      } else if (pathStep.component.includes('rotor')) {
        color = '#52a8ff'; // Blue
      } else if (pathStep.component === 'reflector') {
        color = '#ffcc52'; // Yellow
      }
      
      // Draw on the canvas
      this.drawComponent(pathStep.component, pathStep.letter, color);
    }
  }
  
  drawComponent(component, letter, color) {
    // Simple representation for now - in a real implementation, this would draw
    // a more detailed visualization on the canvas
    const x = 50;
    const y = 50 + (component.includes('rotor-1') ? 50 : 
                    component.includes('rotor-2') ? 100 : 
                    component.includes('rotor-3') ? 150 : 
                    component === 'reflector' ? 200 : 
                    component.includes('plugboard') ? 250 : 300);
    
    this.ctx.fillStyle = color;
    this.ctx.font = '20px monospace';
    this.ctx.fillText(`${component}: ${letter}`, x, y);
  }
  
  render() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw the static parts of the machine visualization
    this.drawMachineVisualization();
  }
  
  drawMachineVisualization() {
    // Draw a basic diagram of the Enigma machine
    this.ctx.fillStyle = '#0a142e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw some grid lines
    this.ctx.strokeStyle = '#1a2040';
    this.ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let y = 0; y < this.canvas.height; y += 20) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x < this.canvas.width; x += 20) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    // Draw component placeholders
    this.ctx.fillStyle = '#8b9fff';
    this.ctx.font = '16px "Roboto Mono", monospace';
    this.ctx.textAlign = 'center';
    
    // Rotors
    this.ctx.fillText("Rotor III", 100, 80);
    this.ctx.fillText("Rotor II", 250, 80);
    this.ctx.fillText("Rotor I", 400, 80);
    this.ctx.fillText("Reflector", 500, 80);
    
    // Plugboard
    this.ctx.fillText("Plugboard", 300, 320);
    
    // Draw machine case
    this.ctx.strokeStyle = '#4a5ae0';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(50, 30, 500, 340);
    
    // Draw a path placeholder
    this.ctx.strokeStyle = '#52a8ff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(300, 380);
    this.ctx.bezierCurveTo(300, 320, 300, 300, 100, 100);
    this.ctx.bezierCurveTo(200, 50, 400, 50, 500, 100);
    this.ctx.bezierCurveTo(450, 150, 350, 200, 300, 300);
    this.ctx.stroke();
    
    // Draw text in the center
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '18px "Roboto Mono", monospace';
    this.ctx.fillText("Type a key to see the signal path", 300, 200);
  }
}

// Initialize the UI when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const enigmaUI = new EnigmaUI();
});
