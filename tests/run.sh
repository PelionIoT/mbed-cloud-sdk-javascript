#!/bin/bash
set -e

export DEBUG=superagent
export DEBUG_COLORS=true

node server/tests/codeCoverage.js &
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

# needed because of some weirdness in circleci
mkdir -p /home/circleci/build/test_fixtures
chmod -R 777 /home/circleci/build/test_fixtures

# sleep to allow coverage to get its hooks in
sleep 5

docker run --rm --net=host --name=testrunner_container \
-e "TEST_SERVER_URL=http://127.0.0.1:5000" \
-e "TEST_FIXTURES_DIR=/home/circleci/build/test_fixtures" \
-v /home/circleci/build/test_fixtures:/runner/test_fixtures \
${TESTRUNNER_DOCKER_IMAGE}
