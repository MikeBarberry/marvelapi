import React from 'react'
import { HashRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path ="/" component={Home} />
      <Route exact path ="/add" component={Add} /> 
      <Route exact path ="/edit" component={Edit} />
    </Router>
  );
}

export default App;
