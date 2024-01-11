import * as echarts from 'echarts';
import * as React from 'react';
import styled from 'styled-components';

import { useChartRef } from '../../hooks/useChartRef';

interface IStyleProps {
    height: `${string}px`
}

const StyledWrapper = styled.div<IStyleProps>`
    width: 100%;
    height: ${(props) => props.height};
    text-align: center;
`;

interface IChartProps {
    height: `${string}px`
    option?: echarts.EChartOption
    className?: string
}

const Chart: React.FunctionComponent<IChartProps> = React.memo(({
    height,
    option,
    className,
}) => {
    const { ref: chartRef, setChartOption, chartIsReady } = useChartRef();

    React.useEffect(() => {
        if (chartIsReady() && option) {
            setChartOption(option);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [option]);

    return (
        <StyledWrapper height={height} className={className}>
            <div ref={chartRef} style={{ height }}></div>
        </StyledWrapper>
    );
});

export default Chart;