import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';  
import '../../App.css'
const Heatmap = ({data}) => {
  // useEffect(() => {
  //   // Rebuild tooltips after the component is mounted
  //   ReactTooltip.rebuild();
  // }, [data]); // Rebuild whenever the data changes

    const date = new Date();
    const oneYearAgo = new Date(date.setDate(date.getDate() - 365));
    console.log(data);
    const lastYearData = data.filter(diary => {
      const diaryDate = new Date(diary.date); // Ensure `diary.date` is in a valid date format
      return diaryDate >= oneYearAgo;
    }).map(diary => ({
      date: diary.date, // Assuming date is in 'YYYY-MM-DD' format
      count: diary.rating || 1, // Replace with actual count logic if needed
    }));
    if (!lastYearData) {
      return;
    }console.log(JSON.stringify(lastYearData, null, 2)); // Pretty prints the object

    return(
      <>
        <CalendarHeatmap
  startDate={date}
  endDate={new Date()}
  values={lastYearData}
  // tooltipDataAttrs={value => {
  //         return {
  //           'data-tip': `${value.date} has count: ${
  //             value.count
  //           }`,
  //         };
  //       }}
  classForValue={value => {
          if (value) {
            return `heatmap-color-${value.count}`;
          }
          return `custom-color-empty`
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tooltip-id': 'heatmap-tooltip',  // Use 'data-tooltip-id' for Tooltip v5+
            'data-tooltip-content': `${value.date} has count: ${
              value.count
            }`,
          };
        }}

/>  
<Tooltip id="heatmap-tooltip" />  {/* Updated Tooltip usage */}

</>
    )
}

export default Heatmap