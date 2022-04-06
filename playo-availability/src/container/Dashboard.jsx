import React, {useState} from 'react'
import Display from '../component/Display';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClipLoader from "react-spinners/ClipLoader";

function Dashboard() {
    const [result, setResult] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState(null)

    const formatDate = date =>  {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const revenue = () => {
        let rev = 0;
        if(result !== null){
            let totalSlotsBooked = 0;
            result.data.courtList.forEach(val => {
                val.slotInfo.forEach(element => {
                    if(element.status === 0){
                        totalSlotsBooked = totalSlotsBooked + 1;
                    }
                });    
                
            });
            rev = totalSlotsBooked * 200;       
        }
        return rev;
    }   

    const handleClick = async () => {
        console.log('Clicked Bookings');
        if (selectedDate === null){
            alert('Please select a date');
            return;
        }
        isLoading(true);
        console.log(selectedDate);
        const inputDate = formatDate(selectedDate);
        console.log(inputDate)
        const response = await fetch(`https://playo.club/book-api/v5/availability/e63abe94-2547-409a-9b30-82cbcec2c468/SP4/${inputDate}/?userId=7406560606&deviceType=99`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'b4ee93df154de37b0e38aa6a5dfda071aa751bfa'    
                }
            });
        console.log(response);
        if(response.status === 200){
            const res = await response.json();
            console.log(res);
            setResult(res);
        } else {
            setError('Ooops!! Something went wrong.. please try again');
        }
        isLoading(false);
    }

  return (
    <div className='Main'>
        <div className='Header'>Playo Dashboard</div>
        <div className='Datepicker-wrapper'>
            <DatePicker
                selected = {selectedDate}
                onChange = {date => setSelectedDate(date)}
                dateFormat = 'dd/MM/yyyy'
                placeholderText="Please select a date"
                className='Datepicker'
            />
        </div>
        <button className='Button' onClick={handleClick}>Check Bookings</button>
        <ClipLoader loading={loading} size={150} />
        { loading === false && error === null && <Display res={result}/>}
        { error !== null && <div>{error}</div>}
        <div className='Revenue'>Revenue of the day: <span className='Revenue-amount'>Rs. {revenue()}</span></div>
    </div>
  )
}

export default Dashboard;