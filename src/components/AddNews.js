import { Button } from "react-bootstrap";
import { Form, FormGroup } from "react-bootstrap";
import { NewsContext } from "../context/NewsContext";
import { useContext, useState } from "react";

const AddNews = () => {
  const { dispatch } = useContext(NewsContext);
  const [newNews, setNewNews] = useState({
    topic: "",
    content: "",
    lastdate: "",
    link: "",
    status: false
  });

  const { topic, content, lastdate, link, status } = newNews;

  const onInputChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setNewNews({ ...newNews, [e.target.name]: value });
  };
  console.log(status)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'add',
      state: {
        topic: newNews.topic,
        content: newNews.content,
        date: new Date(),
        status: newNews.status,
        notice: ["Test Duyuru 1 ", "Test Duyuru 2", "Test duyuru 5"]
      }
    });
  };



  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Control
          type="text"
          placeholder="topic *"
          name="topic"
          value={topic}
          onChange={(e) => onInputChange(e)}
          required
        ></Form.Control>
        <Form.Control
          type="text"
          placeholder="content *"
          name="content"
          value={content}
          onChange={(e) => onInputChange(e)}
          required
        ></Form.Control>
        <Form.Control
          as="textarea"
          placeholder="lastdate"
          name="lastdate"
          value={lastdate}
          onChange={(e) => onInputChange(e)}
          rows={3}
        ></Form.Control>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" name="status" checked={status} onChange={(e) => onInputChange(e)} label="Check me out" />
        </Form.Group>
      </FormGroup>
      <Button variant="success" type="submit" block>
        Add New News
      </Button>
    </Form>
  );
};

export default AddNews;
