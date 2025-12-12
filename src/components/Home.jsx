import { useSelector, useDispatch } from 'react-redux';
import { selectDiary, setDiary } from '../store/diarySlice';
import { selectKey, setKey } from "../store/keySlice";
import { useEffect, useState } from "react";
import BasicDateCalendar from "./Calendar";
import MyEditor from "./Textarea";
import { retrieveKey } from "../utility/keyStore";
import decryptData from "../utility/decryptData";
import book from "../assets/opendiary.png"
const Home = () => {

  const dispatch = useDispatch();
  const diary = useSelector(selectDiary);
  const [date, setDate] = useState(new Date()); 
  const [diaryLoading, setDiaryLoading] = useState(true); 
  const [keyLoading, setKeyLoading] = useState(true);
  const token = sessionStorage.getItem('authToken');
  const key = useSelector(selectKey);
  const rawKey = sessionStorage.getItem('aesKey');
  const [temp, setTemp] = useState([]); // Store encrypted data locally

  // First useEffect: Fetch diary and key separately
  useEffect(() => {
    async function getKey() {
      try {
        const key = await retrieveKey(rawKey);
        dispatch(setKey(key));
      } finally {
        setKeyLoading(false);
      }
    }

    async function getDiary() {
      try {
        const response = await fetch('http://localhost:3000/diary', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTemp(data); // Store encrypted diary entries locally
        } else {
          console.error('Failed to fetch diary entries');
        }
      } catch (error) {
        console.error('Error fetching diary:', error);
      } finally {
        setDiaryLoading(false);
      }
    }

    getKey();
    getDiary();
    setDate(new Date());
  }, [token, rawKey, dispatch]);

  // Second useEffect: Decrypt and dispatch data to Redux after both loading flags are false
  useEffect(() => {
    if (!diaryLoading && !keyLoading && temp.length > 0 && key) {
      async function decryptDiary() {
        const decrypted = await Promise.all(
          temp.map(async (entry) => ({
            ...entry,
            diaryEntry: await decryptData(key, entry.diaryEntry, entry.iv),
          }))
        );
        console.log(decrypted);
        dispatch(setDiary(decrypted)); // Dispatch decrypted data to Redux
      }
      decryptDiary();
    }
  }, [diaryLoading, keyLoading, temp, key, dispatch]);

  // If still loading, show a loading message
  if (diaryLoading || keyLoading) {
    return <h6>Loading... :3</h6>;
  }
  console.log(diary);
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth(); // 0-indexed
  
  const recentMonthData = diary.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
  });
  console.log(recentMonthData);
  return (
      <div className="flex flex-row flex-wrap items-top diary-container">
          <img src={book} class="book-image" alt='illustration of an open book'/>

        <div className='calendar-container'>
          <BasicDateCalendar data={temp} date={date} setDate={setDate} />
        </div>
        <div className='textarea-container'>
          <MyEditor diary={temp} date={date} aesKey={key} />
        </div>

        
      {/* {diary.map((entry) => (
        <div key={entry.id} className="whitespace-pre-line">
          <h2>{entry.date}</h2>
          <textarea
            readOnly
            className="min-h-96 p-4 relative w-full rounded-lg bg-[#95c3b50a] backdrop-blur text-white indie-flower-regular text-lg resize-y border-none focus:outline-none focus:ring-1 focus:ring-[#A8D5BA]"
            placeholder="Type something..."
            value={entry.diaryEntry}
          />
        </div>
      ))} */}
      </div>

  );
};

export default Home;
