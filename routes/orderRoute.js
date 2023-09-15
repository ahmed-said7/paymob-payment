const router = require('express').Router();

const {updatePaidOrder,updateDeliveredOrder
    ,getUserOrders,createOrder,getOrder,getOrders,
    deleteOrder,createSessions}=require('../services/orderServices');

const {allowedTo,protect}=require('../services/authService');

router.use(protect);

router.route('/:cartId').post(allowedTo('admin','user','manager'),createOrder);

router.route('/update-delivered/:id').patch(allowedTo('admin','manager'),updateDeliveredOrder);

router.route('/update-paid/:id').patch(allowedTo('admin','manager'),updatePaidOrder);

router.route("/user-orders").get(allowedTo('admin','user','manager'),getUserOrders);

router.route("/session/:cartId")
    .post(allowedTo('admin','user','manager'),createSessions);

router.route("/:id").get(allowedTo('manager','user'),getOrder);

router.route("/:id").delete(allowedTo('manager','user'),deleteOrder);

router.route('/').get(allowedTo('admin','user'),getOrders);

module.exports=router;

