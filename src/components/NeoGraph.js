import React, { useEffect, useRef, useState } from "react";
import { Card, Layout } from "antd";
import Neovis from "neovis.js";
import InfoDisplay from "./InfoDisplay";
import { SubGraph } from "./SubGraph";
import {allLabels} from "./Constant";
//这是展示Neo4j图形的组件，它使用了Neovis.js库，它可以将Neo4j图形展示在网页上。

const NeoGraph = props => {
    //定义一个NeoGraph组件，接收props参数
    const {
        containerId, //容器id
        neo4jUri, //neo4jUri 地址
        neo4jUser, //neo4jUser 用户名
        neo4jPassword, //neo4jPassword 密码
        cypherQuery, //cypherQuery 查询语句
    } = props;

    const visRef = useRef(); //创建一个ref对象,用于保存Neo4j对象
    // useEffect 是一个React hook，它可以让你在函数组件中执行一些有副作用的操作，比如获取数据，设置状态，或者订阅一些事件。
    const [subGraphCypher, setSubGraphCypher] = useState(null);
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
                        size: 20, //设置节点大小
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
                arrows: true,
                initialCypher: cypherQuery,

            };

            const vis = new Neovis(VisConfig);
            if (vis) {
                console.log("NeoVis instance created successfully before render");
                vis.render();

                console.log("NeoVis instance created successfully");
            } else {
                console.log('Neovis instance is undefined');
            }
            vis.render();
            console.log("pwd = " + neo4jPassword+" user = " + neo4jUser + " uri= " + neo4jUri);
            // 添加点击节点的事件监听器
            vis.registerOnEvent("clickNode", e => {
                // e: { nodeId: number; node: Node }
                console.log(JSON.stringify(e.node.raw.properties));
                setSelectedNodeInfo(e.node.raw.properties);
                let name = e.node.raw.properties.name;
                console.log("name" + name);
                let query = `MATCH p=(a)-[r]->(b) WHERE a.name='${name}' RETURN *`;
                setSubGraphCypher(query);

            });
        } catch (e) {
            console.error(e.message);
            console.log("failed to create NeoVis instance");
        }
    }, [neo4jUri, neo4jUser, neo4jPassword, cypherQuery]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
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
                        height: "40%", // 你希望Card的最大高度
                        overflowY: "auto", // 当内容超过高度时，显示垂直滚动条
                        overflowX: "hidden", // 隐藏水平滚动条
                        boxSizing: "border-box", // 确保padding和border不会增加Card的总宽度
                    }}
                    title="选中节点信息"
                >
                    <InfoDisplay
                        style={{ userSelect: "text" }}
                        selectedInputInfo={selectedNodeInfo}
                    />
                </Card>
                <SubGraph
                    cypherQuery={subGraphCypher}
                    containerId={"id1"}
                    neo4jUri={neo4jUri}
                    neo4jUser={neo4jUser}
                    neo4jPassword={neo4jPassword}
                />
            </Layout.Sider>
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

//这是一个响应式NeoGraph组件，它会根据窗口大小自动调整大小。
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
