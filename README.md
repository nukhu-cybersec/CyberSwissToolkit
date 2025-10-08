# CryptoSteg - Cybersecurity Toolkit

CryptoSteg is a comprehensive web-based cybersecurity toolkit designed for educational purposes. It combines steganography capabilities with other essential cryptographic and security tools, providing a seamless interface for students and cybersecurity enthusiasts to experiment with various security techniques.

## Features

### Image Steganography
Hide secret messages within images without visible detection. CryptoSteg allows you to:
- Encode text messages into image files
- Extract hidden messages from steganographic images
- Add password protection to your hidden messages for enhanced security

### Advanced Cipher Tools
Experiment with both classical and modern encryption techniques:
- Caesar Cipher (with customizable shift)
- Vigenère Cipher
- Simple Substitution Cipher
- AES Encryption (industry-standard symmetric encryption)
- Cipher analysis tools, including frequency analysis and brute force attempts

### Cryptographic Hashing
Generate and verify secure hashes:
- Support for multiple algorithms: MD5, SHA-1, SHA-256, SHA-512, RIPEMD-160
- Hash verification tool to check data integrity
- Educational information about hash functions and their uses

### Password Tools
Enhance your password security practices:
- Strong password generator with customizable options
- Password strength checker with detailed feedback
- Visual strength meter and actionable improvement suggestions

### Text Encoding/Decoding
Convert text between different encoding formats:
- Base64 encoding/decoding
- Hexadecimal conversion
- Binary representation
- URL encoding/decoding
- HTML entity encoding/decoding

## Getting Started

### Prerequisites
CryptoSteg is a browser-based application that requires:
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- JavaScript enabled

### Installation
1. Clone the repository or download the source files:
```
git clone https://github.com/nukhu-cybersec/cryptosteg.git
```

2. Navigate to the project directory:
```
cd cryptosteg
```

3. Open `index.html` in your web browser:
```
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Alternatively, you can set up a local server or deploy to a web hosting service.

## Usage

### Steganography
1. Select the "Steganography" tab
2. To hide a message:
   - Enter your secret message in the text area
   - Optionally add a password for encryption
   - Upload an image file (PNG or JPEG)
   - Click "Encode Message into Image"
   - Download the resulting image with your hidden message

3. To extract a message:
   - Upload an image containing a hidden message
   - Enter the password if the message was encrypted
   - Click "Extract Hidden Message"
   - View the decoded message in the result area

### Ciphers
1. Select the "Ciphers" tab
2. Choose a cipher type from the dropdown menu
3. Enter your encryption/decryption key
4. Type or paste your text
5. Click "Encrypt" or "Decrypt" as needed
6. Use the cipher analysis tools to perform frequency analysis or test multiple Caesar shifts

### Hashing
1. Select the "Hashing" tab
2. Choose your preferred hashing algorithm
3. Enter the text to hash
4. Click "Generate Hash" to see the result
5. Use the verification tool to check if a given text matches a specific hash

### Password Tools
1. Select the "Password Tools" tab
2. Use the password generator to create strong passwords:
   - Adjust the length slider
   - Select character types to include
   - Click "Generate Password"
   - Copy the result
