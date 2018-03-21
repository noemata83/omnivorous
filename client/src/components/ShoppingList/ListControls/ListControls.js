import React from 'react';
import { connect } from 'react-redux';

const listControls = (props) => {
    const listOptions = props.lists.map( list  => <option key={list.id} value={list.id}>{list.name}</option>);
    return (
        <div>
            <label htmlFor="selectList">Select List: </label>
            <select id="selectList"> {/* Needs an onChange property eventually, which will call the displayList reducer */}
                {listOptions}
            </select>
            <button type="Success">New List</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        lists: state.shoppingList.lists
    }
}

export default connect(mapStateToProps)(listControls);