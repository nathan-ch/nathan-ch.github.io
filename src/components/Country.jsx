import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const Country = ({countryChoice}) => {
    
    const { Option } = Select;
    
  return(
    <Select
        style={{ width: '100%' }}
        placeholder="Sélectionne un pays"
        defaultValue={'global'}
        onChange={countryChoice}
        optionLabelProp="label"
        size="large"
    >   
        <Option value="global" label="Global">
        <div className="demo-option-label-item">
            <span role="img" aria-label="Global">
            🌍 
            </span>
            Global
        </div>
        </Option>
        <Option value="france" label="France">
        <div className="demo-option-label-item">
            <span role="img" aria-label="France">
            🇫🇷
            </span>
            France
        </div>
        </Option>
        <Option value="spain" label="Spain">
        <div className="demo-option-label-item">
            <span role="img" aria-label="Spain">
            🇪🇸
            </span>
            Spain
        </div>
        </Option>
        <Option value="united-states" label="USA">
        <div className="demo-option-label-item">
            <span role="img" aria-label="USA">
            🇺🇸
            </span>
            USA
        </div>
        </Option>
        <Option value="japan" label="Japan">
        <div className="demo-option-label-item">
            <span role="img" aria-label="Japan">
            🇯🇵
            </span>
            Japan
        </div>
        </Option>
        <Option value="korea-south" label="Korea">
        <div className="demo-option-label-item">
            <span role="img" aria-label="Korea">
            🇰🇷
            </span>
            Korea
        </div>
        </Option>
        <Option value="Italy" label="Italy">
        <div className="demo-option-label-item">
            <span role="img" aria-label="Italy">
            🇮🇹
            </span>
            Italy
        </div>
        </Option>
    </Select>
    );
};

export default Country