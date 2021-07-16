import { useContext, useState, useEffect } from "react";
import { NoticeContext } from "../context/NoticeContext";
import { Button, Modal } from "react-bootstrap";
import EditNotice from "./EditNotice";
import VisibilityIcon from '@material-ui/icons/Visibility';


const Notice = ({ notice }) => {

  const { dispatch, admin } = useContext(NoticeContext);

  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDetailClose = () => setDetail(false);
  const handleDetailShow = () => setDetail(true);


  const deleteNotice = (id, item) => {
    dispatch({
      type: 'delete',
      id,
      state: item
    })
  }
  useEffect(() => {
    handleClose();
    handleDetailClose();
  }, [notice]);

  return (
    <>
      <td>{notice.topic}</td>
      <td className="w-10">{notice.content}</td>
      <td>{new Date(notice.date).toLocaleDateString("tr-TR")}</td>
      <td>{notice.newsId}</td>
      {admin ? <td>{notice.status.toString()}</td> : null}
      <td>
        {admin ? <>
          <button
            className="btn text-warning btn-act"
            data-toggle="modal"
            disabled={!admin}
            onClick={handleShow}
          >
            <i className="material-icons" data-toggle="tooltip" title="Edit">
              &#xE254;
          </i>
          </button>
          <button
            className="btn text-danger btn-act"
            data-toggle="modal"
            disabled={!admin}
            onClick={() => deleteNotice(notice.id, notice)}
          >
            <i className="material-icons" data-toggle="tooltip" title="Delete">
              &#xE872;
          </i>
          </button></> : ""}
        <button
          className="btn text-danger btn-act"
          data-toggle="modal"

          onClick={handleDetailShow}>
          <VisibilityIcon></VisibilityIcon>
        </button>

      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Update Notice</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditNotice theNotice={notice}></EditNotice>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={detail} onHide={handleDetailShow}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Detail Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditNotice theNotice={notice} editOrDetail={detail}></EditNotice>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Notice;
