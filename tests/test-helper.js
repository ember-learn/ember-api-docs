import Application from 'ember-api-docs/app';
import config from 'ember-api-docs/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import loadEmberExam from 'ember-exam/test-support/load';
loadEmberExam();
setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
