import React from 'react';

import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { blue100 } from 'material-ui/styles/colors';

const listCategory = (props) => {
    const items = props.items.map(item => {
        let qtyString = '';
        if (item.unit || item.quantity > 1) {
           qtyString = item.unit ? `(${item.quantity} ${item.unit})` : `(${item.quantity})`; 
        }
        return <ListItem 
            primaryTogglesNestedList={true}
            leftCheckbox={
            <Checkbox onClick={(e) => {
                    e.stopPropagation();
                    console.log("checked");      
                    }}
                    style={{top:'.5rem'}}
                    />}
            key={item.itemId}             
            style={{marginLeft:'0px', padding: '0px'}}
            innerDivStyle={{padding: '1rem 1rem 1rem 7.2rem'}}
            // setEditMode={props.setEditMode}
            // onClick={() => props.setEditMode(item.id)}
            primaryText={<span onDoubleClick={() => props.setEditMode(item.itemId)}>{`${item.name} ${qtyString}`}</span>}
        />})
    return props.items.length !== 0 ?
        (<ListItem 
            key={props.name}
            autoGenerateNestedIndicator={false}
            primaryText={props.name} 
            initiallyOpen={true}
            nestedItems={items}
            nestedListStyle={{marginLeft:'0px', padding:'0px'}}
            style={{backgroundColor:blue100, padding: '0px'}}
            innerDivStyle={{padding:'1rem'}}
            />) : null;
}

export default listCategory;