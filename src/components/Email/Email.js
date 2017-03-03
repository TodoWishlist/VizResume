import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <Form id="contactform" action="https://formspree.io/amweizhang@gmail.com" method="POST">
          <div className="form-alert" />
          <div className="form-error alert alert-default"><ul /></div>
          <FormGroup>
            <Label for="name" sm={2}>Name</Label>
            <Col sm={8}>
              <Input type="text" name="name" id="name" placeholder="Your Name" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="email-address" sm={4}>Email Address</Label>
            <Col sm={8}>
              <Input type="email" name="_replyto" id="email" placeholder="Your Email" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="emailText" sm={4}>Message</Label>
            <Col sm={8}>
              <Input type="textarea" className=".btn-lg.round" name="message" id="exampleText" rows="10" />
            </Col>
          </FormGroup>

          <Button color="primary" type="submit">Send a message!</Button>{' '}
        </Form>

      </div>
    );
  }
}

export default ModalExample;
