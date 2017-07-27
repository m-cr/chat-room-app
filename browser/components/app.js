import React from 'react';
import Sidebar from './sidebar'

const App = (props) => (
  <div className="wrapper">
    <header>
      <h1>The Group Chat</h1>
    </header>
    <div className="appBody">
      <Sidebar className='sidebar'/>
      { props.children }
    </div>
  </div>
);

export default App;