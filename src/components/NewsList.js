import News from "./News";
import { useContext, useState, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import { Row, Container, Col, Button, Modal, Alert } from "react-bootstrap";
import AddNews from "./AddNews";
import AddNotice from "./AddNotice";

const NewsList = ({ newsOrNotice, setNewsOrNotice }) => {
  const { admin, setAdmin, news } = useContext(NewsContext)

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
    console.log('burada',news)
    handleClose();
    return () => {
      handleAlertShow();
    };
  }, [news]);

  return (
    <>
      <div className="table-title">
        <div className="d-flex justify-content-between">
          <Container>
            <Row>
              <Col xs="1">
                <div>
                  <Button
                    onClick={() => setAdmin(prev => !prev)}
                    className="btn btn-success text-white float-left"
                    data-toggle="modal"
                  >
                    <span>{admin ? 'Admin' : 'User'}</span>
                  </Button>
                </div>
              </Col>
              <Col>
                <div>
                  <Button
                    onClick={() => setNewsOrNotice(prev => !prev)}
                    className="btn btn-success text-white float-left"
                    data-toggle="modal"
                  >
                    <span>{newsOrNotice ? 'News' : 'Notice'}</span>
                  </Button>
                </div>
              </Col>
              <Col>
                {admin ? <div>
                  <Button
                    onClick={handleShow}
                    className="btn btn-success text-white"
                    data-toggle="modal"
                  >
                    <i className="material-icons">&#xE147;</i>
                    <span>Add New {newsOrNotice ? 'News' : 'Notice'}</span>
                  </Button>
                </div> : null}
              </Col>
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
        News List successfully updated.{" "}
      </Alert>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="text-left">Konu</th>
            <th className="text-left">İçerik</th>
            <th className="date">Geçerlilik Tarihi</th>
            <th className="text-lefter">Haber Link</th>
            {admin ? <th className="text-left">Haber Status</th> : null}

          </tr>
        </thead>
        <tbody>
          {news
            .sort((a, b) => a.topic.localeCompare(b.topic))
            .map((news) => (admin || news.status ?
              <tr key={news.id}>
                <News news={news}></News>
              </tr> : null
            ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Add {newsOrNotice ? 'News' : 'Notice'}</Modal.Title>
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

export default NewsList;
