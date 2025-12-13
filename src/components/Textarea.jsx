import { useState, useRef, useEffect } from "react";
import encryptData from '../utility/encryptData';
import decryptData from '../utility/decryptData';
import sentimentAnalysis from '../utility/sentimentAnalysis';
const MyEditor = ({diary,date, aesKey}) => {

  //console.log(key instanceof CryptoKey);  // Should log true if it's a valid CryptoKey
  const textareaRef = useRef(null);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(null);
  const [isEditing,setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
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
    console.log(entry.id);
    setIsEditing(true)
    setEditingId(entry.id)
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
    setText("");
  }
  }, [formattedDate, diary, key, aesKey])
  // const handleToggle = () => {
  //   setIsFullScreen(!isFullScreen);
  // };

  const handleInput = (e) => {
    setText(e.target.value);
    // const textarea = textareaRef.current;
    // textarea.style.height = "auto";
    // textarea.style.height = textarea.scrollHeight + "px";
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
    if (isEditing){
      try {
        const url =process.env.REACT_APP_BACKEND_API;
        const response = await fetch(`${url}diary/${editingId}`, {

          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          setMessage('Diary entry updated successfully!');
        } else {
          setMessage('Failed to post diary entry');
        }
        
      } catch (error) {
        setMessage('Error posting diary');
      } finally {
        setLoading(false);
        console.log(message);
      }
    }
    else{
      try {
        const response = await fetch(`${url}/diary`, {
        // const response = await fetch('http://localhost:3000/diary', {
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
    }

  };

  return (
    <>
      {/* <button onClick={handleToggle} className="absolute text-white right-2 top-2 z-10">
        <FontAwesomeIcon icon={faExpand} className="text-xl cursor-pointer hover:text-green px-1" />
      </button> */}

      <textarea
        name="diary"
        ref={textareaRef}
        className="textarea"
        onInput={handleInput}
        placeholder="Type something..."
        value={text?text:null}
        autocorrect="on" 
      />
      <div className="button-container">
        <p>Wordcount: 
        <span>{text? WordCount(text):0}</span>
        </p>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="login-button"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>


      {/* {message && <p className="mt-4 text-center">{message}</p>} */}
    </>
  );
}

export default MyEditor;
