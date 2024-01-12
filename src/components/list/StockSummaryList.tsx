import React, { useEffect, useState } from 'react';
import {
  Box,
  UnorderedList,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ExplainList, ExplainListApi, ExplainListDataItem } from '../../services/FsstockApiServies';
import { Link } from 'react-router-dom';

type Props = {
  code: string;
  setExplainId: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

const StockSummaryList = (props: Props) => {
  const { code, setExplainId, setCode } = props;
  const [data, setData] = useState<ExplainListDataItem[]>([]);

  const hundleClick = (item: ExplainListDataItem) => {
    setExplainId(item.id);
    setCode(item.code);
  }

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
    else {
      setData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <Box>
      {data ? (
        data.length > 0 ? ( // Added conditional check to render UnorderedList only if data is not empty
          <Box
            borderRadius='8px'
            border='1px'
            borderColor='gray.300'
            padding='0.75rem'
          >
            <UnorderedList listStyleType={'none'}>
              {data.map(item => (
                <Link to={'/financialstate'}>
                  <ListItem
                    key={item.index_id}
                    borderBottom={'1px'}
                    borderBottomColor={'gray.400'}
                    padding={2}
                    color={'gray.500'}
                    _hover={{ color: 'black' }}
                    onClick={() => hundleClick(item)}
                  >
                    <VStack>
                      <Text>
                        {item.publication_date}
                      </Text>
                      <Text>
                        {item.company_name}
                      </Text>
                      <Text>
                        {item.document_title}
                      </Text>
                    </VStack>
                  </ListItem>
                </Link>
              ))}
            </UnorderedList>
          </Box>
        ) : null
      ) : null};
    </Box>
  );
};

export default StockSummaryList;
