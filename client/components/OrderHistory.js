import React from 'react'
import {connect} from 'react-redux'
import {fetchHistory} from '../store'
import {Table} from 'react-bootstrap'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchHistory(this.props.match.params.userId)
  }
  render() {
    const orders = this.props.history || []
    return (
      <div>
        <ol>
          {orders.map(order => (
            <li key={order.id}>
              <p>Date ordered: {order.createdAt}</p>
              <p>Shipping Information:</p>
              <p>{order.name}</p>
              <p>{order.addressLine1}</p>
              <p>
                {order.city}, {order.state}
              </p>
              <Table striped bordered hover size="small">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                  {order.products.map(product => {
                    return (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.priceDisplay}</td>
                        <td>{product.orderItem.quantity}</td>
                      </tr>
                    )
                  })}
                </thead>
              </Table>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  history: state.history
})

const mapDispatchToProps = dispatch => ({
  fetchHistory: userId => dispatch(fetchHistory(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
