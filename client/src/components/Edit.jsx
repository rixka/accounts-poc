import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Edit extends Component {
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

  onChange = e => {
    const state = this.state.account
    state[e.target.name] = e.target.value
    this.setState({ account: state })
  }

  onSubmit = e => {
    e.preventDefault()

    const { email } = this.state.account

    axios
      .put('/api/accounts/' + this.props.match.params.id, { email })
      .then(result => {
        this.props.history.push('/show/' + this.props.match.params.id)
      })
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">EDIT BOOK</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to={`/show/${this.state.account._id}`}>
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true" />{' '}
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
                  value={this.state.account.email}
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

export default Edit
