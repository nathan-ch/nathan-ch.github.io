import React, { useState, useEffect } from 'react';
import { DatePicker,Row, Col } from 'antd';
import moment from 'moment'


const DateChoice = ({dayChoice}) => {

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    return(    
            <div>
                <DatePicker 
                defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} onChange={dayChoice} />
            </div>
    );
}


export default DateChoice