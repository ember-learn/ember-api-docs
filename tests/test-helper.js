import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import loadEmberExam from 'ember-exam/test-support/load';

setResolver(resolver);
loadEmberExam();
