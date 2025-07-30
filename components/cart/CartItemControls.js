import { Button, Input } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const CartItemControls = ({ el, loading, updateCart }) => {
    console.log({el})
  const handleDecrement = () => {
    if (!loading) {
      if (el.qty > 1) {
        updateCart(el.id, { qty: el.qty - 1 });
      } else {
        updateCart(el.id, { qty: el.qty, status: "cancelled" });
      }
    }
  };

  const handleIncrement = () => {
    if (!loading) {
      updateCart(el.id, { qty: el.qty + 1 });
    }
  };

  const handleDelete = () => {
    if (!loading) {
      updateCart(el.id, { status: "cancelled" });
    }
  };

  const commonButtonStyle = { size: 24, style: { boxShadow: 'none' } };

  return (
    <div style={{ display: "flex", marginRight: "1rem" }}>
      <Button
       type="primary"
        {...commonButtonStyle}
        icon={<MinusOutlined />}
        style={{ ...commonButtonStyle.style, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onClick={handleDecrement}
      />
      <Input
        value={el.qty}
        style={{
          width: 64,
          borderRadius: 0,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
        readOnly
      />
      <Button
       type="primary"
        {...commonButtonStyle}
        icon={<PlusOutlined />}
        style={{ ...commonButtonStyle.style, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        onClick={handleIncrement}
      />
      <Button
       type="danger"
        {...commonButtonStyle}
        icon={<DeleteOutlined />}
        style={{ marginLeft: "1rem" }}
        onClick={handleDelete}
      />
    </div>
  );
};

export default CartItemControls;
