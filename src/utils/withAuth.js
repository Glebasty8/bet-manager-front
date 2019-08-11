import React, { Fragment } from 'react'
import Router from 'next/router';
import AuthService from './AuthService'
import Loader from 'components/Loader';

export default function withAuth(Component) {
    const Auth = new AuthService();
    return class Authenticated extends React.Component {
        static getInitialProps(ctx) {
            if (Component.getInitialProps)
                return Component.getInitialProps(ctx);
        }

        constructor(props) {
            super(props);
            this.state = {
                isLoading: true
            };
        }

        componentDidMount () {
            if (!Auth.loggedIn()) {
                Router.push('/login')
            }
            else {
                this.setState({ isLoading: false })
            }
        }

        render() {
            const { isLoading } = this.state;
            return (
                <Fragment>
                    {isLoading ? (
                        <div className="flex full align-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <Component {...this.props} auth={Auth} />
                    )}
                </Fragment>
            )
        }
    }

}
