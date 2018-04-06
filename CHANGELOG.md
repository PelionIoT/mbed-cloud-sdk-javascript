# Changelog

The SDK is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

This news file contains a log of notable changes to the SDK. Please see [npm history for mbed-cloud-sdk](https://www.npmjs.com/package/mbed-cloud-sdk?activeTab=versions) for
a list of versions that have been released on **npm**.

[//]: # (begin_release_notes)

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