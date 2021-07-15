
import Notice from "./Notice";
import { useContext, useState, useEffect } from "react";

import { NoticeContext } from "../context/NoticeContext";
import { Button, Modal, Alert } from "react-bootstrap";
import AddNews from "./AddNews";

const NoticeList = ({newsOrNotice,setNewsOrNotice}) => {
  const {admin,setAdmin,notice} = useContext(NoticeContext)

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
          <div>
            <Button
              onClick={()=>setAdmin(prev=>!prev)}
              className="btn btn-success text-white"
              data-toggle="modal"
            >
              <span>{admin ? 'Admin':'User'}</span>
            </Button>
          </div>
          <div>
            <Button
              onClick={()=>setNewsOrNotice(prev=>!prev)}
              className="btn btn-success text-white"
              data-toggle="modal"
            >
              <span>{newsOrNotice ? 'News':'Notice'}</span>
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
          {notice
            .sort((a, b) => a.topic.localeCompare(b.topic))
            .map((notice) => (admin||notice.status?
              <tr key={notice.id}>
                <Notice notice={notice}></Notice>
              </tr>:null
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

export default NoticeList;
