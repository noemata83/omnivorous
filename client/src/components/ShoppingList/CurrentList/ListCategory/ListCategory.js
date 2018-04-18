import React from 'react';

import { ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';
import { blue100 } from 'material-ui/styles/colors';
import Item from '../ListItem/ListItem';

const listCategory = (props) => {
    const items = props.items.map(item => <Item key={item.itemId} handleCheck={props.handleCheck} item={item} setEditMode={props.setEditMode} />);
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