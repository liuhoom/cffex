import React from 'react';
const productid = process.env.PRODUCTIDS;

// const apires = productid.map((ele) => {
//   return { key: ele };
// });

// console.log(apires);

export default function Home() {
  return <div>{JSON.stringify(productid)}</div>;
}
