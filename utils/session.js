
require('dotenv').config();

const firststep=async (cart,user)=>{
    const res=await fetch('https://accept.paymob.com/api/auth/tokens'
    ,{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({ api_key : process.env.API_KEY })
    });
    const token=(await res.json()).token;
    const orderId=await secondstep(token,cart,user);
    const obj=await thirdstep(orderId,token,cart,user);
    return obj;
}
const secondstep= async (token,cart,user)=>{
    const data={
        auth_token:  token,
        delivery_needed: false,
        amount_cents: cart.totalPrice*100,
        currency: "SAR",
        items: []
        ,
        shipping_data: {
            email: user.email, 
            first_name: user.name,  
            phone_number: user.phone || "undefined", 
            city: user.city || "undefined",
            last_name:cart._id
        }
    };
    const res=await fetch("https://accept.paymob.com/api/ecommerce/orders",
        {
            method: 'POST',
            headers : {'Content-Type': 'application/json'} ,
            body : JSON.stringify(data)
        });
    const result=await res.json();
    return result.id;
};

const thirdstep=async (orderId,token,cart,user)=>{
    const data={
        "auth_token": token,
        "amount_cents": cart.totalPrice*100, 
        "expiration": 3600, 
        "order_id": orderId,
        "billing_data": {
            "email": user.email, 
            "first_name": user.name, 
            "phone_number": user.phone || "undefined", 
            "city": user.city || "undefined", 
            "last_name": cart._id,
            "country":"KSA",
            "street": user.street || "undefined",
            "building": user.building || "undefined",
            "floor":user.floor || "undefined",
            "apartment":user.apartment || "undefined"
        }, 
        "currency": "SAR", 
        "integration_id": process.env.INTEGRATION_ID,
    };

    const res=await fetch("https://accept.paymob.com/api/acceptance/payment_keys",
        {
            method: 'POST',
            headers : {'Content-Type': 'application/json'} ,
            body : JSON.stringify(data)
        });
    const result=await res.json();
    const url=`https://accept.paymob.com/api/acceptance/iframes/${process.env.IFRAME}?payment_token=${result.token}`
    return {url,orderId};
}

module.exports=firststep;


