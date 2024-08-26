import React from 'react';

const productid = process.env.PRODUCTIDS;

const Future = () => {
  return <div>{JSON.stringify(productid)}</div>;
};

export default Future;
