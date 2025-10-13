import CalendarHeatmap from 'react-calendar-heatmap';
import { Heatmap } from '@mantine/charts';
import { Tooltip } from 'react-tooltip';
import dayjs from 'dayjs';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';  
import '../../App.css'
const Heatmaps = ({data}) => {

  // useEffect(() => {
  //   // Rebuild tooltips after the component is mounted
  //   ReactTooltip.rebuild();
  // }, [data]); // Rebuild whenever the data changes

    const date = new Date();
    const oneYearAgo = new Date(date.setDate(date.getDate() - 365));
    const lastYearData = data.filter(diary => {
      const diaryDate = new Date(diary.date); // Ensure `diary.date` is in a valid date format
      return diaryDate >= oneYearAgo;
    }).map(diary => ({
      date: diary.date, // Assuming date is in 'YYYY-MM-DD' format
      count: diary.rating || 1, // Replace with actual count logic if needed
    }));


    const formattedData = lastYearData.reduce((acc, item) => {
      acc[item.date] = item.count;
      return acc;
    }, {});
    console.log("form",formattedData);


    if (!lastYearData) {
      return;
    }console.log(JSON.stringify(formattedData, null, 2)); // Pretty prints the object

//     return(
//       <>
//         <CalendarHeatmap
//   startDate={date}
//   endDate={new Date()}
//   values={lastYearData}
//   // tooltipDataAttrs={value => {
//   //         return {
//   //           'data-tip': `${value.date} has count: ${
//   //             value.count
//   //           }`,
//   //         };
//   //       }}
//   classForValue={value => {
//           if (value) {
//             return `heatmap-color-${value.count}`;
//           }
//           return `custom-color-empty`
//         }}
//         tooltipDataAttrs={value => {
//           return {
//             'data-tooltip-id': 'heatmap-tooltip',  // Use 'data-tooltip-id' for Tooltip v5+
//             'data-tooltip-content': `${value.date} has count: ${
//               value.count
//             }`,
//           };
//         }}

// />  
// <Tooltip id="heatmap-tooltip" />  {/* Updated Tooltip usage */}

// </>
//     )
    return <Heatmap 
          styles={{
        root: {
          color:'red'
        },
      }}
    data={formattedData} 
    startDate="2025-01-01" 
    endDate="2026-01-11"  
    domain={[1, 10]}  
    rectSize={20}
    rectRadius={0}
    gap={2}   
    withTooltip
    withWeekdayLabels
    withMonthLabels
    getTooltipLabel={({ date, value }) =>
      `${dayjs(date).format('DD MMM, YYYY')} – ${value === null || value === 0 ? 'No contributions' : `${value} contribution${value > 1 ? 's' : ''}`}`
    }
    colors={[
      'var(--mantine-color-jade-1)',
        'var(--mantine-color-jade-3)',
        'var(--mantine-color-jade-5)',
        'var(--mantine-color-jade-7)',
        'var(--mantine-color-jade-9)',
        'var(--mantine-color-neutral-9)',
        'var(--mantine-color-neutral-7)',
        'var(--mantine-color-neutral-5)',
        'var(--mantine-color-neutral-3)',
        'var(--mantine-color-neutral-1)',

      ]}
    />;

}

export default Heatmaps