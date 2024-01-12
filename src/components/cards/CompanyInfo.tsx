import React, { useEffect, useState } from 'react'
import { StockBrandsApi, StockBrandsData, StockBrandsParams } from '../../services/FsstockApiServies';
import { Box, Text, VStack } from '@chakra-ui/react';

type Props = {
    code: string;
    setIndustry: React.Dispatch<React.SetStateAction<string>>;
}

const CompanyInfo = (props: Props) => {

    const { code, setIndustry } = props;
    const [item, setItem] = useState<StockBrandsData>();

    useEffect(() => {
        if (code.length === 4) {
            // 銘柄コードを設定
            const list = new StockBrandsParams();
            list.code = code;
            // APIから銘柄情報を取得
            StockBrandsApi.fetchData(list)
                .then(res => {
                    setItem(res[0]);
                })
                .catch(er => console.log(er));
        }
    }, [code])

    useEffect(() => {
        if (item) {
            setIndustry(item.number_33_industry_code);
        }
    }, [item]);

    return (
        <Box>
            {item ? (
                <VStack>
                    <Text>{item.security_name}</Text >
                    <Text>{item.number_33_industry_code}</Text>
                    <Text>{item.number_33_industry_category}</Text>
                </VStack>
            ) : null}
        </Box>
    )
}

export default CompanyInfo;