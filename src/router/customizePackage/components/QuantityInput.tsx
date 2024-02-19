import React, { useState } from 'react';

const QuantityInput: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(0); // Initial quantity value

  const handleDecrement = () => {
    setQuantity(Math.max(0, quantity - 1));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className='flex gap-4 justify-center items-center border border-gray-300 rounded-full px-4 py-1'>
      <button onClick={handleDecrement} className="flex justify-center items-center ">
        <span className='text-2xl p-2 rounded-full hover:bg-slate-50'>-</span>
        </button>
      <span
        className=" min-w-10 text-center"
      >
        {quantity}
      </span>
      <button onClick={handleIncrement} className="flex justify-center items-center ">
      <span className='text-2xl p-2 rounded-full hover:bg-slate-50'>+</span>
      </button>
    </div>
  );
};

export default QuantityInput;
