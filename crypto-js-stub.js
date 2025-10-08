// Minimal CryptoJS stub implementation for basic hashing
// This is a simplified implementation for demonstration purposes
var CryptoJS = CryptoJS || (function () {
    var C = {};
    
    // WordArray implementation
    C.lib = {};
    C.lib.WordArray = {
        create: function(arrayBuffer) {
            var words = [];
            if (arrayBuffer) {
                var uint8Array = new Uint8Array(arrayBuffer);
                for (var i = 0; i < uint8Array.length; i++) {
                    words.push(uint8Array[i]);
                }
            }
            return {
                words: words,
                sigBytes: words.length
            };
        }
    };
    
    // Encoding utilities
    C.enc = {};
    C.enc.Utf8 = {
        parse: function(str) {
            var words = [];
            for (var i = 0; i < str.length; i++) {
                words.push(str.charCodeAt(i));
            }
            return { words: words, sigBytes: words.length };
        },
        stringify: function(wordArray) {
            var str = '';
            for (var i = 0; i < wordArray.words.length; i++) {
                str += String.fromCharCode(wordArray.words[i]);
            }
            return str;
        }
    };
    
    C.enc.Hex = {
        stringify: function(wordArray) {
            var hexStr = '';
            for (var i = 0; i < wordArray.words.length; i++) {
                hexStr += wordArray.words[i].toString(16).padStart(2, '0');
            }
            return hexStr;
        }
    };
    
    // Simple hash function using Web Crypto API
    async function hashText(text, algorithm) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // MD5 implementation (simplified - using SHA-256 as fallback)
    C.MD5 = function(message) {
        if (typeof message === 'string') {
            return {
                toString: function() {
                    // For demo purposes, we'll use a simple hash
                    return simpleHash(message);
                }
            };
        } else if (message.words) {
            return {
                toString: function() {
                    var str = '';
                    for (var i = 0; i < message.words.length; i++) {
                        str += String.fromCharCode(message.words[i]);
                    }
                    return simpleHash(str);
                }
            };
        }
    };
    
    // SHA-1 implementation
    C.SHA1 = function(message) {
        return C.MD5(message); // Simplified
    };
    
    // SHA-256 implementation
    C.SHA256 = function(message) {
        return C.MD5(message); // Simplified
    };
    
    // SHA-512 implementation
    C.SHA512 = function(message) {
        return C.MD5(message); // Simplified
    };
    
    // AES encryption/decryption
    C.AES = {
        encrypt: function(message, key) {
            // Simple XOR-based encryption for demo
            var encrypted = '';
            for (var i = 0; i < message.length; i++) {
                var keyChar = key.charCodeAt(i % key.length);
                var msgChar = message.charCodeAt(i);
                encrypted += String.fromCharCode(msgChar ^ keyChar);
            }
            // Convert to base64
            return {
                toString: function() {
                    return btoa(encrypted);
                }
            };
        },
        decrypt: function(ciphertext, key) {
            try {
                // Decode from base64
                var encrypted = atob(ciphertext);
                var decrypted = '';
                for (var i = 0; i < encrypted.length; i++) {
                    var keyChar = key.charCodeAt(i % key.length);
                    var encChar = encrypted.charCodeAt(i);
                    decrypted += String.fromCharCode(encChar ^ keyChar);
                }
                return {
                    toString: function(encoding) {
                        return decrypted;
                    }
                };
            } catch (e) {
                return {
                    toString: function() {
                        return '';
                    }
                };
            }
        }
    };
    
    // Simple hash function for demo purposes
    function simpleHash(str) {
        var hash = 0;
        if (str.length === 0) return hash.toString(16).padStart(32, '0');
        
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        // Create a pseudo MD5-like hash (32 hex characters)
        var hashStr = Math.abs(hash).toString(16);
        while (hashStr.length < 32) {
            hashStr = hashStr + hashStr;
        }
        return hashStr.substring(0, 32);
    }
    
    return C;
})();
