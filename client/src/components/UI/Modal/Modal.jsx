import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Wrapper>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}

Modal.defaultProps = {
  children: [],
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.any,
  modalClosed: PropTypes.func.isRequired,
};

export default Modal;
