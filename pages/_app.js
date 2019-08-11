import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';

import Layout from 'components/Layout';
import theme from 'src/theme';
import AuthService from 'src/utils/AuthService';

const auth = new AuthService();

import '../style.scss';

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {

        const { Component, pageProps } = this.props;
        const { layout = true } = pageProps;

        return (
            <Container>
                <Head>
                    <title>Bets Manager</title>
                </Head>
                <ThemeProvider theme={theme}>
                    {
                        layout ?
                        <Layout>
                            <Component {...pageProps} auth={auth} />
                        </Layout> :
                        <Component {...pageProps} />
                    }
                </ThemeProvider>
            </Container>
        );
    }
}

export default MyApp;
