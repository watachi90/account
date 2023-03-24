import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'formdata-polyfill';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import {
  subscribe, initialize, APP_INIT_ERROR, APP_READY, mergeConfig,
} from '@edx/frontend-platform';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import configureStore from './data/configureStore';
import AccountSettingsPage, { NotFoundPage } from './account-settings';
import IdVerificationPage from './id-verification';
import CoachingConsent from './account-settings/coaching/CoachingConsent';
import appMessages from './i18n';

import './index.scss';
import Head from './head/Head';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Head />
      <Switch>
        <Route path="/coaching_consent" component={CoachingConsent} />
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <Header />
          <main className="flex-grow-1">
            <Switch>
              <Route path="/id-verification" component={IdVerificationPage} />
              <Route exact path="/" component={AccountSettingsPage} />
              <Route path="/notfound" component={NotFoundPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </main>
          {/* <Footer /> */}
          <div className="wrapper-footer">
            <footer>
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <ul className="list-unstyled">
                      <li><b>COMPANÍA</b></li>
                      <li><a href="./about">Acerca de Atenea</a></li>
                      <li><a href="https://atenea.com.ec">Equipo</a></li>
                      <li><a href="./contact">Contacto</a></li>
                    </ul>
                  </div>

                  <div className="col-sm uamx_footer-middle">
                    <ul className="list-unstyled">
                      <li><b>PRODUCTOS</b></li>
                      <li><a href="./">Ecosistema Digital</a></li>
                      <li><a href="./">Sector Público</a></li>
                    </ul>
                  </div>

                  <div className="col-sm uamx_footer-middle">
                    <ul className="list-unstyled">
                      <li><b>LEGAL</b></li>
                      <li><a href="./privacy">Política de privacidad</a></li>
                      <li><a href="./tos">Términos del servicio</a></li>
                    </ul>
                  </div>

                  <div className="col-sm last-col">
                    <div className="footer-about-openedx">
                      <h5>
                        <a href="https://app.atenea.digital/">
                          {/* <img src="account/logo_foot_01.png" alt="Atenea" width="140" /> */}
                        </a>
                      </h5>
                    </div>
                    <p>Aprende en nuestras redes:</p>
                    <div className="social-wrapper">

                      <div className="social">
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><span className="fa fa-facebook" aria-hidden="true" /></a>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer"><span className="fa fa-twitter" aria-hidden="true" /></a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><span className="fa fa-youtube" aria-hidden="true" /></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><span className="fa fa-instagram" aria-hidden="true" /></a>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="copyright small">© 2023 <a href="https://app.atenea.digital/">Atenea Educación</a></p>
            </footer>
          </div>
        </div>
      </Switch>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL,
        COACHING_ENABLED: (process.env.COACHING_ENABLED || false),
        ENABLE_DEMOGRAPHICS_COLLECTION: (process.env.ENABLE_DEMOGRAPHICS_COLLECTION || false),
        DEMOGRAPHICS_BASE_URL: process.env.DEMOGRAPHICS_BASE_URL,
        ENABLE_COPPA_COMPLIANCE: (process.env.ENABLE_COPPA_COMPLIANCE || false),
        ENABLE_DOB_UPDATE: (process.env.ENABLE_DOB_UPDATE || false),
        MARKETING_EMAILS_OPT_IN: (process.env.MARKETING_EMAILS_OPT_IN || false),
      }, 'App loadConfig override handler');
    },
  },
});
