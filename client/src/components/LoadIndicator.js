import React from 'react';
import Loader from 'react-loader-spinner';

class LoadIndicator extends React.Component {
    render() {
        return(
            <div className="loader">
                <Loader type="ThreeDots" color="white" height="100" width="100" />
            </div>
        )
    }
} 

export default LoadIndicator