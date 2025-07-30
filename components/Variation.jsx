/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo } from "react";
import { Table } from 'antd';
import Quantity from "./Quantity";
import { useSelector } from "react-redux";

export default function Variation({
  setCurrent,
  setSelected,
  el,
  selected,
  setExternalImage,
  mainVariant,
  setQuantity,
  quantity,
  showPrice
}) {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedQuantitys, setSelectedQuantitys] = useState(0);
  const totalPricered = useSelector((state) => state.products.totalPrice);


  const [selectedVariants, setSelectedVariants] = useState([]);
  // console.log('quantity', quantity,'selectedQuantity',selectedQuantity,"selectedVariants",selectedVariants,)

  useEffect(() => {
    // console.log({selected,mainVariant})
    if (selected?.length > 0) {
      const variantToShow = Object.entries(mainVariant).reduce((acc, [key, variation]) => {
    
        // debugger
        if (variation.variants[selected[0].key] === selected[0].value) {
          acc.push({ variation_id: key, ...variation });
        }
        return acc;
      }, []);
      setSelectedVariants(variantToShow);
    }
  }, [selected, mainVariant]);
  // console.log("selectedVariants",Object.keys(selectedVariants[0].variants).filter(v=> v !== selected[0].key),"selected", selected[0])

  useEffect(() => {
    if (quantity?.length > 0) {
      const data = quantity.filter(q => selectedVariants.some(v => v.variation_id === q.id));
      const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
      setSelectedQuantity(totalQuantity);
      // console.log('el', el)
      // let newEl = [el.values] 
    }
  }, [quantity, selectedVariants]);

 
  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: 10 }}>
        {el.has_image === 1 && Object.entries(el?.values).map(([key, data]) => {
            const totalQuantity = quantity?.length > 0 &&  quantity.filter(v => v.variants[el.key] === key).reduce((sum, product) => sum + product.quantity, 0)

        return  <div
            key={key}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              if(selected.filter(item => item.value === key).length > 0){

                // // const isSelected = selected.find(select => select.key == el.key && select.value == key);
                // // console.log('isSelected', isSelected)
                // const newSelected = selected.filter(select => select.key!== el.key || select.value!== key);
                // setSelected(newSelected);

              }else{

                const isSelected = selected?.some(select => select.key === el.key && select.value === key);
                const newSelected = isSelected ? [] : [{ key: el.key, value: key }];
                setSelected(newSelected);
                setExternalImage(data);
              }
            }}
            className={`subImages ${selected?.some(item => item.value === key) ? "selected" : ""}`}
          >
            { totalQuantity > 0 ?  <span className="count">{totalQuantity}</span> : <></>}
            <img
              
              src={data}
              alt=""
              style={{
                objectFit: "contain",
                padding: ".15rem",
              
                width: 46,
                height: 46,
                borderRadius: 4
              }}
            />
          </div>
})}
      </div>

      {selectedVariants.length > 0 && selected?.length > 0 ? (
        <Table dataSource={selectedVariants} bordered rowKey={(record) => record.id} pagination={false}>
          {Object.keys(selectedVariants[0].variants).filter(v=> v !== selected[0].key).map((variant) => (
              <Table.Column
                key={variant}
                title={variant}
                dataIndex="variants"
                render={(variants, record) => <span>{record.variants[variant]}</span>}
              />
            ))}
          <Table.Column title="Price" dataIndex="price" key="price" 
          
          render={(record)=>(
            <p>
              {/* {totalPricered?.price ? totalPricered?.price : record} */}
              {showPrice?showPrice:record}
            </p>
          )}
          />
          <Table.Column
            title="Quantity"
            dataIndex="stock"
            key="stock"
            render={(stock, record) => (
              <Quantity  stock={stock} record={record} quantity={quantity} setQuantity={setQuantity} setCurrent={setCurrent} />
            )}
          />
        </Table>
      ):<>

      
      </>}
    </>
  );
}
