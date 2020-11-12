const router = require('express').Router()
const {Product, Order, OrderItem} = require('../db/models')
module.exports = router
const session = require('express-session')

//GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    let cartId
    if (req.user) {
      const [cart] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'open'
        }
      })
      cartId = cart.id
    } else {
      console.log('SESSION', req.sessionID)
      const [cart] = await Order.findOrCreate({
        where: {
          sessionId: req.sessionID,
          status: 'open'
        }
      })
      cartId = cart.id
    }
    const cartItems = await Order.findAll({
      where: {id: cartId},
      include: [Product]
    })
    res.send(cartItems)
  } catch (err) {
    next(err)
  }
})

//Add items to cart and modify current cart
//add to orderItem, must have correct orderId that's related to the cart
// router.post('/', async (req, res, next) =>{
//   try {
//     //req.user to find open order
//   } catch (error) {
//     next(error)
//   }
// })

//steps:
//add items to cart
//match item by item id?
//