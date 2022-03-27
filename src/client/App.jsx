import React, { Component } from 'react'

import ActivityCount from './components/ActivityCount'
import ActivityTable from './components/ActivityTable'
import LoginForm from './components/LoginForm'
import './app.css'

const ACTIVITY_ENDPOINT = 'https://ethan-runs.herokuapp.com/activity'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      runCount: 0,
      tab: 'login',
      activities: null,
      loaded: false,
      jwt: null,
      auth_headers: null,
    }
  }

  componentDidMount() {
    fetch(ACTIVITY_ENDPOINT + '/count', {headers: this.auth_headers})
      .then(res => res.json())
      .then(count => this.setState({
        runCount: count
      }))
    fetch(ACTIVITY_ENDPOINT, {headers: this.auth_headers})
      .then(res => res.json())
      .then(activities => this.setState({
        activities: activities
      }))
    this.setState({loaded: true})
  }

  render() {
    let tabContent
    switch (this.state.tab) {
      case 'login':
        const handleSubmit = data => {
          const json = JSON.stringify(data, null, 4);
          console.clear();
          console.log(json);
        };
        tabContent = <LoginForm onSubmit={handleSubmit} />
        break
      case 'count':
        tabContent = <ActivityCount count={this.state.run_count}/>
        break
      case 'table':
        tabContent = <ActivityTable activities={this.state.activities}/>
        break
      default:
        tabContent = <p>Unknown tab</p>
    }
    return (
      <div id="app-container">
        {tabContent}
      </div>
    )
  }
}
