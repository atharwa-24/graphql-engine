/* eslint no-unused-vars: 0 */
/* eslint import/prefer-default-export: 0 */

import { openAPIExplorer } from './spec';

import { setMetaData } from '../../validators/validators';

const setup = () => {
  describe('Setup route', () => {
    it('Visit the index route', () => {
      // Visit the index route
      cy.visit('/');
      cy.wait(7000);
      // Get and set validation metadata
      setMetaData();
    });
  });
};

export const runApiExplorerTests = () => {
  describe('API Explorer', () => {
    it('Open API Explorer', openAPIExplorer);
  });
};

// setup();
// runApiExplorerTests();
