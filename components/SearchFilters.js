import {Flex,Box,Select,Text,Input,Spinner,Icon,Button} from '@chakra-ui/react';
import { useRouter }  from 'next/router';
import {MdCancel} from 'react-icons/md';
import Image from 'next/image';
import { useState } from 'react';
import { filterData, getFilterValues } from '../utils/filterData';


const SearchFilters = () => {

    const [filters,setFilters] = useState(filterData);
    const router = useRouter();

    const searchProperties = (filterValues) => {
        // console.log(filterValues);
        const path = router.pathname;
        const { query } = router;
    
        const values = getFilterValues(filterValues)
    
        values.forEach((item) => {
          if(item.value && filterValues?.[item.name]) {
            query[item.name] = item.value
          }
        })
    
        router.push({ pathname: path, query: query });
      };

    return (
        <Flex bg="green.100" justifyContent="center" flexWrap="wrap">
           {
               filterData.map(filter => (
                   <Box key={filter}>
                       <Select
                       p="2"
                       w="fit-content"
                       placeholder={filter.placeholder}
                       onChange={(e)=>searchProperties({[filter.queryName]:e.target.value})}>
                           {
                            filter?.items?.map(item => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                            ))
                           }
                       </Select>
                   </Box>
               ))
           }
        </Flex>
    );
};

export default SearchFilters;