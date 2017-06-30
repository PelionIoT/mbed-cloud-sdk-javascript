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

sleep 1
python -u testrunner/bin/trunner -s http://localhost:5000
