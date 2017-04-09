#!/bin/bash
set -e

cd "${0%/*}"
node server.js &
pid=$!

function finish {
	kill $pid
}
trap finish EXIT

./testrunner/bin/trunner -s http://localhost:5000
