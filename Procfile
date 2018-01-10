web: ./bin/ember-fastboot tmp/deploy-dist --port $PORT
release: npm i -g fastly-cli && fastly purge-all -k $FASTLY_PURGE_KEY -s $FASTLY_SERVICE_ID