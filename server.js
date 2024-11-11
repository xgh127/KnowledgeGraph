const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

// 使用 CORS 中间件
app.use(cors());
app.use(express.json());

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // 替换为你的 MySQL 用户名
    password: '123456', // 替换为你的 MySQL 密码
    database: 'demo_db' // 替换为你的数据库名称
});

// 连接到 MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// 创建一个 API 路由
app.get('/api/fault_data', (req, res) => {
    const query = "  SELECT name,YEAR(date) AS year,MONTH(date) AS month,COUNT(*) AS fault_count FROM fault_sum GROUP BY station_id,YEAR(date),MONTH(date) ORDER BY  station_id,year,month;"
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
app.get('/api/power_data', (req, res) => {
    const query = "SELECT name,YEAR(STR_TO_DATE(date, '%Y-%m-%dT%H:%i:%s.%fZ')) AS year,MONTH(STR_TO_DATE(date, '%Y-%m-%dT%H:%i:%s.%fZ')) AS month,SUM(total_power) AS total_power_generated FROM power_sum GROUP BY name,  year,  month ORDER BY name, year, month;"

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});