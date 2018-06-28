import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import * as tooltip from './Tooltips';
import globals from 'Globals';
import 'react-toggle/style.css';
import Spinner from '../Common/Spinner/Spinner';

const Main = ({ children, location, migrationModeProgress, currentSchema }) => {
  const styles = require('./Main.scss');
  const appPrefix = '';
  const logo = require('./logo.svg');
  const currentLocation = location.pathname;
  const currentActiveBlock = currentLocation.split('/')[1];

  const sidebarClass = styles.sidebar;

  let mainContent = null;
  if (migrationModeProgress) {
    mainContent = (
      <div>
        {' '}
        <Spinner />{' '}
      </div>
    );
  } else {
    mainContent = children && React.cloneElement(children);
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <div className={sidebarClass}>
          <div className={styles.header_logo_wrapper}>
            <div className={styles.logoParent}>
              <div className={styles.logo}>
                <Link to="/">
                  <img className="img img-responsive" src={logo} />
                </Link>
              </div>
              <Link to="/">
                <div className={styles.header_project_name}>HASURA</div>
              </Link>
            </div>
          </div>
          <div className={styles.header_items}>
            <ul>
              <OverlayTrigger placement="right" overlay={tooltip.apiexplorer}>
                <li>
                  <Link
                    className={
                      currentActiveBlock === 'api-explorer' ||
                      currentActiveBlock === ''
                        ? styles.navSideBarActive
                        : ''
                    }
                    to={appPrefix + '/api-explorer'}
                  >
                    <div className={styles.iconCenter}>
                      <i
                        title="API Explorer"
                        className="fa fa-flask"
                        aria-hidden="true"
                      />
                    </div>
                    <p>API Explorer</p>
                  </Link>
                </li>
              </OverlayTrigger>
              <OverlayTrigger placement="right" overlay={tooltip.data}>
                <li>
                  <Link
                    className={
                      currentActiveBlock === 'data'
                        ? styles.navSideBarActive
                        : ''
                    }
                    to={appPrefix + '/data/schema/' + currentSchema}
                  >
                    <div className={styles.iconCenter}>
                      <i
                        title="Data Service"
                        className="fa fa-database"
                        aria-hidden="true"
                      />
                    </div>
                    <p>Data</p>
                  </Link>
                </li>
              </OverlayTrigger>
            </ul>
          </div>
          <div className={styles.clusterInfoWrapper}>
            <div className="dropdown">
              <button
                className={
                  styles.clusterBtn + ' btn btn-secondary dropdown-toggle'
                }
                type="button"
                id="dropdownMenuButton"
              >
                {globals.dataApiUrl}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.main + ' container-fluid'}>{mainContent}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.main,
    header: { ...state.header },
    pathname: ownProps.location.pathname,
    currentSchema: state.tables.currentSchema,
  };
};

export default connect(mapStateToProps)(Main);
