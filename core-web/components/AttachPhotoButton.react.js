/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import * as React from 'react';
import { Button, Container, Form, Header, Icon, Image, Modal } from 'semantic-ui-react';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import InputContainer from './boi/InputContainer';
import Spacer from './Spacer.react';


export interface AttachPhotoField {
  name: string;
  value?: string;
  label: string;
  placeholder?: string;
}


export interface AttachPhotoButtonProps {
  label: string;
  iconName: string;
  onFinished: (result: any) => void;
  fields: AttachPhotoField[];
  iconSize: string;
  labelStyle: any;
}

export interface AttachPhotoButtonState {
  isOpen: boolean;
  isCameraShown: boolean;
  step: 1 | 2;
  dataUri: string;
  fields: Object;
}

export default class AttachPhotoButton extends React.Component<AttachPhotoButtonProps, AttachPhotoButtonState> {
  static defaultProps = {
    label: 'Attach Photo',
    fields: [],
    iconName: 'plus square',
    iconSize: 'big',
  };

  state: AttachPhotoButtonState = {
    isOpen: false,
    isCameraShown: false,
    step: 1,
    dataUri: '',
    fields: {},
  };

  input: any;

  handleSubmit = (ev: any) => {
    ev.nativeEvent.preventDefault();
    ev.nativeEvent.stopPropagation();

    if (typeof this.props.onFinished === 'function') {
      this.props.onFinished({
        dataUri: this.state.dataUri,
        fields: Object.assign({}, this.state.fields),
      });
    }

    this.closeModal();
  }

  onInputChange = (ev: any) => {
    if (ev.target.files[0]) {
      let dataUri = window.URL.createObjectURL(ev.target.files[0]);
      this.openModal();
      this.onTakePhoto(dataUri);
    } else {
      this.setState({ dataUri: '' });
      this.closeModal();
    }
  };

  onTakePhoto = (dataUri: string) => {
    this.setState({ dataUri, step: 2 });
  };

  onCameraStop = () => {
    if (this.state.isOpen && this.state.step == 1) {
      this.closeModal();
    }
  };

  onFieldChangeValue = (field: AttachPhotoField, value: string) => {
    this.setState({ [field.name]: value });
  }

  openModal = () => {
    this.setState({ isOpen: true });
  }

  closeModal = () => {
    this.setState({ isOpen: false });
  }

  showCamera = () => {
    window.setTimeout(() => this.setState({ isCameraShown: true }), 300);
  }

  hideCamera = () => {
    this.setState({ isCameraShown: false });
  }

  getModalTitle() {
    return this.state.step === 1 ? 'Take a Photo' : 'Photo information';
  }

  renderButton() {
    // FIXME: This is a quickfix to make the label appears as an Button
    return (
      <Button.Group fluid vertical>
        <label className="ui huge fluid icon right labeled button defaultButton whiteBackground" style={this.props.labelStyle}>
          {this.props.label}
          <Icon name={this.props.iconName} right size={this.props.iconSize} />
          <input
            type="file"
            accept="images/*;capture=camera"
            capture={true}
            style={{ visibility: 'hidden', position: 'absolute' }}
            onChange={this.onInputChange}
          />
        </label>
      </Button.Group>
    );

    // return (q
    //   <Button.Group fluid vertical>
    //     <Button
    //       as='button'
    //       icon
    //       labelPosition='right'
    //       fluid
    //       size="huge"
    //       className="defaultButton whiteBackground"
    //       onClick={this.openModal}
    //     >
    //       Attach Photo
    //       <Icon name='plus square' right size="big"/>
    //     </Button>
    //   </Button.Group>
    // );
  }

  renderFirstStep() {
    if (this.state.isCameraShown === false) {
      return undefined;
    }

    return <Camera onTakePhoto={this.onTakePhoto}
      sizeFactor={1}
      onCameraStop={this.onCameraStop}
      idealResolution={{ width: 1024, height: 1024 }}
      imageType={IMAGE_TYPES.JPG} />
  }

  renderSecondStep() {
    return (
      <Container textAlign="center">
        <div className="imagecircle" style={{ background: `url("${this.state.dataUri}")` }}></div>
        <Spacer />
        <Form className="boiform">
          {this.props.fields.map(field => (
            <Form.Input
              label={field.label}
              type="text"
              value={this.state.fields[field.name]}
              placeholder={field.placeholder || "TYPE HERE"}
              onChange={e => this.onFieldChangeValue(field, e.target.value)}
            />
          ))}
          <Spacer />
          <Button.Group vertical fluid>
            <Button
              as='button'
              content='Confirm'
              primary
              fluid
              className={`defaultButton blueBackground`}
              size='huge'
              onClick={this.handleSubmit}
              />
          </Button.Group>
        </Form>
      </Container>
    );
  }

  render() {
    return (
      <div>
        <Modal trigger={this.renderButton()} onOpen={this.showCamera} onClose={this.hideCamera} open={this.state.isOpen}>
          <Modal.Header>{this.getModalTitle()}</Modal.Header>
          <Modal.Content className="SP-InsurancePage">
            {this.state.step === 1 ? this.renderFirstStep() : this.renderSecondStep()}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
