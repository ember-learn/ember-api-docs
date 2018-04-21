if [[ $TRAVIS_BRANCH == 'master' ]]
then
  yarn test:browserstack
else
  yarn test
fi
