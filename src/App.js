import './App.css'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import PasswordList from './PasswordsItems'

const colorsList = [
  'purple',
  'yellow',
  'green',
  'orange',
  'indigo',
  'red',
  'blue',
]

class PasswordManager extends Component {
  state = {
    userDetailsList: [],
    websiteName: '',
    userName: '',
    password: '',
    totalPswd: 0,
    isCheked: false,
    searchPasswordsList: [],
    searchInput: '',
  }

  onDeleteItem = id => {
    const {userDetailsList} = this.state
    const filteredDeleteitem = userDetailsList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({
      userDetailsList: filteredDeleteitem,
      totalPswd: filteredDeleteitem.length,
    })
  }

  onChecked = () => {
    const {isCheked} = this.state
    this.setState(prevState => ({isCheked: !prevState.isCheked}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    const bgColor = colorsList[Math.ceil(Math.random() * colorsList.length - 1)]

    const newUserDetails = {
      id: uuidv4(),
      websiteURL: websiteName,
      username: userName,
      userpassword: password,
      color: bgColor,
    }
    this.setState(prevState => ({
      userDetailsList: [...prevState.userDetailsList, newUserDetails],
      totalPswd: prevState.totalPswd + 1,
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  onUpdateWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onUpdateUsername = event => {
    this.setState({userName: event.target.value})
  }

  onUpdatePassword = event => {
    this.setState({password: event.target.value})
  }

  onUpdateSearch = event => {
    const searchValue = event.target.value
    const {userDetailsList} = this.state
    const filteredPasswords = userDetailsList.filter(eachItem =>
      eachItem.websiteURL.toLowerCase().includes(searchValue.toLowerCase()),
    )

    this.setState({
      searchPasswordsList: filteredPasswords,
      totalPswd: filteredPasswords.length,
      searchInput: searchValue,
    })
  }

  render() {
    const {
      userDetailsList,
      totalPswd,
      websiteName,
      userName,
      password,
      isCheked,
      searchPasswordsList,
      searchInput,
    } = this.state
    const displayPasswordsList =
      searchInput === '' ? userDetailsList : searchPasswordsList
    return (
      <div className="background-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="add-pswd-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
            className="psw-img"
          />
          <form className="form-el-con" onSubmit={this.onAddPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Website"
                className="input-Element"
                value={websiteName}
                onChange={this.onUpdateWebsite}
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Username"
                className="input-Element"
                value={userName}
                onChange={this.onUpdateUsername}
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                className="input-Element"
                value={password}
                onChange={this.onUpdatePassword}
              />
            </div>
            <div className="button-div">
              <button className="add-button" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="your-pswd-container">
          <div className="header-container">
            <div className="head-para-con">
              <h1 className="heading">Your Passwords</h1>
              <p className="total-pswd">{totalPswd}</p>
            </div>
            <div className="search-container">
              <div className="searchicon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="search-icon"
                  alt="search"
                />
              </div>
              <input
                type="search"
                placeholder="Search"
                className="search-Element"
                onChange={this.onUpdateSearch}
              />
            </div>
          </div>
          <hr />
          <div className="show-pswd-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checbox-el"
              checked={isCheked}
              onChange={this.onChecked}
            />
            <label className="checkbox-label" htmlFor="checbox-el">
              Show passwords
            </label>
          </div>
          {totalPswd === 0 ? (
            <div className="nopassword-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="psw-img"
              />
              <p className="heading">No Passwords</p>
            </div>
          ) : (
            <ul className="unorder-list">
              {displayPasswordsList.map(eachUser => (
                <PasswordList
                  userDetails={eachUser}
                  Key={eachUser.id}
                  isCheked={isCheked}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
