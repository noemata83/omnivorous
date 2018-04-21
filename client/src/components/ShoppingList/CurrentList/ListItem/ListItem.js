import React, { Component }  from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { ListItem, Checkbox } from 'material-ui';
import ItemTypes from '../../../UI/DragAndDrop/ItemTypes';

const itemTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().originalIndex;
        const hoverIndex = props.getAbsoluteIndex(props.item.itemId);

        if (dragIndex === hoverIndex) {
            return
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
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // OK, now we've checked. Time to perform the action!

        props.moveItem(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    },
    drop(props) {
        return {
            dropIndex: props.getAbsoluteIndex(props.item.itemId),
        }
    }
};

const itemSource = {
    beginDrag(props) {
        return {
            originalIndex: props.getAbsoluteIndex(props.item.itemId)
        }
    },

    endDrag(props,monitor) {
        const { originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        const dropResult = monitor.getDropResult();

        if (!didDrop) {
            return props.setItem(originalIndex, originalIndex);
        }
        if (dropResult) {
            return props.setItem(originalIndex, dropResult.dropIndex);
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


const itemStyle = {
    marginLeft: '0px',
    padding: '0px'
}


class Item extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const { connectDragSource, isDragging, item } = this.props;
        const isActive = canDrop && isOver;
        let qtyString = '';
        if (item.unit || item.quantity > 1) {
           qtyString = item.unit ? `(${item.quantity} ${item.unit})` : `(${item.quantity})`; 
        }
        return connectDragSource(connectDropTarget( 
            <div style={{opacity: isDragging ? 0.5 : 1}}>
            <ListItem 
            primaryTogglesNestedList={true}
            leftCheckbox={
            <Checkbox onClick={(e) => {
                    e.stopPropagation();
                    this.props.handleCheck(item);
                    }}
                    style={{top:'.5rem'}}
                    />}
            key={item.itemId}             
            style={item.purchased ? {...itemStyle, fontStyle: 'italic', textDecoration: 'line-through'} : itemStyle}
            innerDivStyle={{padding: '1rem 1rem 1rem 7.2rem', backgroundColor: isActive ? 'lightblue' :'white'}}
            primaryText={<span onDoubleClick={() => this.props.setEditMode(item.itemId)}>{`${item.name} ${qtyString}`}</span>}
            />
            </div>
        ));
    }
}

Item.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    getAbsoluteIndex: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.LIST_ITEM, itemTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(DragSource(ItemTypes.LIST_ITEM, itemSource, collect)(Item));

