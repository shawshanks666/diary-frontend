import { useState, useRef, useEffect } from "react";
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import encryptData from '../utility/encryptData';
import decryptData from '../utility/decryptData';
import sentimentAnalysis from '../utility/sentimentAnalysis';
const MyEditor = ({diary,date, aesKey}) => {

  //console.log(key instanceof CryptoKey);  // Should log true if it's a valid CryptoKey
  const textareaRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(null);
  const token = sessionStorage.getItem('authToken');
  const currentDate = date;
  const formattedDate = currentDate.toLocaleDateString('en-CA');


  
  useEffect(() => {
    setKey(aesKey);

    // async function getKey() {
    //   const key = await retrieveKey(rawKey);
    //   setKey(key);

    //   // const iv = "4wzHHvdv0vSNTFoB";
    //   // const diary= "VAty2eGmQcLLM0Ajg8mU7ClMmSYXB3qBBSfe8i3F";
    //   // const text = await decryptData(key, diary,iv);
    //   // console.log("text", text);
    // }
    // getKey();
    

    // Finding the diary entry based on the date
    const entry = diary.find((e) => e.date === formattedDate);
    if (entry && entry.diaryEntry && key) {
    async function setdiaryEntry() {

      try{
        const encryptedData = entry.diaryEntry;
        const iv = entry.iv;
        console.log(entry);
        console.log("data after:", encryptedData, " iv ", iv);
        const diaryEntry =  await decryptData(key, encryptedData, iv);
        setText(diaryEntry);
      }catch(error){
        console.error("Decryption failed:", error);
        // setText("Decryption failed.");

      } 
    }
    setdiaryEntry();
  }
   else {
    setText("Type Something...");
  }
  }, [date])
  const handleToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleInput = (e) => {
    setText(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  const WordCount = (str) => {
    return str.trim().split(/\s+/).length;
}

  const handleSubmit = async () => {

    const {ciphertext, iv} = await encryptData(key, text);
    console.log("c",ciphertext,"iv", iv);
    const testData = await decryptData(key,ciphertext, iv);
    console.log(testData);
    const sentiment = await sentimentAnalysis(text);
    console.log(sentiment);
    const count = WordCount(text);
    const payload = {
      date: formattedDate,
      diaryEntry: ciphertext,
      iv:iv,
      mood:sentiment.mood,
      rating: sentiment.sentimentScore,
      count: count
    };

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/diary', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('Diary entry posted successfully!');
      } else {
        setMessage('Failed to post diary entry');
      }
    } catch (error) {
      setMessage('Error posting diary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex flex-col min-h-96 w-full lg:w-3/5 rounded-lg backdrop-blur text-white indie-flower-regular text-lg resize-y border-none ${isFullScreen ? "fixed top-0 left-0 lg:w-[calc(100%-20px)] " : ""}`}>
      <button onClick={handleToggle} className="absolute text-white right-2 top-2 z-10">
        <FontAwesomeIcon icon={faExpand} className="text-xl cursor-pointer hover:text-green px-1" />
      </button>

      <textarea
        ref={textareaRef}
        className="min-h-96 p-6 relative w-full rounded-lg bg-[#95c3b50a] backdrop-blur text-green indie-flower-regular text-lg resize-y border-none focus:outline-none focus:ring-1 focus:ring-[#A8D5BA]"
        onInput={handleInput}
        placeholder="Type something..."
        value={text?text:null}
        autocorrect="on" 
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 bottom-0 right-0 p-2 text-white flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default MyEditor;
