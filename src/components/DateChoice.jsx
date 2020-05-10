import React, { useState, useEffect } from 'react';
import { DatePicker,Row, Col } from 'antd';
import moment from 'moment'


const DateChoice = ({dayChoice}) => {

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    return(    
            <div>
                <DatePicker 
                defaultValue={moment().subtract(2, 'days')} format={dateFormatList} onChange={dayChoice} />
            </div>
    );
}


export default DateChoice