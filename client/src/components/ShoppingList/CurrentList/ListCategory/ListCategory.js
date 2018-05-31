import React, { Component }  from 'react';
import ListItem from '@material-ui/core/ListItem';
import { blue100 } from 'material-ui/styles/colors';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../../../UI/DragAndDrop/ItemTypes';
// import PropTypes from 'prop-types';
import Item from '../ListItem/ListItem';
import { ListItemText, List } from '@material-ui/core';
import classes from './ListCategory.css';

const categoryTarget = {
    drop(props, monitor, component) {
        const droppedOnChild = monitor.didDrop()
        const dropResult = monitor.getDropResult()
        const dragIndex = monitor.getItem().originalIndex;
        const hoverIndex = props.getAbsoluteIndex(props.items[0].itemId) - 1;

        if (droppedOnChild) {
            console.log("Dropped on another item.");
            console.log("Specifically, dropped on ", dropResult)
            return
        }
        console.log(`Dropped item ${dragIndex} on ${hoverIndex}`);

        props.moveItem(dragIndex, hoverIndex, props.name);
        return {
                dropIndex: props.getAbsoluteIndex(props.items[0].itemId),
            }
    }
}

class ListCategory extends Component {
    render() {
        const { connectDropTarget } = this.props;
        const categoryhovered = this.props.isOverCurrent;
        const items = this.props.items.map( (item, index) => <Item key={item.itemId} moveItem={this.props.moveItem} setItem={this.props.setItem} handleCheck={this.props.handleCheck} item={item} getAbsoluteIndex={this.props.getAbsoluteIndex} setEditMode={this.props.setEditMode} />);
        return this.props.items.length !== 0 ?
                connectDropTarget(<div key={this.props.name}><ListItem style={{backgroundColor: categoryhovered ? 'green' : blue100, padding: '0px'}}>
                    <ListItemText primary={this.props.name} classes={{root: classes.CategoryName}} />
                </ListItem>
                    <List>
                        {items}
                    </List>
                </div>) : null;
    }
} 

export default DropTarget(ItemTypes.LIST_ITEM, categoryTarget, (connect, monitor) =>({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true,})
}))(ListCategory);