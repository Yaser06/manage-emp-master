import { Button } from "react-bootstrap";
import { Form, FormGroup } from "react-bootstrap";
import { NoticeContext } from "../context/NoticeContext";
import { useContext, useState } from "react";

const EditNotice = ({ theNotice, editOrDetail }) => {
  const { dispatch } = useContext(NoticeContext);
  console.log("sws", theNotice)
  const [topic, setTopic] = useState(theNotice?.topic || "x");
  const [content, setContent] = useState(theNotice?.content || "x");
  const [date, setDate] = useState(theNotice?.date || "x");
  const [link, setlink] = useState(theNotice?.link);
  const [status, setStatus] = useState(theNotice?.status)
  const [newsId, setnewsId] = useState(theNotice?.newsId)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...theNotice,
      topic,
      content,
      status,
      date: new Date(),
      newsId,

    }
    dispatch({
      type: 'update',
      id: theNotice.id,
      state: newItem
    });
  }
  console.log("ss", status)

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Control
          className="mb-2"
          readOnly={editOrDetail ? true : false}
          type="text"
          placeholder="topic *"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        ></Form.Control>
        <Form.Control
          className="mb-2"
          readOnly={editOrDetail ? true : false}
          type="content"
          placeholder="content *"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></Form.Control>

        <Form.Control
          className="mb-2"
          readOnly={editOrDetail ? true : false}

          type="text"
          placeholder="newsId *"
          name="newsId"
          value={newsId}
          onChange={(e) => setnewsId(e.target.value)}
          required
        ></Form.Control>
        <Form.Group hidden={editOrDetail ? true : false} className="mb-2" controlId="formBasicCheckbox">
          <Form.Check type="checkbox"


            name="status"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            label="Check me out" />
        </Form.Group>

      </FormGroup>
      {!editOrDetail?<Button variant="success" type="submit" block>
        Update Notice
      </Button>:null}
    </Form>
  );
};

export default EditNotice;
