import React from 'react';
import PropTypes from 'prop-types';
import './layout.scss';

class Layout$ extends React.Component {
    static get defaultProps() {
        return {};
    }

    static get propTypes() {
        return {};
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout">
                <header className="layout__header">
                    React Isomorphic Demo
                </header>
                <section className="layout__body">
                    { this.props.children }
                </section>
                <footer className="layout__footer">
                    All rights reserved &copy;
                </footer>
            </div>
        );
    }
}

export default Layout$;