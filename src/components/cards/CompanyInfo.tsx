import React, { useEffect, useState } from 'react'
import { StockBrandsApi, StockBrandsData, StockBrandsParams } from '../../services/FsstockApiServies';
import { Box, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';

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
            StockBrandsApi.fetchData(list, true)
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
        <Box border={'1px'} borderColor={'red.300'}>
            <Grid templateAreas={`"code title title title"
                            "market market sector sector"`}
                gridTemplateRows={'50px 30px'}
                gridTemplateColumns={'60px 1fr 200px 1fr'}
                gap='1'
                color='blackAlpha.700'
            >
                <GridItem pl='2' w='50px' area={'code'}>
                    <Text>{item?.code}</Text>
                </GridItem>
                <GridItem pl='2' area={'title'}>
                    <Heading mb={4} as='h2' size='xl' fontSize='20px'>{item?.security_name}</Heading>
                </GridItem>
                <GridItem pl='2' area={'market'}>
                    <Text>{item?.market_product_category}</Text>
                </GridItem>
                <GridItem pl='2' area={'sector'}>
                    <Text>{item?.number_33_industry_category}</Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default CompanyInfo;