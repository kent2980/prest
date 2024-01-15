import Chart from "./Chart";
import { EChartOption } from "echarts";
import React, { useEffect, useState } from 'react'
import { StockChartDataApi, StockChartDataItem, StockChartParams } from "../../services/FsstockApiServies";
import { Box } from "@chakra-ui/react";

type Props = {
    code: string;
}

const StockChart = (props: Props) => {

    const { code } = props;
    const [data, setData] = useState<StockChartDataItem[]>([]);
    const [option, setOption] = useState<EChartOption>();

    useEffect(() => {
        if (code !== "" && code.length === 4) {
            const list = new StockChartParams();
            list.code = code;
            StockChartDataApi.fetchData(list, true)
                .then(res => {
                    setData(res);
                    console.log(list);
                    console.log(res);
                    console.log(data);
                })
                .catch(er => console.log(er));
        } else {
            setData([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    useEffect(() => {
        const dateOnly: string[] = data.map(item => item.date);

        const price: [number, number, number, number][] = data.map(item => {
            return [
                item.open,
                item.close,
                item.low,
                item.high,
            ]
        })

        const optionData: EChartOption = {
            animation: true,
            xAxis: {
                data: dateOnly,
            },
            yAxis: {
                min: function (value) {
                    return value.min - (value.min / 20);
                }
            },
            series: [
                {
                    type: 'candlestick',
                    data: price
                }
            ]
        }
        setOption(optionData);
        console.log(option);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Box w={'100%'}>
            <Chart height="500px" className="Chart" option={option} />
        </Box>
    )
}

export default StockChart;