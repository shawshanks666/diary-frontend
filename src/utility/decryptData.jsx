function decodeBase64(base64Str) {
  try {
    const decodedStr = atob(base64Str);
    const byteArray = new Uint8Array(decodedStr.length);
    for (let i = 0; i < decodedStr.length; i++) {
      byteArray[i] = decodedStr.charCodeAt(i);
    }
    return byteArray;
  } catch (e) {
    console.error("Error decoding Base64:", e);
    throw new Error("Base64 decoding failed");
  }
}

// Usage


async function decryptData(key, encryptedBase64, ivBase64) {
  const abcd = decodeBase64(ivBase64);

  // Convert Base64 strings to Uint8Array
  // const ivBuffer = new Uint8Array(atob(ivBase64).split('').map(char => char.charCodeAt(0)));
  const encryptedBuffer = decodeBase64(encryptedBase64);
  // console.log("Decoded IV:", abcd, encryptedBuffer);

  // console.log("cipher:", encryptedBuffer, "iv:", ivBuffer);  // Debug: Logs the decrypted data and IV

  try {
    // Decrypt the data using AES-GCM
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: abcd, // Initialization Vector used during encryption
      },
      key, // The AES key used for decryption
      encryptedBuffer // The encrypted data
    );

    // Decode the decrypted data back to a string using TextDecoder
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData); // Return the decrypted string
  } catch (err) {
    console.error("Decryption failed:", err);
    throw new Error("Decryption failed: " + err.message);
  }
}

export default decryptData;
