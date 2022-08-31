import moment from 'moment';
import deleteImg from 'src/img/delete.svg';
import editImg from 'src/img/edit.svg';
import './style.scss'

const MeetingsContainer = ({ meetings }) => {
  const meetingInfo = [
    {
      header: 'patient-name',
      text: 'Имя'
    },
    {
      header: 'doctor-name',
      text: 'Врач'
    },
    {
      header: 'meeting-date',
      text: 'Дата'
    },
    {
      header: 'patient-complaints',
      text: 'Жалобы'
    },
    {
      header: 'edit-or-delete',
      text: ''
    }
  ]

  return (
    <div className="meetings-info">
        <div className="info-headers">
          {
            meetingInfo.map((meeting, index) => (
              <p key={index} className={`info-headers__${meeting.header}`}>{meeting.text}</p>
            ))
          }
        </div>
        <div className="meetings-info__list">
          <table className="table">
            <tbody className="table__body">
              {meetings.map((meeting, index) => (
                <tr key={index}>
                  <td className="table-cell__patient-name">{meeting.patientName}</td>
                  <td className="table-cell__doctor-name">{meeting.doctorName}</td>
                  <td className="table-cell__meeting-date">{moment(meeting.date).format('DD.MM.YYYY')}</td>
                  <td className="table-cell__patient-complaints">{meeting.complaints}</td>
                  <td className="table-cell__edit-or-delete">
                    <button 
                      type="button" 
                      className="button__delete-meeting"
                    >
                      <img 
                        className="button__img"
                        src={deleteImg} 
                        alt="" 
                      />
                    </button>
                    <button 
                      type="button" 
                      className="button__edit-meeting"
                    >
                      <img 
                        className="button__img"
                        src={editImg} 
                        alt="" 
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default MeetingsContainer;
