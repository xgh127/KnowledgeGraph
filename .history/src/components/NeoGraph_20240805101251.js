import React, { useEffect, useRef, useState } from "react";
import { Card, Layout } from "antd";
import Neovis from "neovis.js";
import InfoDisplay from "./InfoDisplay";
import { SubGraph } from "./SubGraph";
import {allLabels} from "./Constant";

/**
 * 这是展示Neo4j图形的组件，它使用了Neovis.js库，它可以将Neo4j图形展示在网页上。
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NeoGraph = props => {
    //定义一个NeoGraph组件，接收props参数
    const {
        containerId, //容器id
        neo4jUri, //neo4jUri 地址
        neo4jUser, //neo4jUser 用户名
        neo4jPassword, //neo4jPassword 密码
        cypherQuery, //cypherQuery 查询语句
    } = props;

    const visRef = useRef(null); //创建一个ref对象,用于保存Neo4j对象
    const [subGraphCypher, setSubGraphCypher] = useState(null);// 存储子图的查询语句，用于展示选中节点的子图
    const [selectedNodeInfo, setSelectedNodeInfo] = useState(null); // 存储选中节点的详细信息

    useEffect(() => {
        try {
            const VisConfig = {
                containerId: visRef.current.id,
               neo4j: {
                    serverUrl: neo4jUri,
                    serverUser: neo4jUser,
                    serverPassword: neo4jPassword,
               },
                visConfig: {
                    nodes: {
                        shape: 'dot', //设置节点形状
                        // size: 20, //设置节点大小
                        font: {
                            size: 18,
                            color: "blue",
                        },
                    },
                    //含有箭头
                    edges: {
                        arrows: {
                            to: {enabled: true}
                        },

                    },
                },
                // 展示节点之间的关系在边上的配置代码
                relationships: {
                    [Neovis.NEOVIS_DEFAULT_CONFIG]: {
                        [Neovis.NEOVIS_ADVANCED_CONFIG]: {
                            function: {
                                label: rel => rel.type
                            }
                        }
                    }
                },
                //列出所有的label，并设置它们的配置
                labels: allLabels,
                initialCypher: cypherQuery,

            };
           //创建一个NeoVis实例
            const vis = new Neovis(VisConfig);
            //渲染NeoVis实例
            vis.render();
            // 添加点击节点的事件监听器,当点击节点时，设置选中节点的信息，并设置子图的查询语句
            vis.registerOnEvent("clickNode", e => {
                // e: { nodeId: number; node: Node }
                setSelectedNodeInfo(e.node.raw.properties);
                let name = e.node.raw.properties.name;
                let query = `MATCH p=(a)-[r]->(b) WHERE a.name='${name}' RETURN *`;
                //设置子图的查询语句
                setSubGraphCypher(query);
            });
        } catch (e) {
            console.error(e.message);
            console.log("failed to create NeoVis instance");
        }
    }, [neo4jUri, neo4jUser, neo4jPassword, cypherQuery]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* neo4j图形展示区域的侧边栏 */}
            <Layout.Sider
                width={300}
                height="100%"
                style={{
                    background: "#fff",
                    position: "fixed",
                    right: 0,
                    top: -8,
                    bottom: 0,
                    overflow: "auto",
                    zIndex: 1000,
                }}
            >
                {/* 选中节点信息展示区域 */}
                <Card
                    size="large"
                    style={{
                        width: "100%",
                        height: "100%", // 你希望Card的最大高度
                        overflowY: "auto", // 当内容超过高度时，显示垂直滚动条
                        overflowX: "hidden", // 隐藏水平滚动条
                        boxSizing: "border-box", // 确保padding和border不会增加Card的总宽度
                    }}
                    title="选中节点信息"
                >
                    <InfoDisplay
                        style={{ userSelect: "text" }}
                        selectedNodeInfo={selectedNodeInfo}
                    />
                </Card>
                {/* 子图展示区域 */}
                {/*<SubGraph*/}
                {/*    cypherQuery={subGraphCypher}*/}
                {/*    containerId={"id1"}*/}
                {/*    neo4jUri={neo4jUri}*/}
                {/*    neo4jUser={neo4jUser}*/}
                {/*    neo4jPassword={neo4jPassword}*/}
                {/*/>*/}
            </Layout.Sider>
            {/* 图形展示区域 */}
            <Layout.Content
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 300,
                        bottom: 0,
                    }}
                    id={containerId}
                    ref={visRef}
                />
            </Layout.Content>
        </Layout>
    );
};

/**
 * 将NeoGraph组件包装在一个div中，便于布局
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ResponsiveNeoGraph = props => {
    const { cypherQuery } = props;

    const neoGraphProps = {
        ...props,
        cypherQuery,
        backgroundColor: "white",
    };
    return (
        <div className="neoGraph-container">
            <NeoGraph {...neoGraphProps} />
        </div>
    );
};


export { NeoGraph, ResponsiveNeoGraph };
