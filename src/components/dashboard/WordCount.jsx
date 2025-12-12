import React from 'react';

export default function WordCount({date,diary}) {
  const currentDate = new Date(date);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed
    console.log(currentDate);
    if (!diary){
      return <></>
    }
    const recentYearData = diary.filter(item => {
      const itemDate = new Date(item.date);
      console.log(itemDate.getFullYear() === currentYear);
      return itemDate.getFullYear() === currentYear;
    });
    console.log(recentYearData);
    const recentMonthData = recentYearData.filter(item => {
      const itemDate = new Date(item.date);
      console.log(itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth);
      return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
    });
    console.log(recentMonthData);
    let monthSum =0
    recentMonthData.forEach((data) => {
      monthSum+=data.count
      
    })
    let yearSum =0
    recentYearData.forEach((data) => {
      yearSum+=data.count
      
    })
    const avg= monthSum/recentMonthData.length
    return (
      <div className='word-count'>
        <div className='word-count-title'>You journaled</div>
        <div className='wordcount-data'><span>{monthSum}</span> words this month</div>
        <div className='wordcount-data'><span>{yearSum}</span> words this year</div>


        {/* <strong>Average Words Per Entry:</strong> {avg.toFixed(2)} */}
      </div>
    );
}

