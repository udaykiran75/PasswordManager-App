import './index.css'

const PasswordList = props => {
  const {userDetails, isCheked, onDeleteItem} = props
  const {websiteURL, username, userpassword, color, id} = userDetails
  const latter = websiteURL[0].toUpperCase()

  const deleteItem = () => {
    onDeleteItem(id)
  }

  return (
    <li className="list-container">
      <div className="pswd-delete-div">
        <div className={color}>
          <h1 className="latter">{latter}</h1>
        </div>
        <div className="web-user-pswd">
          <p className="para">{websiteURL}</p>
          <p className="para">{username}</p>
          {!isCheked && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
          {isCheked && <p className="para">{userpassword}</p>}
        </div>
      </div>
      <button className="button" data-testid="delete" onClick={deleteItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default PasswordList