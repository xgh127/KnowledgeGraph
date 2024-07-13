import React, { useEffect, useRef, useState } from "react";
import Neovis from "neovis.js/dist/neovis.js";
import {allLabels} from "./Constant";

/**
 * 这是neo4j子图的组件，和neoGraph组件不同的是它没有绑定节点点击事件
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SubGraph = props => {
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
    useEffect(() => {
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
                    }

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
            labels: allLabels,
            arrows: true,
            initialCypher: cypherQuery,

        };
        try {
            const vis = new Neovis(VisConfig);
            vis.render();
            // 添加点击节点的事件监听器
        } catch (e) {
            console.error(e);
        }
        //添加点击边的事件监听器
    }, [neo4jUri, neo4jUser, neo4jPassword, cypherQuery]);

    return (
        <div
            id={containerId}
            ref={visRef}
            style={{ width: "100%", height: "60%", border: "1px solid #ccc" }}
        />
    );
};
export { SubGraph };
