import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const AllCountries = ({ countryChoice , data }) => {
    
    const { Option } = Select;
    data = data.sort(function(a, b){
        var textA=a.text.toLowerCase(), textB=b.text.toLowerCase()
        if (textA < textB) //sort string ascending
            return -1 
        if (textA > textB)
            return 1
        return 0 //default return value (no sorting)
    })    
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);
      
    return (
        <div>
            <Select
            style={{ width: '30%' }}
            placeholder="sélectionnez un pays"
            defaultValue={['France']}
            onChange={countryChoice}
            optionLabelProp="label"

            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options}
          </Select>
        </div>
        )
    }

export default AllCountries