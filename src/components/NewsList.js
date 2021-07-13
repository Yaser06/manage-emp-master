import News from "./News";
import { useContext, useState, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import { Button, Modal, Alert } from "react-bootstrap";
import AddNews from "./AddNews";

const NewsList = () => {
  const {admin,setAdmin} = useContext(NewsContext)
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAlertShow = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const { news } = useContext(NewsContext);

  useEffect(() => {
    handleClose();
    return () => {
      handleAlertShow();
    };
  }, [news]);

  return (
    <>
      <div className="table-title">
        <div className="d-flex justify-content-between">
          <div>
            <Button
              onClick={()=>setAdmin(prev=>!prev)}
              className="btn btn-success text-white"
              data-toggle="modal"
            >
              <span>{admin ? 'Admin':'User'}</span>
            </Button>
          </div>
         {admin ? <div>
            <Button
              onClick={handleShow}
              className="btn btn-success text-white"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Add New News</span>
            </Button>
          </div>: null}
        </div>
      </div>

      <Alert
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        News List successfully updated.{" "}
      </Alert>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="text-center">Konu</th>
            <th className="text-center">İçerik</th>
            <th className="date">Geçerlilik Tarihi</th>
            <th className="text-center">Haber Link</th>
          </tr>
        </thead>
        <tbody>
          {news
            .sort((a, b) => a.topic.localeCompare(b.topic))
            .map((news) => (
              <tr key={news.id}>
                <News news={news}></News>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Add News</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddNews></AddNews>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewsList;
