import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ListItem, Checkbox } from 'material-ui';
import ItemTypes from '../../../UI/DragAndDrop/ItemTypes';

const itemSource = {
    beginDrag(props) {
        return {
            itemId: props.item.itemId
        }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            console.log(
            `You dropped ${item.itemId} into ${dropResult.name}` 
            );        
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
        const { connectDragSource, isDragging, item } = this.props;
        if (isDragging) {
            console.log(this.props);
        }
        let qtyString = '';
        if (item.unit || item.quantity > 1) {
           qtyString = item.unit ? `(${item.quantity} ${item.unit})` : `(${item.quantity})`; 
        }
        return connectDragSource(   
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
            style={item.purchased ? {...itemStyle, fontStyle: 'italic', textDecoration: 'line-through'} : itemStyle }
            innerDivStyle={{padding: '1rem 1rem 1rem 7.2rem'}}
            // setEditMode={props.setEditMode}
            // onClick={() => props.setEditMode(item.id)}
            primaryText={<span onDoubleClick={() => this.props.setEditMode(item.itemId)}>{`${item.name} ${qtyString}`}</span>}
            />
            </div>
        );
    }
}

Item.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.LIST_ITEM, itemSource, collect)(Item);

