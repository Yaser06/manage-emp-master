import { useContext, useState, useEffect } from "react";
import { NoticeContext } from "../context/NoticeContext";
import { Button, Modal } from "react-bootstrap";
import EditNews from "./EditNews";

const News = ({ notice }) => {

  const { dispatch, admin } = useContext(NoticeContext);

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteNew=(id,item)=>{
     dispatch({
       type:'delete',
       id,
       state:item
     })
  }
  useEffect(() => {
    handleClose();
  }, [notice]);

  return (
    <>
      <td>{notice.topic}</td>
      <td>{notice.content}</td>
      <td>{new Date(notice.date).toLocaleDateString("tr-TR")}</td>
      <td>{notice.link}</td>
      <td>{notice.status.toString()}</td>
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
          onClick={() => deleteNew(notice.id,notice)}
        >
          <i className="material-icons" data-toggle="tooltip" title="Delete">
            &#xE872;
          </i>
        </button>
        </>:""}
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Update News</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditNews theNews={notice}></EditNews>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default News;
