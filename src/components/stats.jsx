import React, { useState, useEffect } from 'react';
import { Statistic, Card, Row, Col, Spin } from 'antd';
import { IssuesCloseOutlined , InfoCircleOutlined, StopOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';


const Stats = ({confirmed, deaths, recovered}) => {
    
    return(
          <div className="row">
            <div className="col-md-4" >
              <Card className="radius1" style={{ width: "80%" }}>
                {!confirmed ? <Spin className="spin" /> :
                 <Statistic
                  title={<FormattedMessage id="home.cardConfirmed" />}
                  value={confirmed}
                  precision={0}
                  valueStyle={{ color: '#ef9115', fontSize:'2.5em'}}
                  prefix={<InfoCircleOutlined />}
                  suffix=""
                />}
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="radius1" style={{ width: "80%" }}>
                {!deaths ? <Spin className="spin" /> : 
                <Statistic
                  title={<FormattedMessage id="home.cardDeaths" />}
                  value={deaths}
                  precision={0}
                  valueStyle={{ color: '#cf1322', fontSize:'2.5em' }}
                  prefix={<StopOutlined />}
                  suffix=""
                />}
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="radius1" style={{ width: "80%" }}>
                {!recovered ? <Spin className="spin" /> :
                <Statistic
                  title={<FormattedMessage id="home.cardRecovered" />}
                  value={recovered}
                  precision={0}
                  valueStyle={{ color: '#3f8600', fontSize:'2.5em' }}
                  prefix={<IssuesCloseOutlined />}
                  suffix=""
                />}
              </Card>
            </div>
          </div>
    );
};

export default Stats