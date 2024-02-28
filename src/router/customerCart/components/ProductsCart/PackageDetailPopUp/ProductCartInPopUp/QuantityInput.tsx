import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../slice/index.ts';

interface Props {
  productIdQuan: any;
}

const QuantityInput: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const handleDecrement = () => {
    dispatch(actions.decrementQuantity(props.productIdQuan.id));
  };

  const handleIncrement = () => {
    dispatch(actions.incrementQuantity(props.productIdQuan.id));
  };

  return (
    <div className='flex gap-4 justify-center items-center border border-gray-300 rounded-full px-4 py-1'>
      <button onClick={handleDecrement} className="flex justify-center items-center ">
        <span className='text-2xl p-2 rounded-full hover:bg-slate-50'>-</span>
      </button>
      <span
        className=" min-w-10 text-center"
      >
        {props?.productIdQuan?.quantity}
      </span>
      <button onClick={handleIncrement} className="flex justify-center items-center ">
        <span className='text-2xl p-2 rounded-full hover:bg-slate-50'>+</span>
      </button>
    </div>
  );
};

export default QuantityInput;
