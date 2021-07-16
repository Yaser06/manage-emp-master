import { Button } from "react-bootstrap";
import { Form, FormGroup } from "react-bootstrap";
import { NoticeContext } from "../context/NoticeContext";
import { useContext, useState } from "react";

const AddNotice = () => {
  const { dispatch } = useContext(NoticeContext);
  const [ newNotice, setNewNotice] = useState({
    topic: "",
    content: "",
    lastdate: "",
    link: "",
    status: false,
    newsId:""

  });

  const { topic, content, lastdate, status , newsId} = newNotice;

  const onInputChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setNewNotice({ ...newNotice, [e.target.name]: value });
  };
  console.log(status)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'add',
      state: {
        topic: newNotice.topic,
        content: newNotice.content,
        date: new Date(),
        status: newNotice.status,
        newsId:newNotice.newsId
        
      }
    });
  };



  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Control
        className="mb-2" 
          type="text"
          placeholder="topic *"
          name="topic"
          value={topic}
          onChange={(e) => onInputChange(e)}
          required
        ></Form.Control>
        <Form.Control
        className="mb-2" 
          type="text"
          placeholder="content *"
          name="content"
          value={content}
          onChange={(e) => onInputChange(e)}
          required
        ></Form.Control>
        
        <Form.Control
        className="mb-2" 
          type="text"
          placeholder="newsId *"
          name="newsId"
          value={newsId}
          onChange={(e) => onInputChange(e)}
          required
        ></Form.Control>
        <Form.Group className="mb-2" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" name="status" checked={status} onChange={(e) => onInputChange(e)} label="Check me out" />
        </Form.Group>
      </FormGroup>
      <Button variant="success" type="submit" block>
        Add New Notice
      </Button>
    </Form>
  );
};

export default AddNotice;
