# Changelog

The SDK is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

This news file contains a log of notable changes to the SDK. Please see [npm history for mbed-cloud-sdk](https://www.npmjs.com/package/mbed-cloud-sdk?activeTab=versions) for
a list of versions that have been released on **npm**.

[//]: # (begin_release_notes)

1.2.11 (2018-07-06)
===================

### Features

- Add support for billing endpoints getReportOverview, getServicePackages,
  getQuotaHistory and getQuotaRemaining. (#1210)


1.2.10 (2018-06-26)
===================

### Features

- Remove customProperties from Account and User in accountManagement. (#1362)

- Support listing of Psks and add createdAt field to PreSharedKey (#631)


1.2.9 (2018-05-22)
==================

### Features

- Client-Lite: Add device bootstrap API. This provides the ability to set
  Pre-Shared Keys for device bring-up. (#1099)

- Adds 'Value Change' subscription channel. This supercedes 'presubscription'
  and 'subscription' behaviours to provide a uniform interface, in line with
  the existing 'Device State' channel. (#1102)

- New API updates for IAM. (#1225)

- New API updates for MDS. (#1235)

- Client-Lite: Manifest upload supports upload of keytable file (#522)

- First to Claim: If a certificate is in enrollment mode, signature is not
  required (#924)

### Bugfixes

- Online documentation now links back to GitHub for license and contribution
  guidelines (#1097)

- Link to the new location of the online documentation (#1109)

### Improved Documentation

- Add security recommendations to PSK documentation. (#742)


1.2.8 (2018-04-09)
==================

### Features

- The HTTP header User-Agent now contains SDK version information, which is
  passed to the Mbed Cloud. (#634)

- Add ability to subscribe to devicve events using the Subscribe interface.
  (#722)


# Older Releases:

## 1.2.7

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

### Changes

Support Connector Enrollment Service API in SDK
Features supported

- Upload a DeviceId to claim
- View status of claimed devices

### AccountManagement

- Add new fields to Account 
    - ContractNumber
    - CustomerNumber
    - ExpiryWarning
    - MultifactorAuthenticationStatus
    - NotificationEmails
    - ReferenceNote
    - UpdatedAt
    - CustomProperties
    - SalesContactEmail

- remove following fields from Group
    - LastUpdateTime
    - CreationTime

- Add following fields to Group
    - UpdatedAt

- Add following fields to User
    - CustomProperties

- Following fields on User can be updated
    - Password,
    - CustomProperties
    - TwoFactorAuthentication
    - Status
    - Groups

### Certificates

- Add EnrollmentMode field

### ConnectApi

- DeleteSubscriptions now deletes subscribtions by iterating over connected devices.
- Use a different backend api in GetResourceValue to fix the issue with getting a value from cache.

### All modules

- All get and delete methods now return null if not found, instead of throwing an exception

## 1.2.6

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

### Changes

- Add 'claimedAt' field to device
- Add 'groups' to ApiKeys
- listMetrics now returns a paginated response

## 1.2.5

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

### Changes

- Pull notifications now auto-start
- Cached values now correctly returned from resources
- Error now thrown if a notification channel already exists
- Added ability to force a new notification channel, deleting any existing one

## 1.2.4

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

### Changes

- Allow resource mime types to be overridden
- Minor documentation updates
- Added complete code coverage

## 1.2.3

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

### Changes

- Implemented connectApi.getResource method
- Added unit test coverage
- Fixed issue with binary resources not being returned correctly

## 1.2.2

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install ARMmbed/mbed-cloud-sdk-javascript#1.2.2
```

### Changes

- Updated early access release tracking Mbed Cloud 1.2 APIs
- Included new example of adding trusted certificate
- Switched to using device directory and filters for listing connected devices
- Removed inline manifest contents from firmware manifest
- Ensure notification channels and webhooks never co-exist
- Minor doc updates

## 1.2.1

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install ARMmbed/mbed-cloud-sdk-javascript#1.2.1
```

### Changes

- Updated early access release tracking Mbed Cloud 1.2 APIs

## 1.2.0-alpha

### Deliverables

The application is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install ARMmbed/mbed-cloud-sdk-javascript#1.2.0-alpha
```

### Changes

- Initial early access release tracking Mbed Cloud 1.2 APIs
- APIs supported:
  - Account Management
  - Certificates
  - Connect
  - Device Diectory
  - Update
- Environments supported:
  - Node.js
  - Browser
- Examples outlining browser and node usage as well as an example proxy server
- Full documentation outlining usage
