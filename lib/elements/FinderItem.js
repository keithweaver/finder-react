import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenuTrigger } from 'react-contextmenu';

import RightClickMenu from '../wrapper/RightClickMenu';
import DraggableItem from './DraggableItem';

const finderItemWrapperStyle = {
  display: 'inline-block',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 15,
  paddingRight: 15,
  textAlign: 'center',
  maxWidth: 98,
  verticalAlign: 'top',
};


const FinderItem = (props) => {
  if (props.finderItemRightClickMenu.length === 0) {
    return (
      <div>
        <DraggableItem name={props.name} />
      </div>
    );
  }
  return (
    <div style={finderItemWrapperStyle}>
      <RightClickMenu
        id={props.id}
        menuItems={props.finderItemRightClickMenu}
      />
      <ContextMenuTrigger id={props.id} key={Math.random()}>
        <DraggableItem
          id={props.id}
          name={props.name}
          isFile={props.isFile}
          clickWhenSelected={props.clickWhenSelected}
          clickWhenUnselected={props.clickWhenUnselected}
          doubleClick={props.doubleClick}
          icon={props.icon}
        />
      </ContextMenuTrigger>
    </div>
  );
};

FinderItem.propTypes = {
  finderItemRightClickMenu: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    action: PropTypes.func,
  })),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isFile: PropTypes.bool.isRequired,
  clickWhenSelected: PropTypes.func.isRequired,
  clickWhenUnselected: PropTypes.func.isRequired,
  doubleClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
};

FinderItem.defaultProps = {
  finderItemRightClickMenu: null,
  icon: null,
};

export default FinderItem;
