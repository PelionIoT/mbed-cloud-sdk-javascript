#!/bin/bash
set -e

export DEBUG=superagent
export DEBUG_COLORS=true

node server.js &
pid=$!

function finish {
	kill $pid
}
trap finish EXIT

docker run --rm --net=host --name=testrunner_container\
# where our SDK server is located
-e "TEST_SERVER_URL=http://127.0.0.1:5000"\
# host-relative path to fixtures mountpoint
-e "TEST_FIXTURES_DIR=/home/ubuntu/cci_fixtures"\
# configure the fixtures mountpoint
-v /home/ubuntu/cci_fixtures:/runner/test_fixtures\
# configure the results mountpoint
-v ./integration_results:/runner/results\
${INTEGRATION_DOCKER}
