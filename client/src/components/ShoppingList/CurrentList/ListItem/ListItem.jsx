import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import Checkbox from '@material-ui/core/Checkbox';
import Reorder from '@material-ui/icons/Reorder';
import ItemTypes from '../../../UI/DragAndDrop/ItemTypes';
import classes from './ListItem.css';

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().originalIndex;
    const hoverIndex = props.getAbsoluteIndex(props.item.itemId);

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging Downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // OK, now we've checked. Time to perform the action!

    props.moveItem(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
  drop(props) {
    return {
      dropIndex: props.getAbsoluteIndex(props.item.itemId),
    };
  },
};

const itemSource = {
  beginDrag(props) {
    return {
      originalIndex: props.getAbsoluteIndex(props.item.itemId),
    };
  },

  endDrag(props, monitor) {
    const { originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    const dropResult = monitor.getDropResult();

    if (!didDrop) {
      return props.setItem(originalIndex, originalIndex);
    }
    if (dropResult) {
      return props.setItem(originalIndex, dropResult.dropIndex);
    }
    return null;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}

class Item extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const {
      connectDragSource,
      isDragging,
      item,
      connectDragPreview,
    } = this.props;
    const isActive = canDrop && isOver;
    let qtyString = '';
    if (item.unit || item.quantity > 1) {
      qtyString = item.unit
        ? `(${item.quantity} ${item.unit})`
        : `(${item.quantity})`;
    }
    return connectDragPreview(connectDropTarget(
    <div key={item.itemId}>
      <span className={classes.listitem}>
        <div
          style={{
            opacity: isDragging ? 0.5 : 1,
            marginLeft: '0px',
            padding: '1rem 1rem 1rem 7.2rem',
            position: 'relative',
            backgroundColor: isActive ? 'lightblue' : 'white',
          }}
        >
          {connectDragSource(
            <i
              className={classes.reorder}
              style={{
                height: '24px',
                width: '24px',
                display: 'block',
                position: 'absolute',
                top: '0px',
                margin: '0.6rem 0px',
                right: '4px',
              }}
            >
              <Reorder />
            </i>)}
          <div
            style={{
              cursor: 'pointer',
              position: 'absolute',
              overflow: 'visible',
              display: 'block',
              height: 'auto',
              width: '24px',
              top: '0',
              left: '16px',
            }}
          >
            <Checkbox
              onClick={(e) => {
                e.stopPropagation();
                this.props.handleCheck(item);
              }}
              classes={{ root: classes.checkbox }}
            />
          </div>
          <span
            className={item.purchased ? classes.purchased : null}
            onDoubleClick={() => this.props.setEditMode(item.itemId)}
          >
            {`${item.name} ${qtyString}`}
          </span>
        </div>
      </span>
    </div>));
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  //   getAbsoluteIndex: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default DropTarget(
  ItemTypes.LIST_ITEM,
  itemTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(DragSource(ItemTypes.LIST_ITEM, itemSource, collect)(Item));
