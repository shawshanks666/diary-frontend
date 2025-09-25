
async function deriveKey(password, salt) {
    
    // Convert password and salt to ArrayBuffer format
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = new Uint8Array(salt);
  
    // Import the password as a CryptoKey
    const passwordKey = await window.crypto.subtle.importKey(
      'raw', // Raw format of the key
      passwordBuffer, // The user's password
      'PBKDF2', // Algorithm for the key
      false, // The key is not extractable
      ['deriveKey', 'deriveBits'] // Usages for the key
    );
  
    // Derive a key using PBKDF2
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBuffer, // The user's salt
        iterations: 100000, // Number of iterations (adjust based on security/performance trade-off)
        hash: 'SHA-256', // Hashing algorithm
      },
      passwordKey, // The imported password key
      { name: 'AES-GCM', length: 256 }, // Output key format
      true, // Key is not extractable
      ['encrypt', 'decrypt'] // Usages for the derived key
    );
  //   console.log(key); // Log the key to ensure it's a CryptoKey
  //   console.log(key instanceof CryptoKey);
    return key;
  }

  
export default deriveKey;
  