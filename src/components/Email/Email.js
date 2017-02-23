import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col,Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle} >Send a message</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Please fill the <strong>form</strong> </ModalHeader>

            <Form id="contactform" action="https://formspree.io/amweizhang@gmail.com" method="POST">
              <ModalBody>
                <div class="form-alert"></div>
                <div class="form-error alert alert-default"><ul></ul></div>
                <FormGroup>
                    <Label for="name" sm={2}>Name</Label>
                    <Col sm={10}>
                      <Input type="text" name="name" id="name" placeholder="Your Name" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="email-address" sm={4}>Email Address</Label>
                    <Col sm={10}>
                      <Input type="email" name="_replyto" id="email" placeholder="Your Email" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="emailText" sm={4}>Message</Label>
                    <Col sm={10}>
                      <Input type="textarea" className = ".btn-lg.round" name="message" id="exampleText" rows="10" />
                    </Col>
                </FormGroup>

                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type = "submit" onClick={this.toggle}>Send a message!</Button>{' '}

                </ModalFooter>
            </Form>

        </Modal>
      </div>
    );
  }
}

export default ModalExample;
