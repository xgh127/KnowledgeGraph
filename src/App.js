import React, { useState } from "react";
import { Input, Layout, Menu, Select, Space } from "antd";
import { MyHeader } from "./components/MyHeader";
import { ResponsiveNeoGraph } from "./components/NeoGraph";
import "./App.css";
import { menuItems, searchTypeToCypher } from "./components/Constant";
const { Search } = Input;
/**
 * 数据库连接信息
 * @type {string}
 */
const NEO4J_URI = "bolt://localhost:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "test1234";
// const NEO4J_URI = "bolt://172.16.20.148:7688";
// const NEO4J_USER = "neo4j";
// const NEO4J_PASSWORD = "q1w2e3r4";

/**
 * App组件，包含了整个页面的布局，以及图谱的渲染
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  //初始化cypher查询语句
  const [cypherQuery, setCypherQuery] = useState(
      "MATCH p=(a {name: '云南国际'})-[r1]->(b)-[r2]->(c) RETURN *"
  );
  //初始化搜索类型
  const [searchType, setSearchType] = useState(0);

  /**
   * 渲染菜单项，递归渲染子菜单
   * @param items 菜单项数组
   * @param depth 菜单深度
   * @returns {*}
   */
  const renderMenuItems =(items, depth)=> {
    return items.map(({ key, label, query, children }) => {
      const fontsize = 20 - depth * 4; // 每深入一层，字体大小减2px
      const menuItemStyle = {
        fontSize:fontsize < 8 ? 8 : fontsize,// 字体大小最小为8px，最大为20px
      };

      /**
       * 点击菜单项时，设置cypher查询语句，用于渲染图谱
       */
      const handleClick = () => {
        setCypherQuery(query);
      };
      // 如果有子菜单，递归渲染子菜单
      if (children ) {
        return (
            <Menu.SubMenu key={key} title={<span style={menuItemStyle}>{label}</span>}>
              {renderMenuItems(children, depth + 1)}
            </Menu.SubMenu>
        );
      }
      return (
          <Menu.Item key={key} onClick={handleClick} style={menuItemStyle} >
            {label}
          </Menu.Item>
      );
    });
  };
  /**
   * 处理搜索类型改变事件，设置搜索类型，用于生成cypher查询语句
   * @param value
   */
  const handleSearchTypeChange = value => {
    setSearchType(value);
  };

  /**
   * 处理搜索事件，设置cypher查询语句，用于渲染图谱
   * @param value
   */
  const onSearch = value => {
    let cypher = searchTypeToCypher[searchType].cypher.replace(
        "${target}",
        value
    );
    setCypherQuery(cypher);
  };

  return (
      <Layout>
        <MyHeader headerText="电力知识图谱" />
        <Layout>
          {/* 左侧菜单栏 */}
          <Layout.Sider
              // width={240}
              theme="light"
          >
            <Menu
                theme="light"
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "20px",
                  textAlign: "center",
                }}
                // mode="inline"
            >
              {renderMenuItems(menuItems,0)}
            </Menu>
          </Layout.Sider>
          {/* 右侧图谱区域 */}
          <Layout.Content>
            <div style={{ display: "flex", justifyContent: "space-between",height: "22px" }}>
              {/* 搜索栏 */}
              <Space.Compact style={{ width: "100%",height: "100%" }}>
                <Select
                    style={{ width: "25%", textAlign: "center" }}
                    defaultValue="0"
                    onChange={handleSearchTypeChange}
                >
                  <Select.Option value="0" style={{ textAlign: "center" }}>
                    按名称搜索下一层节点
                  </Select.Option>
                  <Select.Option value="1" style={{ textAlign: "center" }}>
                    按名称搜索上一层节点
                  </Select.Option>
                  <Select.Option value="2" style={{ textAlign: "center" }}>
                    按名称搜索上下各一层节点
                  </Select.Option>
                  <Select.Option value="3" style={{ textAlign: "center" }}>
                    按名称搜索下两层节点
                  </Select.Option>
                  <Select.Option value="4" style={{ textAlign: "center" }}>
                    按名称搜索上两层节点
                  </Select.Option>
                  <Select.Option value="5" style={{ textAlign: "center" }}>
                    按名称搜索上下各两层节点
                  </Select.Option>
                </Select>
                <Search
                    placeholder="输入查询关键字"
                    size={"middle"}
                    style={{ width: "75%" }}
                    onSearch={onSearch}
                />
              </Space.Compact>
            </div>
            {/* 图谱渲染区域 */}
            <ResponsiveNeoGraph
                cypherQuery={cypherQuery}
                containerId={"id0"}
                neo4jUri={NEO4J_URI}
                neo4jUser={NEO4J_USER}
                neo4jPassword={NEO4J_PASSWORD}
            />
          </Layout.Content>
        </Layout>
      </Layout>
  );
}

export default App;
