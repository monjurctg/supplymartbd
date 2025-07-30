import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';

function Quantity({ stock, record, quantity, setQuantity, setCurrent }) {
  const [item, setItem] = useState(null);

  useEffect(() => {

    if (quantity && record?.variation_id) {
      const foundItem = quantity.find((q) => q.id === record.variation_id);
      console.log({foundItem})
      if (foundItem !== item) {
        setItem(foundItem);
      }
    }
  }, [record, quantity]);

  const updateQuantity = (newQuantity) => {
    const validatedQuantity = Math.min(Math.max(newQuantity, 0), stock); // Ensures the quantity is within 0 and stock
    setCurrent(validatedQuantity * Math.random());
    setQuantity((prevQuantity) =>
      prevQuantity.map((q) =>
        q.id === record.variation_id ? { ...q, quantity: validatedQuantity } : q
      )
    );
    setItem((prev) => ({ ...prev, quantity: validatedQuantity }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const parsedValue = parseInt(value, 10) || 0; // Parse the input or default to 0
      updateQuantity(parsedValue);
    }
  };

  return (
    <div>
      {item ? (
        <div style={{ display: 'flex', margin: '1rem 0', justifyContent: 'center' }}>
          <Button
            type="primary"
            icon={<MinusOutlined />}
            size={24}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, boxShadow: 'none' }}
            onClick={() => item.quantity > 0 && updateQuantity(item.quantity - 1)}
          />
          <Input
            value={item.quantity}
            style={{ width: 64, borderRadius: 0, textAlign: 'center' }}
            onChange={handleInputChange} // Handles manual input
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={24}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            onClick={() => item.quantity < stock && updateQuantity(item.quantity + 1)}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <p style={{ textAlign: 'center' }}>{stock} in stock</p>
    </div>
  );
}

export default Quantity;
