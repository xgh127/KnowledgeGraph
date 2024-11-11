import React from 'react';
import { Table, Select, Row, Col, Card, Typography, Space } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

// 样式化表格容器
const TableContainer = styled.div`
  background: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const FaultTable = ({ data }) => {
    const uniqueYearMonth = new Set();
    data.forEach(item => {
        uniqueYearMonth.add(`${item.year}-${String(item.month).padStart(2, '0')}`);
    });

    const yearMonthOptions = Array.from(uniqueYearMonth).map(option => (
        <Select.Option key={option}>{option}</Select.Option>
    ));

    const [selectedYearMonth, setSelectedYearMonth] = React.useState(yearMonthOptions.length ? yearMonthOptions[0].key : null);

    const filteredData = data.filter(item =>
        `${item.year}-${String(item.month).padStart(2, '0')}` === selectedYearMonth
    );

    const handleYearMonthChange = value => {
        setSelectedYearMonth(value);
    };

    const columns = [
        {
            title: '站点名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <Text strong>{text}</Text>,
        },
        {
            title: `故障次数 (${selectedYearMonth})`,
            dataIndex: 'fault_count',
            key: 'fault_count',
            render: text => <Text type="secondary">{text}</Text>,
        },
    ];

    return (
        <TableContainer>
            <Card title="故障次数表格" extra={<Select
                defaultValue={selectedYearMonth}
                style={{ width: '100%' }}
                onChange={handleYearMonthChange}
                bordered={false}
            >
                {yearMonthOptions}
            </Select>}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Space size="large">
                            <Text type="secondary">选择年月:</Text>
                        </Space>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={false}
                    bordered
                    rowKey="name"
                />
            </Card>
        </TableContainer>
    );
};

export default FaultTable;