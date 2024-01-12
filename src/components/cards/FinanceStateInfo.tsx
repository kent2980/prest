import React, { useEffect, useState } from 'react';
import { Box, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import { FinanceStateQuery, ContextMember, ContextScale, FinanceStateQueryBase, ReportDetailCat, UnitRef, FinanceStateQueryBK, ElementLabel, FinanceStateQueryIR } from '../../query/FinanceStateQuery';
import { ExplainItemApi, ExplainItemDataItem, ExplainItemParams } from '../../services/FsstockApiServies';

type Props = {
    explainId: string;
    industry: string;
}

const FinancialStateInfo = (props: Props) => {
    const { explainId, industry } = props;
    const [items, setItems] = useState<FinanceStateQueryBase>();

    function getQuery(response: ExplainItemDataItem[]): FinanceStateQueryBase {
        switch (industry) {
            case "7050":
                return new FinanceStateQueryBK(response);

            case "8050":
                return new FinanceStateQueryIR(response);

            default:
                return new FinanceStateQuery(response);
        }

    }

    function getItem(items: FinanceStateQueryBase, label: ElementLabel, unitRef: UnitRef): ExplainItemDataItem {
        const item = items.setContextMenber(ContextMember.RESULT_MEMBER)
            .setContextScale(ContextScale.CURRENT)
            .setElementLabel(label)
            .setUnitref(unitRef)
            .setReportDetailCat(ReportDetailCat.SM)
            .getItem()[0];

        return item;
    }

    useEffect(() => {
        if (explainId !== "") {
            const list = new ExplainItemParams();
            list.explain = explainId;
            list.current_context = true;
            list.report_detail_cat = "sm"
            ExplainItemApi.fetchData(list)
                .then(res => {
                    const states = getQuery(res);
                    setItems(states);
                })
        }
    }, [explainId]);

    return (
        <VStack>
            {items ?
                <StatGroup w={'500px'} border={'1px'} borderColor={'gray.300'} borderRadius={'10px'} padding={'10px'} >
                    <Stat>
                        <StatLabel>売上高</StatLabel>
                        <StatNumber>{parseInt(getItem(items, ElementLabel.売上高, UnitRef.JPY)?.numeric ?? "").toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={parseFloat(getItem(items, ElementLabel.売上高変化率, UnitRef.PURE)?.numeric ?? "") > 0 ? 'increase' : 'decrease'} />
                            {parseFloat(getItem(items, ElementLabel.売上高変化率, UnitRef.PURE)?.numeric ?? "")}%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>営業利益</StatLabel>
                        <StatNumber>{parseInt(getItem(items, ElementLabel.営業利益, UnitRef.JPY)?.numeric ?? "").toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={parseFloat(getItem(items, ElementLabel.営業利益変化率, UnitRef.PURE)?.numeric ?? "") > 0 ? 'increase' : 'decrease'} />
                            {parseFloat(getItem(items, ElementLabel.営業利益変化率, UnitRef.PURE)?.numeric ?? "")}%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>経常利益</StatLabel>
                        <StatNumber>{parseInt(getItem(items, ElementLabel.経常利益, UnitRef.JPY)?.numeric ?? "").toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={parseFloat(getItem(items, ElementLabel.経常利益変化率, UnitRef.PURE)?.numeric ?? "") > 0 ? 'increase' : 'decrease'} />
                            {parseFloat(getItem(items, ElementLabel.経常利益変化率, UnitRef.PURE)?.numeric ?? "")}%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>純利益</StatLabel>
                        <StatNumber>{parseInt(getItem(items, ElementLabel.純利益, UnitRef.JPY)?.numeric ?? "").toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={parseFloat(getItem(items, ElementLabel.純利益変化率, UnitRef.PURE)?.numeric ?? "") > 0 ? 'increase' : 'decrease'} />
                            {parseFloat(getItem(items, ElementLabel.純利益変化率, UnitRef.PURE)?.numeric ?? "")}%
                        </StatHelpText>
                    </Stat>
                </StatGroup>
                : <Box></Box>}
        </VStack>
    )
}

export default FinancialStateInfo;
