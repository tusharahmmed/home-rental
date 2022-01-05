import axios from "axios";


export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async(url) => {
    const {data} = await axios.get(url,{
        headers: {
                'x-rapidapi-host': 'bayut.p.rapidapi.com',
                'x-rapidapi-key': '40d235566fmsh791162abc080abfp15538fjsnc995a4d2f11d'
              }
    });

    return data;
}