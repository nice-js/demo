import React, {Component} from 'react'
import {Button} from 'antd'
import styles from './style.css'

class Home extends Component {
  render() {
    return (
      <div className={styles.head}>这个可以自动更新 !<Button>Submit</Button></div>
    )
  }
}
export default Home
