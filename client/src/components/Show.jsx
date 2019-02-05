import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Show extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: {},
    }
  }

  componentDidMount() {
    axios.get('/api/accounts/' + this.props.match.params.id).then(res => {
      this.setState({ account: res.data })
      console.log(this.state.account)
    })
  }

  delete(id) {
    console.log(id)
    axios.delete('/api/accounts/' + id).then(result => {
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{this.state.account.title}</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/">
                <span class="glyphicon glyphicon-th-list" aria-hidden="true" />{' '}
                Account List
              </Link>
            </h4>
            <dl>
              <dt>EMAIL:</dt>
              <dd>{this.state.account.email}</dd>
            </dl>
            <Link
              to={`/edit/${this.state.account._id}`}
              class="btn btn-success"
            >
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.account._id)}
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Show
