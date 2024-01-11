import * as echarts from 'echarts';
import React from "react";

export const useChartRef = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const resize = React.useCallback(() => {
        // Echartsのインスタンスは都度Domより取得する
        if (ref.current && echarts.getInstanceByDom(ref.current)) {
            echarts.getInstanceByDom(ref.current).resize();
        }
    }, []);

    const setChartOption = React.useCallback((opt: echarts.EChartOption) => {
        if (ref.current && echarts.getInstanceByDom(ref.current)) {
            const chartInstance = echarts.getInstanceByDom(ref.current);
            chartInstance.setOption(opt);
        }
    }, []);

    const chartIsReady = React.useCallback(() => {
        return ref.current && echarts.getInstanceByDom(ref.current);
    }, [ ref ]);

    React.useEffect(() => {
        if (ref.current && !echarts.getInstanceByDom(ref.current)) {
            echarts.init(ref.current);
            window.addEventListener('resize', () => {
                resize();
            });
        }
        return () => {
            if (chartIsReady()){
                echarts.getInstanceByDom(ref.current as HTMLDivElement).dispose();
            }
            window.removeEventListener('resize', () => {
                resize();
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        ref,
        resize,
        setChartOption,
        chartIsReady,
    };
};
﻿