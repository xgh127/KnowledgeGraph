import React from "react";
import { Layout } from "antd";

/**
 * 这是Header组件的定义，仅包含headerText属性，用于显示标题。
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const MyHeader = props => {
    return (
        <Layout.Header
            style={{
                backgroundSize: "cover", // 确保背景图片覆盖整个Sider
                backgroundRepeat: "no-repeat", // 防止背景图片重复
                backgroundPosition: "center", // 背景图片居中显示
                height: "120px",
                padding: 0,
                textAlign: "center",
                //设置字体样式
                fontFamily: "cursive",
                fontWeight: "bold",
                fontSize: "50px",
                //字体居中
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
            }}
        >
            {props.headerText}
        </Layout.Header>
    );
};
