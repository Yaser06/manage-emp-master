import { Button } from "react-bootstrap";
import { Form, FormGroup } from "react-bootstrap";
import { NewsContext } from "../context/NewsContext";
import { useContext, useState } from "react";

const EditNews = ({ theNews }) => {
  const { dispatch } = useContext(NewsContext);
  console.log("sws", theNews)
  const [topic, setTopic] = useState(theNews?.topic || "x");
  const [content, setContent] = useState(theNews?.content || "x");
  const [date, setDate] = useState(theNews?.date || "x");
  const [link, setlink] = useState(theNews?.link);
  const [status, setStatus] = useState(theNews?.status)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...theNews,
      topic,
      content,
      status,
      date: new Date(),

    }
    dispatch({
      type: 'update',
      id: theNews.id,
      state: newItem
    });
  }
  console.log("ss",status)

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Control
          type="text"
          placeholder="topic *"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        ></Form.Control>
        <Form.Control
          type="content"
          placeholder="content *"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></Form.Control>
        <Form.Control
          as="textarea"
          placeholder="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          rows={3}
        >
        </Form.Control>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox"
            name="status" 
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            label="Check me out" />
        </Form.Group>
      </FormGroup>
      <Button variant="success" type="submit" block>
        Update News
      </Button>
    </Form>
  );
};

export default EditNews;
