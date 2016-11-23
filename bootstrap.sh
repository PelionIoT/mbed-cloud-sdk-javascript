#!/bin/bash
# Configuration
LIB_NAME="dist"
LANGUAGE="javascript"

echoerr() {
  echo "$@" 1>&2;
}

move_modules() {
  # $1: git directory for generated SDK
  # Example: 
  #     move_module $TMP_DIR
  rm -rf $LIB_NAME/_backends;
  mkdir -p $LIB_NAME/_backends;

  SDK="$1/generated/$LANGUAGE";
  for d in $SDK/*/; do 
    DIR=$(basename "$d");
    mv $SDK/$DIR/src $LIB_NAME/_backends/$DIR;

    # Ensure we get the documentation included too, for good measure.
    mv $SDK/$DIR/README.md $LIB_NAME/_backends/$DIR;
    mv $SDK/$DIR/docs $LIB_NAME/_backends/$DIR/docs;
  done

  browserify $LIB_NAME/devices.js -o $LIB_NAME/devices_bundle.js -i buffer -s Devices
}

run_codegen() {
  echo $1
  virtualenv $1/venv/
  $1/venv/bin/pip install -r $1/requirements.txt
  $1/venv/bin/python $1/runner.py $LANGUAGE
}

# Ensure we call the script from script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
CURRENT_DIR=$(pwd);
if [ $SCRIPT_DIR != $CURRENT_DIR ]; then
  echoerr "Script should be executed from script directory ($SCRIPT_DIR). Aborting.";
  exit 1;
fi

# Create structure, per the docs
# See: https://github.com/ARMmbed/mbed-cloud-sdk-codegen/docs/high-level-structure.md
# create_module devices;
# create_module access;

# Fetch generated code to tmp directory
TMP_DIR=`mktemp -d 2>/dev/null || mktemp -d -t 'mbed-cloud-sdk'`;
git clone git@github.com:ARMmbed/mbed-cloud-sdk-codegen.git $TMP_DIR;

# Run the code generator for Python. First setup environment, then generate.
run_codegen $TMP_DIR

# Copy the different APIs into correct modules
move_modules $TMP_DIR

# Cleanup
rm -rf $TMP_DIR;
