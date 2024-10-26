import {Layout, Select, Space} from "antd";
import {ResponsiveNeoGraph} from "../components/NeoGraph";
import React from "react";
import Search from "antd/es/input/Search";

const { Content } = Layout;

function GraphView({
                             handleSearchTypeChange,
                             onSearch,
                             cypherQuery,
                             NEO4J_URI,
                             NEO4J_USER,
                             NEO4J_PASSWORD
                         }) {

    return (
        <Content>
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
        </Content>
    );
}

export default GraphView;