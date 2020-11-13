import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

export class BabyCart extends React.Component {
  async componentDidMount() {
    await this.props.getCart()
  }

  render() {
    const cart = this.props.cart || {}
    const products = cart.products
    let numOfProducts = 0
    if (products) {
      numOfProducts = products.reduce(function(accum, current) {
        return accum + current.orderItem.quantity
      }, 0)
    }

    return (
      <div>
        <a href="/cart">
          <img
            src="https://static.thenounproject.com/png/304392-200.png"
            className="cart-img"
          />{' '}
          {numOfProducts}
        </a>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(BabyCart)
