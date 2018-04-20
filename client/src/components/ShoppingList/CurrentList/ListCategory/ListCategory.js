import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';
import { blue100 } from 'material-ui/styles/colors';
import Item from '../ListItem/ListItem';
import ItemTypes from '../../../UI/DragAndDrop/ItemTypes';

const itemTarget = {
    drop(props) {
        return { name: props.name}
    },
};

class ListCategory extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const items = this.props.items.map(item => <Item key={item.itemId} handleCheck={this.props.handleCheck} item={item} setEditMode={this.props.setEditMode} />);
    return this.props.items.length !== 0 ? connectDropTarget( <div> 
            <ListItem 
            key={this.props.name}
            autoGenerateNestedIndicator={false}
            primaryText={this.props.name} 
            initiallyOpen={true}
            nestedItems={items}
            nestedListStyle={{marginLeft:'0px', padding:'0px'}}
            style={{backgroundColor: isActive ? 'green' : blue100, padding: '0px'}}
            innerDivStyle={{padding:'1rem'}}
            /></div>) : null;
    }
} 

ListCategory.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
}

export default DropTarget(ItemTypes.LIST_ITEM, itemTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(ListCategory);