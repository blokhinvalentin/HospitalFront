import './style.scss';

const ConfirmDelete = ({ closeConfirmDelete, deleteOneMeeting, id }) => {
  return (
    <div className="confirm-delete-container">
      <div className="confirm-delete-info">
        <div className="title">
          <h3>Удалить прием</h3>
        </div>
        <p>Вы действительно хотите удалить прием?</p>
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
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete;