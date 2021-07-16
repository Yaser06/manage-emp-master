import { useContext, useState, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import { Button, Modal } from "react-bootstrap";
import EditNews from "./EditNews";
import VisibilityIcon from '@material-ui/icons/Visibility';



const News = ({ news }) => {

  const { dispatch, admin } = useContext(NewsContext);

  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDetailClose = () => setDetail(false);
  const handleDetailShow = () => setDetail(true);

  const deleteNew = (id, item) => {

    dispatch({
      type: 'delete',
      id,
      state: item
    })
  }
  useEffect(() => {
    handleClose();
    handleDetailClose();

  }, [news]);

  return (
    <>
      <td>{news.topic}</td>
      <td >{news.content}</td>
      <td>{new Date(news.date).toLocaleDateString("tr-TR")}</td>
      <td>{news.haberLink}</td>
      {admin ? <td>{news.status.toString()}</td> : null}
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
            onClick={() => deleteNew(news.id, news)}
          >
            <i className="material-icons" data-toggle="tooltip" title="Delete">
              &#xE872;
          </i>
          </button> </> : ""}
        <button className="btn text-danger btn-act"
          data-toggle="modal"
          onClick={handleDetailShow}><i>
            <VisibilityIcon></VisibilityIcon>
          </i></button>

      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Update News</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditNews theNews={news} ></EditNews>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={detail} onHide={handleDetailShow}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Detail News</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditNews theNews={news} editOrDetail={detail} ></EditNews>
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

export default News;
