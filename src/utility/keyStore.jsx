async function exportKeyToBase64(key) {
    const exported = await window.crypto.subtle.exportKey('raw', key);
    const base64Key = btoa(String.fromCharCode(...new Uint8Array(exported)));
    return base64Key;
}

// Function to import the key from a base64 string
async function importKeyFromBase64(base64Key) {
    const rawKey = Uint8Array.from(atob(base64Key), char => char.charCodeAt(0));
    return window.crypto.subtle.importKey(
        'raw',
        rawKey,
        { name: 'AES-GCM' }, // or 'AES-CBC' depending on your use case
        true,
        ['encrypt', 'decrypt']
    );
}

// Storing the key
async function storeKey(key) {
    const base64Key = await exportKeyToBase64(key);
    sessionStorage.setItem('aesKey', base64Key);
    console.log('Key stored:', base64Key);
}

// Retrieving the key
async function retrieveKey() {
    const base64Key = sessionStorage.getItem('aesKey');
    if (!base64Key) {
        console.error('No key found in sessionStorage');
        return null;
    }
    const key = await importKeyFromBase64(base64Key);
    // console.log('Key retrieved:', key);
    return key;
}

export { storeKey, retrieveKey };