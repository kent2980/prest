import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import { ExplainList, ExplainListApi, ExplainListDataItem } from '../../services/FsstockApiServies';

type Props = {
  code: string;
};

const StockSummary = (props: Props) => {
  const { code } = props;
  const [data, setData] = useState<ExplainListDataItem[]>([]);

  useEffect(() => {
    if (code !== "" && code.length === 4) {
      const list = new ExplainList();
      list.code = code;
      ExplainListApi.fetchData(list)
        .then(res => {
          setData(res);
          console.log(data);
        })
        .catch(error => console.log(error));
    }
    else{
      setData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <Box
      borderRadius='8px'
      border='1px'
      borderColor='gray.300'
      padding='0.75rem'
      margin='auto'
    >
      <TableContainer>
        <Table size='sm' overflowX={'scroll'}>
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>銘柄コード</Th>
              <Th>会社名</Th>
              <Th>タイトル</Th>
              <Th>QTY</Th>
              <Th>会期</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(item => ( // Using the fetched data to populate the table rows
              <Tr key={item.index_id}>
                <Td>{item.publication_date}</Td>
                <Td>{item.code}</Td>
                <Td>{item.company_name}</Td>
                <Td>{item.report_label}</Td>
                <Td>{item.period}</Td>
                <Td>{item.period_division_label}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockSummary;
