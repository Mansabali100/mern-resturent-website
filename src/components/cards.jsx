import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart,useCart } from './Context';


function Cards(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let fooditem = props.foodItems
  let dispatch = useDispatchCart()
  let data = useCart()
  let priceRef = useRef()
  const [qty,setqty] = useState(1);
  const [size,setsize] = useState("")


  
const handleAddToCart = async() =>{
  let food = []
  for (const item of data) {
    if (item.id === fooditem._id) {
      food =item;

      break;
    }
  }
  if (food !== []){
    if (food.size === size){
      await dispatch({type:"UPDATE",id:fooditem._id,price:finalprice,qty:qty})
      return
    }
    else if (food.size !== size){
      await dispatch({type:"add",id:fooditem._id,name:fooditem.name,price:finalprice,qty:qty,size:size})
      return
  }
     
}

    //  await console.log(data)
   
    await dispatch({type:"add",id:fooditem._id,name:fooditem.name,price:finalprice,qty:qty,size:size})
}

let finalprice = qty * parseInt(options[size]);
useEffect(()=>{
  setsize(priceRef.current.value)
},[])
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
          <img
            src={fooditem.img}
            className="card-img-top"
            alt="..."
            style={{height:"120px",objectFit:"fill"}}
          />
          <div className="card-body">
            <h5 className="card-title">{fooditem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onClick={(e)=>setqty(e.target.value)}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onClick={(e)=>setsize(e.target.value)}>
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5">${finalprice}/-</div>
            </div>
          </div>
          <hr>
          </hr>
          <button className={'btn btn-success justify-center m-2'} onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
