import './style.scss';

const Notification = ({ closeNotification, status, message }) => {
  return (
    <div className="notification-container">
      <div className="notification-info">
        <h3>{status}</h3>
        <p>{message}</p>
        <button type="button" onClick={closeNotification}>Ок</button>
      </div>
    </div>
  )
}

export default Notification;