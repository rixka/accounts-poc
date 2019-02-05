import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
    }
  }

  componentDidMount() {
    axios.get('/api/accounts').then(res => {
      this.setState({ accounts: res.data })
      console.log(this.state.accounts)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">ACCOUNTS</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/create">
                <span
                  className="glyphicon glyphicon-plus-sign"
                  aria-hidden="true"
                />{' '}
                Add Account
              </Link>
            </h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.accounts.map(account => (
                  <tr>
                    <td>
                      <Link to={`/show/${account._id}`}>{account.email}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App
