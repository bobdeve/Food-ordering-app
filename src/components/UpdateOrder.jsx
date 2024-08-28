import React from 'react';
import { useHttp } from './Hooks/useHttp';
import { Modal } from './UI/Modal';

const requestConfigUpdate = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' }
};

export const UpdateOrder = () => {
  const { data, isLoading, error, sendRequest: updateOrder } = useHttp('http://localhost:3000/updateorder', requestConfigUpdate);

  const handleUpdate = () => {
    updateOrder(); // Trigger the PUT request
  };

  return (
    <div >
      <button className='clear-order' onClick={handleUpdate}>Update (Clear) All Orders</button>
      {isLoading && <p>Updating orders...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
};
