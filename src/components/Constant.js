/**
 * 自定义侧边栏菜单项
 * @type {[{query: string, label: string, key: string},{children: [{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},null,null,null,null], label: string, key: string},{children: [{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},null,null,null,null], label: string, key: string},{children: [{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},{query: string, label: string, key: string},null,null,null,null], label: string, key: string},{children: [{query: string, label: string, key: string},{query: string, label: string, key: string}], label: string, key: string},null,null]}
 */
export const menuItems = [
    {
        key: "overall",
        label: "总体框架",//总体框架,展示多少依据Cypher语句
        query: "MATCH p=(a {name: '云南国际'})-[r1]->(b)-[r2]->(c)-[r3]->(d) RETURN *",
        // query: "MATCH p=(a {name: '设计施工单位'})-[r1]->(b) RETURN *",
    },
    {
        key: "projectManagement",
        label: "项目管理",//项目管理,展示多少依据Cypher语句
        children: [
            {
                key: "laoqingshan",
                label: "老青山风场",
                query: "MATCH p=(a {name: '老青山风场'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "dgshan",
                label: "打挂山风场",
                query: "MATCH p=(a {name: '打挂山风场'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "small_white_dragon",
                label: "小白龙风场",
                query: "MATCH p=(a {name: '小白龙风场'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xrdshan",
                label: "仙人洞风场",
                query: "MATCH p=(a {name: '仙人洞风场'})-[r1]->(b)-[r2]->(c) RETURN *",
            },

            {
                key: "xiutianguangfu",
                label: "秀田光伏",
                query: "MATCH p=(a {name: '秀田光伏'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "damoguguangfu",
                label: "大莫古光伏",
                query: "MATCH p=(a {name: '大莫古光伏'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xxguangfu",
                label: "小西村光伏",
                query: "MATCH p=(a {name: '小西村光伏'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "bdguangfu",
                label: "北大村光伏",
                query: "MATCH p=(a {name: '北大村光伏'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "glxpguangfu",
                label: "关岭新铺光伏",
                query:
                    "MATCH p=(a {name: '关岭新铺光伏'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            // 其他子菜单项...
        ],
    },
    {
        key: "xiangmuguzhang",
        label: "项目故障",//项目故障,展示多少依据Cypher语句
        children: [
            {
                key: "lqsgz",
                label: "老青山故障",
                query: "MATCH p=(a {name: '老青山故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "dgshangz",
                label: "打挂山故障",
                query: "MATCH p=(a {name: '打挂山故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xblgz",
                label: "小白龙故障",
                query: "MATCH p=(a {name: '小白龙故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xrdshangz",
                label: "仙人洞故障",
                query: "MATCH p=(a {name: '仙人洞故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },

            {
                key: "xiutianguangfugz",
                label: "秀田故障",
                query: "MATCH p=(a {name: '秀田故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "damoguguangfugz",
                label: "大莫古故障",
                query: "MATCH p=(a {name: '大莫古故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xxguangfugz",
                label: "小西村故障",
                query: "MATCH p=(a {name: '小西村故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "bdguangfugz",
                label: "北大村故障",
                query: "MATCH p=(a {name: '北大村故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "glxpguangfugz",
                label: "关岭新铺故障",
                query: "MATCH p=(a {name: '关岭新铺故障'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            // 其他子菜单项...
        ],
    },
    {
        key: "operationData",
        label: "运营数据",
        children: [
            {
                key: "lqsqqsj",
                label: "老青山运营数据",
                query:
                    "MATCH p=(a {name: '老青山运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "dgsqqsj",
                label: "打挂山运营数据",
                query:
                    "MATCH p=(a {name: '打挂山运营数据'})-[r1]->(b)-[r2]->(c)-[r3]->(d) RETURN *",
            },
            {
                key: "xblqsj",
                label: "小白龙运营数据",
                query:
                    "MATCH p=(a {name: '小白龙运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xrdcyysj",
                label: "仙人洞运营数据",
                query:
                    "MATCH p=(a {name: '仙人洞运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xxcyysj",
                label: "小西村运营数据",
                query:
                    "MATCH p=(a {name: '小西村运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "dmgyysj",
                label: "大莫古运营数据",
                query:
                    "MATCH p=(a {name: '大莫古运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "bdcyysj",
                label: "北大村运营数据",
                query:
                    "MATCH p=(a {name: '北大村运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "xtyysj",
                label: "秀田运营数据",
                query:
                    "MATCH p=(a {name: '秀田运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
            {
                key: "glxfyysj",
                label: "关岭新铺运营数据",
                query:
                    "MATCH p=(a {name: '关岭新铺运营数据'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
        ],
    },
    {
        key: "supplyChain",
        label: "大部件供应链",
        children: [
            {
                key: "gddbj",
                label: "光伏设备厂商",
                query:
                    "MATCH p=(a {name: '光电大部件公司'})-[r1]->(b)-[r2]->(c) RETURN *",
            },

            {
                key: "fddbj",
                label: "风机大部件厂商",
                query:
                    "MATCH p=(a {name: '风电大部件公司'})-[r1]->(b)-[r2]->(c) RETURN *",
            },
        ],
    },
    {
        key: "newEnergyPolicy",
        label: "新能源政策",
        query: "MATCH p=(a {name:'新能源政策法规'})-[r1]->(b)-[r2]->(c)  RETURN *",
    },
    {
        key: "dataUpdate",
        label: "数据更新",
        query: "MATCH p=()-[r:`属于`]->() RETURN p LIMIT 25",
    },
    // 可以根据需要继续添加更多菜单项
];
/**
 * 所有节点的标签
 * @type {string[]}
 */
export const labelList = [
    "SVG厂家",
    "一级节点",
    "上华新能源无锡",
    "上海电气",
    "上能电气",
    "东方日升光伏",
    "东方日升新能源",
    "东方电气",
    "中清光伏",
    "中电电气光伏",
    "中节能太阳能",
    "主机厂家",
    "主齿轮箱厂家",
    "二级节点",
    "云南国际项目",
    "亿晶光电",
    "供应商",
    "偏航轴承厂家",
    "光伏支架厂家",
    "光电供应商",
    "公司消缺项",
    "具体故障风机",
    "具体风机故障信息",
    "功率预测系统厂家",
    "北京ABB电气传动系统",
    "华为技术",
    "华耀光伏科技",
    "发电机厂家",
    "变桨轴承厂家",
    "变频器厂家",
    "叶片厂家",
    "哈电风能",
    "广东易事特电源",
    "故障",
    "整体故障信息",
    "新能源政策法规",
    "易事特集团",
    "晶科能源",
    "正泰新能源",
    "气象系统厂家",
    "汇流箱厂家",
    "浙江乐叶光伏",
    "海润光伏",
    "电力价格",
    "电力市场",
    "电池组件厂家",
    "监控系统厂家",
    "箱变厂家",
    "箱变测控厂家",
    "老青山主机设备",
    "许继电气",
    "许继集团",
    "许继风电",
    "设计施工单位名",
    "轮毂厂家",
    "辐照计厂家",
    "运营单位名",
    "运营情况",
    "运营故障",
    "远景能源",
    "逆变器厂家",
    "通威光伏科技",
    "重庆海装",
    "金风科技",
    "隆基绿能",
    "项目故障",
    "项目消缺项",
    "项目节点",
    "风场大部件",
    "风机",
    "风机发电量数据",
    "风机子节点",
    "风电供应商",
    "黄河上游水电开发西宁分公司"
];



/**
 * 自定义搜索类型
 * 0: 按名称搜索下一层节点
 * 1: 按名称搜索上一层节点
 * 2: 按名称搜索上下各一层节点
 * 3: 按名称搜索下两层节点
 * 4: 按名称搜索上两层节点
 * 5: 按名称搜索上下各两层节点
 * @type {[{cypher: string, type: number},{cypher: string, type: number},{cypher: string, type: number},{cypher: string, type: number}]}
 */
export const searchTypeToCypher = [
    {
        type: 0,
        cypher: "MATCH p=(a)-[r1]->(b) WHERE a.name =~ '.*${target}.*' RETURN *",
    },
    {
        type: 1,
        cypher: "MATCH p=(a)-[r1]->(b) WHERE b.name =~ '.*${target}.*' RETURN *",
    },
    {
        type: 2,
        cypher:
            "MATCH p=(a)-[r1]->(b)-[r2]->(c) WHERE b.name =~ '.*${target}.*' RETURN *",
    },
    {
        type: 3,
        cypher:
            "MATCH p=(a)-[r1]->(b)-[r2]->(c) WHERE a.name =~ '.*${target}.*' RETURN *",
    },
];
export const allRelationships = [
    "供应商",
    "风机故障",
    "风机故障检测",
    "风机信息",
    "运营故障",
    "设计施工单位",
    "设计施工单位名称",
    "风电项目",
    "主变压器",
    "主机",
    "主机厂家",
    "供应商",
    "光电项目",
    "全委托",
    "公司",
    "公司消缺项",
    "属于",
    "市场分析",
    "市场参与者",
    "整体",
    "机组变压器",
    "电力价格",
    "电力市场",
    "电力政策",
    "老青山项目故障",
    "自主运维",
    "运营",
    "运营单位",
    "项目消缺项",
    "风场项目",
    "风机分支",
    "风机发电数据",
    "10号风机",
    "11号风机",
    "12号风机",
    "13号风机",
    "14号风机",
    "15号风机",
    "16号风机",
    "17号风机",
    "18号风机",
    "19号风机",
    "1号风机",
    "20号风机",
    "21号风机",
    "22号风机",
    "23号风机",
    "24号风机",
    "25号风机",
    "26号风机",
    "27号风机",
    "28号风机",
    "29号风机",
    "2号风机",
    "30号风机",
    "31号风机",
    "32号风机",
    "33号风机",
    "3号风机",
    "4号风机",
    "5号风机",
    "6号风机",
    "7号风机",
    "8号风机",
    "9号风机",
];

export const allLabels =
    {
        SVG厂家: {label: "name"},
        一级节点: {label: "name"},
        上华新能源无锡: {label: "name"},
        上海电气: {label: "name"},
        上能电气: {label: "name"},
        东方日升光伏: {label: "name"},
        东方日升新能源: {label: "name"},
        东方电气: {label: "name"},
        中清光伏: {label: "name"},
        中电电气光伏: {label: "name"},
        中节能太阳能: {label: "name"},
        主机厂家: {label: "name"},
        主齿轮箱厂家: {label: "name"},
        二级节点: {label: "name",shape:"dot"},
        云南国际项目: {label: "name"},
        亿晶光电: {label: "name"},
        供应商: {label: "name"},
        偏航轴承厂家: {label: "name"},
        光伏支架厂家: {label: "name"},
        光电供应商: {label: "name"},
        公司消缺项: {label: "name"},
        具体故障风机: {label: "name"},
        具体风机故障信息: {label: "name"},
        功率预测系统厂家: {label: "name"},
        北京ABB电气传动系统: {label: "name"},
        华为技术: {label: "name"},
        华耀光伏科技: {label: "name"},
        发电机厂家: {label: "name"},
        变桨轴承厂家: {label: "name"},
        变频器厂家: {label: "name"},
        叶片厂家: {label: "name"},
        哈电风能: {label: "name"},
        广东易事特电源: {label: "name"},
        故障: {label: "name"},
        整体故障信息: {label: "name"},
        新能源政策法规: {label: "name"},
        易事特集团: {label: "name"},
        晶科能源: {label: "name"},
        正泰新能源: {label: "name"},
        气象系统厂家: {label: "name"},
        汇流箱厂家: {label: "name"},
        浙江乐叶光伏: {label: "name"},
        海润光伏: {label: "name"},
        电力价格: {label: "name"},
        电力市场: {label: "name"},
        电池组件厂家: {label: "name"},
        监控系统厂家: {label: "name"},
        箱变厂家: {label: "name"},
        箱变测控厂家: {label: "name"},
        老青山主机设备: {label: "name"},
        许继电气: {label: "name"},
        许继集团: {label: "name"},
        许继风电: {label: "name"},
        设计施工单位名: {label: "name"},
        轮毂厂家: {label: "name"},
        辐照计厂家: {label: "name"},
        运营单位名: {label: "name"},
        运营情况: {label: "name"},
        运营故障: {label: "name"},
        远景能源: {label: "name"},
        逆变器厂家: {label: "name"},
        通威光伏科技: {label: "name"},
        重庆海装: {label: "name"},
        金风科技: {label: "name"},
        隆基绿能: {label: "name"},
        项目故障: {label: "name"},
        项目消缺项: {label: "name"},
        项目节点: {label: "name"},
        风场大部件: {label: "name"},
        风机: {label: "name"},
        风机发电量数据: {label: "name"},
        风机子节点: {label: "name"},
        风电供应商: {label: "name"},
        黄河上游水电开发西宁分公司: {label: "name"},

    }
