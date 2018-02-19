import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenuTrigger } from 'react-contextmenu';


import RightClickMenu from './RightClickMenu';
import FinderItem from '../elements/FinderItem';


/*
 * Used to generate a random id for the context menu. It needs to be unique.
 * This isn't an actual unique check.
 */
function getRandomString() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 25; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const Finder = (props) => {
  const {
    id,
    listOfFilesFolders,
    generalRightMenu,
    finderWrapperStyle,
    finderInnerWrapperStyle,
  } = props;

  if (!generalRightMenu) {
    return (
      <div style={finderWrapperStyle}>
        <div style={finderInnerWrapperStyle}>
          {
            (listOfFilesFolders) ? (
              listOfFilesFolders.map(fileObj => (
                <FinderItem
                  key={Math.random()}
                  finderItemRightClickMenu={fileObj.rightClickMenu}
                  name={fileObj.name}
                  id={(fileObj.id) ? (fileObj.id) : (getRandomString())}
                  isFile={fileObj.isFile}
                />
              ))
            ) : (null)
          }
        </div>
      </div>
    );
  }

  return (
    <div style={finderWrapperStyle}>
      <ContextMenuTrigger key={Math.random()} id={id} attributes={{ style: { height: '100%' } }}>
        <RightClickMenu
          id={id}
          menuItems={generalRightMenu}
        />
        <div
          style={finderInnerWrapperStyle}
        >
          {
            (listOfFilesFolders) ? (
              listOfFilesFolders.map(fileObj => (
                <FinderItem
                  key={Math.random()}
                  finderItemRightClickMenu={fileObj.rightClickMenu}
                  name={fileObj.name}
                  id={(fileObj.id) ? (fileObj.id) : (getRandomString())}
                  isFile={fileObj.isFile}
                  clickWhenSelected={fileObj.clickWhenSelected}
                  clickWhenUnselected={fileObj.clickWhenUnselected}
                  doubleClick={fileObj.doubleClick}
                />
              ))
            ) : (null)
          }
        </div>
      </ContextMenuTrigger>
    </div>
  );
};

Finder.propTypes = {
  id: PropTypes.string,
  listOfFilesFolders: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    isFile: PropTypes.bool.isRequired,
    rightClickMenu: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      action: PropTypes.func,
    })),
    doubleClick: PropTypes.func.isRequired,
    clickWhenSelected: PropTypes.func.isRequired,
    clickWhenUnselected: PropTypes.func.isRequired,
    icon: PropTypes.string,
  })),
  generalRightMenu: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    action: PropTypes.func,
  })),
  // eslint-disable-next-line react/forbid-prop-types
  finderWrapperStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  finderInnerWrapperStyle: PropTypes.object,
};

Finder.defaultProps = {
  id: getRandomString(),
  listOfFilesFolders: [],
  generalRightMenu: null,
  finderWrapperStyle: { height: '100%' },
  finderInnerWrapperStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

export default Finder;
