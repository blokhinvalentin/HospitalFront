import './style.scss';

const ConfirmDelete = ({ closeConfirmDelete, status, message, deleteOneMeeting, id }) => {
  return (
    <div className="confirm-delete-container">
      <div className="confirm-delete-info">
        <div className="title">
          <h3>{status}</h3>
        </div>

        <p>{message}</p>

        <div className="buttons">
          <button 
            type="button" 
            className="button__cancel"
            onClick={closeConfirmDelete}>Отмена</button>
          <button 
            type="button" 
            className="button__delete"
            onClick={() => {
              deleteOneMeeting(id);
              closeConfirmDelete();
            }}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete;