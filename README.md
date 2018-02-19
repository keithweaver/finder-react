# finder-react

![Example Image](https://raw.githubusercontent.com/keithweaver/finder-react/assets/example.gif?token=AGNQQFvLysdQUcOO0YRZXK7-rVQDgJ5wks5aJEX7wA%3D%3D "Example Image")

## Demo

## Setup

```bash
npm install finder-react --save
```


## Basics

```javascript
import React from 'react';
import { Finder } from 'finder-react';

const App = () => {
  const generalRightMenu = [
    {
      text: 'New Folder',
      action: () => {},
    },
    {
      text: 'Get Info',
      action: () => {},
    },
    {
      text: 'Clean Up',
      action: () => {},
    },
  ];
  const folderRightMenu = [
    {
      text: 'Get Info',
      action: () => {}
    },
    {
      text: 'Delete',
      action: () => {}
    },
  ];
  const fileRightMenu = [
    {
      text: 'Get Info',
      action: () => {}
    },
    {
      text: 'Copy',
      action: () => {}
    },
    {
      text: 'Delete',
      action: () => {}
    },
  ];
  const listOfFilesFolders = [
    {
      name: 'README.md',
      isFile: true,
      rightClickMenu: fileRightMenu,
      clickWhenSelected: () => {},
      clickWhenUnselected: () => {},
      doubleClick: () => {},
    },
    {
      name: 'CODE_OF_CONDUCT.md',
      isFile: true,
      rightClickMenu: fileRightMenu,
      clickWhenSelected: () => {
        console.log('clickWhenSelected');
      },
      clickWhenUnselected: () => {
        console.log('clickWhenUnselected');
      },
      doubleClick: () => {
        console.log('double click');
      },
    },
    {
      name: 'src',
      isFile: false,
      rightClickMenu: folderRightMenu,
      clickWhenSelected: () => {},
      clickWhenUnselected: () => {},
      doubleClick: () => {},
    },
  ];
  return (
    <div style={{ height: '100%' }}>
      <Finder
        listOfFilesFolders={listOfFilesFolders}
        generalRightMenu={generalRightMenu}
      />
    </div>
  );
}

export default App;
```
