import axios, { AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  fetch('https://dummyjson.com/products').then(e => e.json()).then((data) => {
    setTimeout(() => {
      res.status(200).json(data)
    }, 1500) // simulate 1.5 time to response
  }).catch((e) => {
    res.status(500).json({message: e.message})
  })
  
}

// axios.get('https://dummyjson.com/products',{
//     validateStatus: function (status){
//         return status >= 500; 
//     },
// }).then((response)=> {
//     console.log(response.data);
// });