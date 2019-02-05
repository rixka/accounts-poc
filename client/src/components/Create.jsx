import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Create extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
    }
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = e => {
    e.preventDefault()

    const { email } = this.state

    axios.post('/api/accounts', { email }).then(result => {
      this.props.history.push('/')
    })
  }

  render() {
    const { email } = this.state
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">ADD BOOK</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/">
                <span class="glyphicon glyphicon-th-list" aria-hidden="true" />{' '}
                Account List
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="email">EMAIL:</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  placeholder="EMAIL"
                />
              </div>
              <button type="submit" class="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Create
