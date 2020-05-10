import React, { useState, useEffect } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { IssuesCloseOutlined , InfoCircleOutlined, StopOutlined } from '@ant-design/icons';

const Stats = ({confirmed, deaths, recovered}) => {
    
    return(
          <div className="site-statistic-demo-card">
        <Row gutter={[64, 64]} justify="space-around" align="middle">
          <Col className="gutter-row" span={24}>
            <Card style={{ width: "65%" }}>
              <Statistic
                title="Cas confirmés"
                value={confirmed}
                precision={0}
                valueStyle={{ color: '#ef9115' }}
                prefix={<InfoCircleOutlined />}
                suffix=""
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={24}>
            <Card style={{ width: "65%" }}>
              <Statistic
                title="Morts"
                value={deaths}
                precision={0}
                valueStyle={{ color: '#cf1322' }}
                prefix={<StopOutlined />}
                suffix=""
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={24}>
            <Card style={{ width: "65%" }}>
              <Statistic
                title="Cas guéris"
                value={recovered}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<IssuesCloseOutlined />}
                suffix=""
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
};

export default Stats