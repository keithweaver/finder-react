import React, { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';


class DraggableItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0,
      },
      controlledPosition: {
        x: -400, y: 200,
      },
      selected: false,
      deltaPositionOnStart: {
        x: 0, y: 0,
      },
      previousClickTimestamp: null,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.adjustXPos = this.adjustXPos.bind(this);
    this.adjustYPos = this.adjustYPos.bind(this);
    this.onControlledDrag = this.onControlledDrag.bind(this);
    this.onControlledDragStop = this.onControlledDragStop.bind(this);

    this.onItemClick = this.onItemClick.bind(this);
    this.isDoubleClick = this.isDoubleClick.bind(this);
  }

  onStart() {
    this.setState({ activeDrags: this.state.activeDrags += 1 });

    this.setState({
      deltaPositionOnStart: this.state.deltaPosition,
    });
  }

  onStop() {
    this.setState({ activeDrags: this.state.activeDrags -= 1 });

    if (
      this.state.deltaPositionOnStart.x === this.state.deltaPosition.x &&
      this.state.deltaPositionOnStart.y === this.state.deltaPosition.y
    ) {
      this.onItemClick();
    }
  }

  onControlledDrag(e, position) {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }

  onItemClick() {
    const { id } = this.props;
    if (this.isDoubleClick()) {
      this.props.doubleClick(id);
    } else if (this.state.selected) {
      this.props.clickWhenSelected(id);

      this.setState({
        selected: !this.state.selected,
      });
    } else {
      this.props.clickWhenUnselected(id);

      this.setState({
        selected: !this.state.selected,
      });
    }
    this.setState({
      previousClickTimestamp: new Date(),
    });
  }

  isDoubleClick() {
    const { previousClickTimestamp } = this.state;
    if (!previousClickTimestamp) {
      // First time loaded
      return false;
    }
    const currentDateTime = new Date();
    if ((currentDateTime - previousClickTimestamp) < 250) {
      return true;
    }
    return false;
  }

  // For controlled component
  adjustXPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  }

  adjustYPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  }

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  }

  render() {
    const {
      name,
      isFile,
      defaultPosition,
      folderIconStyle,
      fileIconStyle,
      folderTextStyle,
      fileTextStyle,
      selectIcontyle,
      selectNameTextStyle,
    } = this.props;

    let {
      icon,
    } = this.props;

    const {
      selected,
    } = this.state;


    if (!icon && isFile) {
      icon = 'https://raw.githubusercontent.com/keithweaver/finder-react/assets/file.png';
    } else if (!icon && !isFile) {
      icon = 'https://raw.githubusercontent.com/keithweaver/finder-react/assets/folder_icon.png';
    }


    let nameTextStyle = folderTextStyle;
    let iconStyle = folderIconStyle;

    if (isFile && selected) {
      nameTextStyle = objectAssign({}, fileTextStyle, selectNameTextStyle);
      iconStyle = objectAssign({}, fileIconStyle, selectIcontyle);
    } else if (selected) {
      nameTextStyle = objectAssign({}, folderTextStyle, selectNameTextStyle);
      iconStyle = objectAssign({}, folderIconStyle, selectIcontyle);
    } else if (isFile) {
      nameTextStyle = fileTextStyle;
      iconStyle = fileIconStyle;
    }

    return (
      <Draggable
        grid={[25, 25]}
        onStart={this.onStart}
        onStop={this.onStop}
        onDrag={this.handleDrag}
        defaultPosition={defaultPosition}
        allowAnyClick={false}
      >
        <div>
          <img
            src={icon}
            alt="Folder/File Icon"
            style={iconStyle}
          />
          <p style={nameTextStyle}>
            {name}
          </p>
        </div>
      </Draggable>
    );
  }
}

DraggableItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isFile: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  clickWhenSelected: PropTypes.func.isRequired,
  clickWhenUnselected: PropTypes.func.isRequired,
  doubleClick: PropTypes.func.isRequired,
  defaultPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  // Styles
  // eslint-disable-next-line react/forbid-prop-types
  folderIconStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  fileIconStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  folderTextStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  fileTextStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  selectIcontyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  selectNameTextStyle: PropTypes.object,
};

DraggableItem.defaultProps = {
  icon: null,
  defaultPosition: {
    x: 0,
    y: 0,
  },
  // Styles
  folderIconStyle: {
    height: 68,
  },
  fileIconStyle: {
    height: 60,
    paddingTop: 3,
    paddingBottom: 3,
  },
  folderTextStyle: {
    fontSize: 12,
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'sans-serif',
    maxWidth: 98,
    overflowWrap: 'break-word',
  },
  fileTextStyle: {
    fontSize: 12,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 3,
    fontFamily: 'sans-serif',
    maxWidth: 98,
    overflowWrap: 'break-word',
  },
  selectIcontyle: {
    backgroundColor: '#e0e0e0',
  },
  selectNameTextStyle: {
    backgroundColor: '#006bd2',
    color: '#fff',
    borderRadius: 2,
  },
};

export default DraggableItem;
