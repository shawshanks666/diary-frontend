async function encryptData(key, data) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data); // Convert data to Uint8Array
  
    // Generate a random initialization vector (IV)
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12 bytes for AES-GCM
  
    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv, // Initialization vector
      },
      key, // The derived AES key
      encodedData // Data to encrypt
    );
      console.log("iv before sending ",iv, encryptedData);
      
    // Convert the IV and encrypted data to Base64
    const ivBase64 = btoa(String.fromCharCode(...iv)); // Convert Uint8Array to base64 string
    const diaryEntryBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData))); // Convert Uint8Array to Base64 string
    console.log("iv before:", ivBase64);

    // Return Base64-encoded encrypted data and IV
    return {
      ciphertext: diaryEntryBase64, // Encrypted data as Base64
      iv: ivBase64, // IV as Base64
    };
  }

export default encryptData;