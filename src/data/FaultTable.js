// FaultTable.js
import React from 'react';
import {Table, Select, Row, Col, Card} from 'antd';

const months = [
    { month: 1, name: 'Jan' },
    { month: 2, name: 'Feb' },
    { month: 3, name: 'Mar' },
    { month: 4, name: 'Apr' },
    { month: 5, name: 'May' },
    { month: 6, name: 'Jun' },
    { month: 7, name: 'Jul' },
    { month: 8, name: 'Aug' },
    { month: 9, name: 'Sep' },
    { month: 10, name: 'Oct' },
    { month: 11, name: 'Nov' },
    { month: 12, name: 'Dec' },
];

const FaultTable = ({ data, selectedYear, selectedMonth, onYearChange, onMonthChange }) => {
    // 数据过滤逻辑
    console.log(data);
    console.log("selectedYear",selectedYear);
    console.log("selectedMonth",selectedMonth);
    const filteredData = data.filter(item =>{

   //将数据转化为可比较的数据
   //      const cmpYear = parseInt(selectedYear);
        const cmpMonth = parseInt(selectedMonth);
        const itemYear = parseInt(item.year);
        const itemMonth = parseInt(item.month);
        console.log(itemYear === selectedYear);
        console.log(itemMonth === cmpMonth);
        if(itemYear === selectedYear && itemMonth === cmpMonth){
            return item;
        }
    });

    console.log(filteredData);
    const columns = [
        {
            title: '站点名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: `故障次数 (${selectedYear}-${selectedMonth.toString().padStart(2, '0')})`,
            dataIndex: 'fault_count',
            key: 'fault_count',
        },
    ];

    return (
        <div>
            <Card title="故障次数表格"/>
            <Row>
                <Col span={12}>
                    <Select defaultValue={selectedYear} style={{ width: 120 }} onChange={onYearChange}>
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year =>
                            <Select.Option key={year}>{year}</Select.Option>
                        )}
                    </Select>
                </Col>
                <Col span={12}>
                    <Select defaultValue={selectedMonth} style={{ width: 120 }} onChange={onMonthChange}>
                        {months.map(month => (
                            <Select.Option key={month.month}>{month.name}</Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
};

export default FaultTable;