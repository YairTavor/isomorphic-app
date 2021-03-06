import React from 'react';
import {connect} from 'react-redux';
import {actions} from './actions';
import Layout from '../common/components/layout';
import SubDemo from './sub-demo';
import './index.scss';

class Demo extends React.Component {

    componentDidMount() {
        if(this.props.data === 'none') {
            this.props.getData();
        }
    }

    render() {
        return (
            <Layout>
                <div className="demo">
                    <h1>Demo 1</h1>
                    <SubDemo />
                    <div>data: { this.props.data }</div>
                </div>
            </Layout>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { ...ownProps, ...state.demo }
}

function mapDispatchToProps(dispatch, ownProps) {
    const dispatchProps = {
        getData() {
            dispatch(actions.demoGetData());
        }
    };
    return {...ownProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)