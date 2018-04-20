import React, { Component }  from 'react';


import { ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';
import { blue100 } from 'material-ui/styles/colors';
import Item from '../ListItem/ListItem';

class ListCategory extends Component {
    render() {
    const items = this.props.items.map( (item, index) => <Item key={item.itemId} moveItem={this.props.moveItem} handleCheck={this.props.handleCheck} item={item} getAbsoluteIndex={this.props.getAbsoluteIndex} setEditMode={this.props.setEditMode} />);
    return this.props.items.length !== 0 ?
            <ListItem 
            key={this.props.name}
            autoGenerateNestedIndicator={false}
            primaryText={this.props.name} 
            initiallyOpen={true}
            nestedItems={items}
            nestedListStyle={{marginLeft:'0px', padding:'0px'}}
            style={{backgroundColor: blue100, padding: '0px'}}
            innerDivStyle={{padding:'1rem'}}
            /> : null;
    }
} 


export default ListCategory;