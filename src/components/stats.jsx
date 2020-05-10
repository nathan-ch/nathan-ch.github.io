import React, { useState, useEffect } from 'react';
import { Statistic, Card, Row, Col, Spin } from 'antd';
import { IssuesCloseOutlined , InfoCircleOutlined, StopOutlined } from '@ant-design/icons';

const Stats = ({confirmed, deaths, recovered}) => {
    
    return(
          <div className="site-statistic-demo-card">
        <Row gutter={[64, 64]} justify="space-around" align="middle">
          <Col className="gutter-row" span={24}>
            <Card style={{ width: "65%" }}>
              {!confirmed && <Spin className="spin" />}
              {confirmed && <Statistic
                title="Cas confirmés"
                value={confirmed}
                precision={0}
                valueStyle={{ color: '#ef9115' }}
                prefix={<InfoCircleOutlined />}
                suffix=""
              />}
            </Card>
          </Col>
          <Col className="gutter-row" span={24}>
            <Card style={{ width: "65%" }}>
              {!deaths && <Spin className="spin" />}
              {deaths && <Statistic
                title="Morts"
                value={deaths}
                precision={0}
                valueStyle={{ color: '#cf1322' }}
                prefix={<StopOutlined />}
                suffix=""
              />}
            </Card>
          </Col>
          <Col className="gutter-row" span={24}>
            <Card style={{ width: "65%" }}>
              {!recovered && <Spin className="spin" />}
              {recovered && <Statistic
                title="Cas guéris"
                value={recovered}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<IssuesCloseOutlined />}
                suffix=""
              />}
            </Card>
          </Col>
        </Row>
      </div>
    );
};

export default Stats