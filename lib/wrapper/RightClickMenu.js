import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';

const RightClickMenu = (props) => {
  const {
    wrapperStyle,
    contextMenuStyle,
    menuItemStyle,
    menuItemSeparator,
  } = props;
  return (
    <div style={wrapperStyle}>

      {
        (props.menuItems) ? (
          <ContextMenu id={props.id} style={contextMenuStyle} key={Math.random()}>
            {
              props.menuItems.map((menuItem, index) => {
                const separator = (index > 0) ? (<div style={menuItemSeparator} />) : (null);
                return (
                  <div>
                    {separator}
                    <MenuItem data={{}} onClick={menuItem.action} key={Math.random()}>
                      <p style={menuItemStyle}>
                        {menuItem.text}
                      </p>
                    </MenuItem>
                  </div>
                );
              })
            }
          </ContextMenu>
        ) : (null)
      }
    </div>
  );
};

RightClickMenu.propTypes = {
  id: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    action: PropTypes.func,
  })),
  // Styles
  // eslint-disable-next-line react/forbid-prop-types
  wrapperStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  contextMenuStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  menuItemStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  menuItemSeparator: PropTypes.object,
};

RightClickMenu.defaultProps = {
  menuItems: [],
  wrapperStyle: {
    height: '100%',
  },
  contextMenuStyle: {
    borderColor: '#E6E6E6',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 3,
  },
  menuItemStyle: {
    fontSize: 12,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    cursor: 'pointer',
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'sans-serif',
    textAlign: 'left',
  },
  menuItemSeparator: {
    height: 1,
    backgroundColor: '#E6E6E6',
  },
};


export default RightClickMenu;
