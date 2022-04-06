import React from 'react'

function Display({res}) {
    const body = slotInfo => {
        
        let totalSlotsBooked = 0;
        let totalSlotsEmpty = 0;
        slotInfo.forEach(element => {
            if(element.status === 1){
                totalSlotsEmpty = totalSlotsEmpty + 1;
            } else {
                totalSlotsBooked = totalSlotsBooked + 1;
            }
        });
        
        return(
        <div className='Court-column'>
            <div>Total Slots Booked: {totalSlotsBooked} </div>
            <div>Total Slots Empty: {totalSlotsEmpty}</div>
        </div>
        )      
    }
  return (
    <div className='Display-wrapper'>
        <div className='Display-header'>Slots Details for the day</div>
        {res !== null && res.data.courtList.map(val => 
            {
               return( 
               <div className='Court-header' key = {val.courtId}>
                    <div className='Court-detail'> 
                        <div className='Court-Name'>{val.courtName}</div>
                        {body(val.slotInfo)}
                    </div>
                </div>
                )
            })
        }
    </div>
  )
}

export default Display;