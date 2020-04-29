import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { fetchDemoList } from '../../../actions/demoListActions';
import PostItem from './PostItem';
         
class Posts extends Component {

	constructor(props) {

		//You are extending the React.Component class, and per the ES2015 spec, 
		//a child class constructor cannot make use of this until super() has 
		//been called; also, ES2015 class constructors have to call super() 
		//if they are subclasses.
		super(props);
		//console.log(this.props) //props will get logged.

   
	}
    
    static fetching ({ dispatch }) {
        return [ dispatch( fetchDemoList() ) ];
    } 

    /**
     * componentDidMount() is invoked immediately after a component 
     * is mounted (inserted into the tree). 
     * Initialization that requires DOM nodes should go here. 
     * If you need to load data from a remote endpoint, this 
     * is a good place to instantiate the network request.
     */
    componentDidMount() {
   
        // Request data
        this.props.dispatch(fetchDemoList());
   
        
    }


  render() {
    // Bind data and display
    const preloadedState = this.props.currentData;

    if ( preloadedState == null ) {
        console.log( 'preloadedState: null' );
    } else {
        console.log( 'preloadedState: Return an Array' );
    }
    
    return (
	  <Fragment>
   
            <div className="content">
                 {
                   ( preloadedState != null ) ? preloadedState.map((item, i) => <PostItem key={i} {...item} />) : ""
                  }
            </div>
       
          
      </Fragment>

    );
  }

}

    
// Subscribe to the required state in the reducers is bound 
// here (for details of the data structure: initState)
const mapStateToProps = (state) => {
    return {
        currentData: state.listData.items
    }
};

// Bind the introduced Actions
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};


// The most important step is to bind the required Reducer and Actions to the current page 
// through the connect function provided by react-redux

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Posts);

