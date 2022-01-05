import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner = ({query, imageUrl, purpose, title1, title2, linkName, buttonText, des1, des2 }) => (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt='banner' />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium" >{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold" >{title1}<br /> {title2}</Text>
      <Text fontSize="xl" fontWeight="medium" paddingTop="3" paddingBottom="3" >{des1}<br /> {des2}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
  );

export default function Home({propertyForRent,propertyForSale}) {


  return (
    <div>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        des1="Explore Appartments, Villas, Homes"
        des2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
       />

      <Flex flexWrap='wrap' justifyContent='center'>
      {propertyForRent.map(property => <Property key={property.id} property={property}  /> ) }
      </Flex>

      <Banner
        purpose="Buy A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        des1="Explore Appartments, Villas, Homes"
        des2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
       />
       <Flex flexWrap='wrap' justifyContent='center'>
      {propertyForSale.map(property => <Property key={property.id} property={property}  /> ) }
      </Flex>
    </div>
  )
}


export async function getStaticProps(){
  // for-sale
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  // for-rent
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);


  // return data

  return {
    props: {
      propertyForRent: propertyForRent?.hits,
    propertyForSale: propertyForSale?.hits
    }
  }
}
