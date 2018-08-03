# --------------------------------------------------------------------------
# Mbed Cloud Python SDK
# (C) COPYRIGHT 2017 Arm Limited
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# --------------------------------------------------------------------------
"""Part of the CI process"""

import os
import subprocess
import urllib.request
import json


def git_url_ssh_to_https(url):
    """Convert a git url

    url will look like
    https://github.com/ARMmbed/mbed-cloud-sdk-python.git
    or
    git@github.com:ARMmbed/mbed-cloud-sdk-python.git
    we want:
    https://${GITHUB_TOKEN}@github.com/ARMmbed/mbed-cloud-sdk-python-private.git
    """
    path = url.split('github.com', 1)[1][1:].strip()
    new = 'https://{GITHUB_TOKEN}@github.com/%s' % path
    print('rewriting git url to: %s' % new)
    return new.format(GITHUB_TOKEN=os.getenv('GITHUB_TOKEN'))


def main():
    """Tags the current repository

    and commits changes to news files
    """
    version = subprocess.check_output(['python', '-m', 'auto_version', '--config=scripts/auto_version.toml']).decode().strip()
    print('preparing environment')
    url = subprocess.check_output(['git', 'remote', 'get-url', 'origin'])
    new_url = git_url_ssh_to_https(url.decode())
    subprocess.check_call(['git', 'remote', 'set-url', 'origin', new_url])
    branch_spec = 'origin/%s' % os.getenv('CIRCLE_BRANCH')
    subprocess.check_call(['git', 'branch', '--set-upstream-to', branch_spec])
    print('pushing tags')
    subprocess.check_call(['git', 'tag', '-a', version, '-m', 'release %s' % version])
    subprocess.check_call(['git', 'tag', '-f', 'latest'])
    subprocess.check_call(['git', 'push', '-f', 'origin', '--tags'])
    print('commit version')
    subprocess.check_call(['git', 'add', 'package.json', 'CHANGELOG.md', 'docs/news/*'])
    subprocess.check_call(['git', 'commit', '-m', ':checkered_flag: Increment version\n[skip ci]'])
    print('pushing commits')
    subprocess.check_call(['git', 'push', 'origin'])
    print('setting version release flag')
    version = subprocess.check_output(['python', '-m', 'auto_version', '--config=scripts/auto_version.toml', '--release']).decode().strip()
    print('uploading to npm')
    subprocess.check_call(['npm', 'publish', '--tag=beta'])
    print('uploading to npm successful')
    # posting message to slack
    body = {"text": ":checkered_flag: New version of :javascript: SDK released: {}".format(version)}
    myurl = "https://hooks.slack.com/services/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"
    req = urllib.request.Request(myurl)
    req.add_header('Content-Type', 'application/json; charset=utf-8')
    jsondata = json.dumps(body)
    jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
    req.add_header('Content-Length', len(jsondataasbytes))
    response = urllib.request.urlopen(req, jsondataasbytes)


if __name__ == '__main__':
    main()
