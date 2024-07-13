import React from "react";
import { List } from "antd";

/**
 * 用于在侧边渲染节点的属性展示出来
 * @param value
 * @param depth
 * @returns {JSX.Element|string}
 */
function renderValue(value, depth = 0) {
    // 递归函数，用于处理嵌套的对象和数组
    const fontSize = 14 + depth * 2; // 假设每次深度增加，字体大小增加 2px
    // 如果是数组，递归渲染数组中的每个元素
    if (Array.isArray(value)) {
        return (
            <pre style={{ fontSize: fontSize + "px", paddingLeft: depth * 10 }}>
        {value.map((item, index) => (
            <div key={index}>{renderValue(item, depth + 1)}</div>
        ))}
      </pre>
        );
    }
    // 如果是对象，递归渲染对象中的每个属性
    if (typeof value === "object" && value !== null) {
        return (
            <pre style={{ fontSize: 14 + depth, paddingLeft: depth * 10 }}>
        {Object.entries(value).map(([key, val]) => (
            <div key={key}>
                <strong>{key}:</strong> {renderValue(val, depth + 1)}
            </div>
        ))}
      </pre>
        );
    }
    // 对于非对象和数组的值，直接返回其字符串表示
    return value.toString();
}

/**
 * 展示节点的属性信息组件
 * @param selectedNodeInfo，选中的节点信息
 * @returns {JSX.Element}
 * @constructor
 */
function InfoDisplay({ selectedNodeInfo }) {
    /**
     * 渲染属性列表，返回 JSX 元素数组
     * @returns {*[]|null}
     */
    const renderAttributes = () => {
        // 如果没有选中的节点信息，返回 null
        if (!selectedNodeInfo) return null;

        // 创建一个列表项数组来展示属性
        const listItems = Object.entries(selectedNodeInfo).map(([key, value]) => (
            <List.Item key={key}>
                <List.Item.Meta
                    title={<span style={{ fontSize: "24px" }}>{key}</span>}
                    description={
                        renderValue(value) // 使用递归函数来渲染值
                    }
                />
            </List.Item>
        ));

        return listItems;
    };

    return (
        <div>
            <List>{renderAttributes()}</List>
        </div>
    );
}

export default InfoDisplay;
