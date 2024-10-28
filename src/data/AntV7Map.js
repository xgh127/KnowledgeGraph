import React, { useEffect, useRef } from 'react';
import { Scene, PolygonLayer, LineLayer, PointLayer } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import { Popup } from '@antv/l7';

const AntVL7Map = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        // 初始化地图场景
        console.log("渲染地图~~");

        const scene = new Scene({
            id: mapRef.current,
            map: new Mapbox({
                pitch: 0,
                style: "blank",
                center: [116.368652, 39.93866],
                zoom: 10.07
            })
        });

        scene.on("loaded", () => {
            // 加载中国行政区划数据
            fetch(process.env.PUBLIC_URL + 'assets/china-divisions.json')
                .then(res => res.json())
                .then(data => {
                    const chinaPolygonLayer = new PolygonLayer({
                        autoFit: true
                    }).source(data);

                    chinaPolygonLayer
                        .color("name", [
                            "rgb(239,243,255)",
                            "rgb(189,215,231)",
                            "rgb(107,174,214)",
                            "rgb(49,130,189)",
                            "rgb(8,81,156)"
                        ])
                        .shape("fill")
                        .style({
                            opacity: 1
                        });
                    // chinaPolygonLayer.active(true); //  开启默认高亮效果
                     chinaPolygonLayer.active({ color: "red" }); // 开启并设置高亮颜色为红色

                    // 图层边界
                    const layer2 = new LineLayer({
                        zIndex: 2
                    })
                        .source(data)
                        .color("rgb(93,112,146)")
                        .size(0.6)
                        .style({
                            opacity: 1
                        });

                    scene.addLayer(chinaPolygonLayer);
                    scene.addLayer(layer2);
                    fetch(`${process.env.PUBLIC_URL}/assets/suppliers.json`)
                        .then(res => res.json())
                        .then(suppliers => {
                            // 为每个省份添加供应商信息
                            chinaPolygonLayer.on('mousemove', (e) => {
                                // console.log("省份",e.feature.properties.name);
                                const provinceName = e.feature.properties.name;
                                const supplierInfo = suppliers.find(s =>{
                                    console.log("s.name",s.name);
                                    console.log("省份provinceName",provinceName);
                                    return s.name === provinceName;
                                });
                                console.log("供应商",suppliers);
                                console.log("供应商信息",supplierInfo);
                                if (supplierInfo) {
                                    const popup = new Popup()
                                        .setLnglat(e.lngLat)
                                        .setHTML(`<span>省份: ${provinceName}</span><br><span>供应商: ${supplierInfo.suppliers.join(', ')}</span>`);
                                    scene.addPopup(popup);
                                }
                            });

                            chinaPolygonLayer.on('mouseleave', () => {
                                scene.removePopup();
                            });
                        });
                });


            // 加载标注数据
            fetch(process.env.PUBLIC_URL + 'assets/labels.json')
                .then(res => res.json())
                .then(data => {
                    const labelLayer = new PointLayer({
                        zIndex: 5
                    })
                        .source(data, {
                            parser: {
                                type: "json",
                                coordinates: "center"
                            }
                        })
                        .color("#fff")
                        .shape("name", "text")
                        .size(12)
                        .style({
                            opacity: 1,
                            stroke: "#fff",
                            strokeWidth: 0,
                            padding: [5, 5],
                            textAllowOverlap: false
                        });

                    scene.addLayer(labelLayer);
                });
        });

        // 组件卸载时销毁场景
        return () => {
            scene.destroy();
        };
    }, []);

    return <div ref={mapRef} style={{ height: '100vh' }} />;
};

export default AntVL7Map;