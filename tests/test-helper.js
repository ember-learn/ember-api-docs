import resolver from './helpers/resolver';
import { setResolver } from '@ember/test-helpers';
import loadEmberExam from 'ember-exam/test-support/load';
import { start } from 'ember-cli-qunit';

setResolver(resolver);
loadEmberExam();
start();
