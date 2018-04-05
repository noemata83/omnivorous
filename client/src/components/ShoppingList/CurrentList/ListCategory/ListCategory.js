import React from 'react';

import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import classes from './ListCategory.css';
import { blue100 } from 'material-ui/styles/colors';

const listCategory = (props) => {
    const items = props.items.map(item => <ListItem 
        primaryTogglesNestedList={true}
        leftCheckbox={
        <Checkbox onClick={(e) => {
                e.stopPropagation();
                console.log("checked");      
                }}
                />}
        key={item.name}             
        style={{marginLeft:'0px'}}
        // setEditMode={props.setEditMode}
        // onClick={() => props.setEditMode(item.id)}
        primaryText={<span onDoubleClick={() => props.setEditMode(item.itemId)}>{`${item.name} ${item.unit ? "(" + item.quantity + " " + item.unit + ")" : ""}`}</span>}
        />)
    return props.items.length !== 0 ?
        (<ListItem 
            key={props.name}
            autoGenerateNestedIndicator={false}
            primaryText={props.name} 
            initiallyOpen={true}
            nestedItems={items}
            nestedListStyle={{marginLeft:'0px'}}
            style={{backgroundColor:blue100}}
            />) : null;
}

export default listCategory;