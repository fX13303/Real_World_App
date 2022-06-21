import Main from './components/main';
import React, {Component} from 'react';
// import { render } from '@testing-library/react';
export const AuthContext = React.createContext(null)

class App extends React.Component {
  state = {
    isLoggedIn: false
  }
  
  render() {
    const token = localStorage.getItem("token")
    if (token) {
      this.state.isLoggedIn = true;
    }
    // console.log(this.state)
    return (
      <AuthContext.Provider value={{isLoggedIn: this.state.isLoggedIn, setIsLoggedIn: (v) => this.setState({ isLoggedIn: v })}}>
        <div>
          <Main />
        </div>
      </AuthContext.Provider>


    );
  }
}

  

export default App;
