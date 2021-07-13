import { useContext, useState, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import { Button, Modal } from "react-bootstrap";
import EditNews from "./EditNews";

const News = ({ news }) => {

  const { dispatch, admin } = useContext(NewsContext);

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
  }, [news]);

  return (
    <>
      <td>{news.topic}</td>
      <td>{news.content}</td>
      <td>{new Date(news.date).toLocaleDateString("tr-TR")}</td>
      <td>{news.link}</td>
      <td>{news.status.toString()}</td>
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
          onClick={() => deleteNew(news.id,news)}
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
          <EditNews theNews={news}></EditNews>
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
