
import Notice from "./Notice";
import { useContext, useState, useEffect } from "react";
import { NoticeContext } from "../context/NoticeContext";
import { Row, Container, Col, Button, Modal, Alert } from "react-bootstrap";
import AddNews from "./AddNews";
import AddNotice from "./AddNotice";


const NoticeList = ({ newsOrNotice, setNewsOrNotice }) => {
  const { admin, setAdmin, notice } = useContext(NoticeContext)

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

  useEffect(() => {
    handleClose();
    return () => {
      handleAlertShow();
    };
  }, [notice]);

  return (
    <>
      <div className="table-title">
        <div className="d-flex justify-content-between">
          <Container>
            <Row>
            <Col xs="1"><div>


                <Button
                  onClick={() => setAdmin(prev => !prev)}
                  className="btn btn-success text-white float-left"
                  data-toggle="modal"
                >
                  <span>{admin ? 'Admin' : 'User'}</span>
                </Button>
              </div></Col>
              <Col> <div>
                <Button
                  onClick={() => setNewsOrNotice(prev => !prev)}
                  className="btn btn-success text-white float-left"
                  data-toggle="modal"
                >
                  <span>{newsOrNotice ? 'News' : 'Notice'}</span>
                </Button>
              </div></Col>
              <Col> {admin ? <div>
                <Button
                  onClick={handleShow}
                  className="btn btn-success text-white"  
                  data-toggle="modal"
                >
                  <i className="material-icons">&#xE147;</i>
                  <span>Add New {newsOrNotice ? 'News' : 'Notice'}</span>
                </Button>
              </div> : null}</Col>
            </Row>
          </Container>
        </div>
      </div>

      <Alert
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        Notice List successfully updated.{" "}
      </Alert>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="text-left">Konu</th>
            <th className="text-left w-5">İçerik</th>
            <th className="date">Geçerlilik Tarihi</th>
            <th className="text-left">Haber No</th>
            {admin ? <th className="text-left">Haber Status</th> : null}

          </tr>
        </thead>
        <tbody>
          {notice
            .sort((a, b) => a.topic.localeCompare(b.topic))
            .map((notice, index) => (admin || notice.status ?
              <tr key={index}>
                <Notice notice={notice}></Notice>
              </tr> : null
            ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Add Notice</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {newsOrNotice ? <AddNews></AddNews> : <AddNotice></AddNotice>}

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

export default NoticeList;
