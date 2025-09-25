import React, { useState, useEffect } from 'react';

export default function WordCount({date,diary}) {
  const currentDate = new Date(date);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed
    console.log(currentDate);
    if (!diary){
      return <></>
    }
    
    const recentMonthData = diary.filter(item => {
      const itemDate = new Date(item.date);
      console.log(itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth);
      return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
    });
    console.log(recentMonthData);
    let sum =0
    recentMonthData.forEach((data) => {
      sum+=data.count
      
    })
    const avg= sum/recentMonthData.length
    return (
      <div className='word-count'>
        <strong>Total Words:</strong> {sum}<br />
        <strong>Average Words Per Entry:</strong> {avg.toFixed(2)}
      </div>
    );
}

