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

# run docker and remove container afterwards
#   where our SDK server is located
#   host-relative path to fixtures mountpoint
#   configure the fixtures mountpoint
#   configure the results mountpoint
#   image name

docker run --rm --net=host --name=testrunner_container\
-e "TEST_SERVER_URL=http://127.0.0.1:5000"\
-e "TEST_FIXTURES_DIR=/home/ubuntu/cci_fixtures"\
-v /home/ubuntu/cci_fixtures:/runner/test_fixtures\
-v ${PROJECT_REPORTS}:/runner/results\
${TESTRUNNER_DOCKER_IMAGE}
