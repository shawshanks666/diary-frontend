import UserProfile from "./Streak";
import { retrieveKey } from "../../utility/keyStore";
import decryptData from "../../utility/decryptData";
import Heatmap from "./Heatmap";
import { useSelector, useDispatch } from 'react-redux';
import { selectDiary, setDiary } from '../../store/diarySlice';
import { selectKey, setKey } from "../../store/keySlice";
import { useEffect, useState } from "react";
import BasicDateCalendar from "../Calendar";
import WordCount from "./WordCount";
import Mood from "./Mood";
const Dashboard = () => {
  const dispatch = useDispatch();
  const diary = useSelector(selectDiary);
  const [date, setDate] = useState(new Date()); 
  const [diaryLoading, setDiaryLoading] = useState(true); 
  const [keyLoading, setKeyLoading] = useState(true);
  const token = sessionStorage.getItem('authToken');
  const key = useSelector(selectKey);
  const rawKey = sessionStorage.getItem('aesKey');
  const [temp, setTemp] = useState([]);


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
  if (keyLoading) {
    return <h6>Loading... :3</h6>;
  }

  // If there are no diary entries, show a message
  // if (!diary.length) {
  //   return <h6>No diary entries available</h6>;
  // }

  // Render the diary entries
  if (diaryLoading || keyLoading) {
    return <h6>Loading... :3</h6>;
  }
 
    return (
      <div className="dashboard">
      <Heatmap data={diary}></Heatmap>
      <UserProfile></UserProfile>
      <WordCount date={date} diary={diary} ></WordCount>
      <Mood diary={diary}></Mood>
      <div className="flex flex-row flex-wrap items-top">
      <BasicDateCalendar data={temp} date={date} setDate={setDate}></BasicDateCalendar>
  </div>

        

      </div>
    );
  
};

export default Dashboard;
