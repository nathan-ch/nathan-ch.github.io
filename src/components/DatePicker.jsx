import React, { useState, useEffect } from 'react';
import { DatePicker,Row, Col } from 'antd';
import moment from 'moment'


const DateChoice = ({dayChoice}) => {

    return(    
        <div>
                <DatePicker
                    onChange={dayChoice}
                    defaultValue={moment().subtract(2, 'days')}
                    dateRender={current => {
                    const style = {};
                    return (
                        <div className="ant-picker-cell-inner" style={style}>
                        {current.date()}
                        </div>
                    );
                    }}
                />
        </div>
    );
}

export default DateChoice