# Changelog

The SDK is hosted on GitHub at https://github.com/ARMmbed/mbed-cloud-sdk-javascript and can be installed using npm:

```
$ npm install mbed-cloud-sdk
```

This news file contains a log of notable changes to the SDK. Please see [npm history for mbed-cloud-sdk](https://www.npmjs.com/package/mbed-cloud-sdk?activeTab=versions) for
a list of versions that have been released on **npm**.

[//]: # (begin_release_notes)

2.6.0 (2019-11-15)
==================

### Features

- getResourceValue now returns a ResourceValue object (#1511191609)


2.5.1 (2019-10-31)
==================

### Bugfixes

- Prevent start notifications being called if autostart is false (#3110191104)


2.5.0 (2019-10-25)
==================

### Features

- Add option to supply api key as callback, for scenarious when you have a key
  that needs refreshing (#2510190928)


2.4.1 (2019-10-02)
==================

### Bugfixes

- Add wrapper round GetWebhook to prevent calling endpoint when using a JWT
  (#300820191653)


2.4.0 (2019-07-24)
==================

### Features

- Added a master observer to listen to any notifications coming from the Cloud
  (#27062019)


2.3.1 (2019-06-25)
==================

### Bugfixes

- Include index.es6.js in published package. (#250620191634)


2.3.0 (2019-06-07)
==================

### Features

- Add support for device groups in foundation sdk. (#1374)

- Add support for branding in foundation sdk. (#2031)

- add timeout to connect async functions (#2363)


2.2.0 (2019-05-23)
==================

### Features

- Publish es6 modules to npm (#23052019)


2.1.0 (2019-05-17)
==================

### Features

- First to Claim - to bulk upload for Enrolment Identities added to the
  _Foundation Interface_. (#1162)

- Backwards compatibility update for field renames in the Enrollment API.
  (#1392)

- First to Claim - to bulk delete for Enrolment Identities added to the
  _Foundation Interface_. (#1432)

- Certificate entities added to the _Foundation Interface_. (#1438)

- Update Campaigns statistics summary and events added to the _Foundation
  Interface_. (#1467)

- Introduction of the _Foundation Interface_ which adds a new 'Entities' based
  interface. (#1567)

- Addition of server credentials entity to the _Foundation Interface_ including
  ability to get all credentials in a single resource. (#1604)

- Account Management entities to support Aggregators / Sub-Tenant accounts
  added to the _Foundation Interface_. (#1605)

- Device Events entity added to the _Foundation Interface_. (#1768)

- Addition of device entity to the _Foundation SDK_ and support added for
  Certificate Renew. (#1827)

- Pelion Device Management rebranding (previously Mbed Cloud). (#1915)

- Support for Certificate Blacklist (Enrolment Denials) added to the
  _Foundation Interface_. (#1997)

- Device Update support added to the _Foundation Interface_. (#2004)

- Support for filtering list endpoints added to the _Foundation Interface_.
  (#2039)

- Pre-Shared Key (PSK) added to the _Foundation Interface_. (#2339)

### Bugfixes

- Add missing payload and accepts parameters to executeResource (#1948)

### Misc

- #1951


2.0.6 (2018-11-30)
==================

### Bugfixes

- Fixed race condition where resource value async responses could be missed.
  (#1822)

- Implement retry on polling channel for 5** status codes (#1893)


2.0.5 (2018-11-21)
==========================

### Bugfixes

- Fix issue with paginator getting stuck in infinite loop if max results not
  set. (#100)

### Misc

- #1, #2


2.0.4 (2018-11-02)
==================


No significant changes.


2.0.3 (2018-11-02)
==================

### Bugfixes

- setResourceValue and executeResourceValue now return the asyncResponse.
  (#1766)


2.0.2 (2018-10-23)
==================

### Bugfixes

- Stop overriding User-Agent header as this breaks in most browsers. (#1400)

- Default value of total count to 0 in the constructor (#1715)

- Add leading / to ConnectAPI inline documentation (#1782)


2.0.1 (2018-09-06)
==================

### Bugfixes

- Change getResourceValue to use new deviceRequests endpoint. (#1664)


2.0.0 (2018-08-03)
==================

### Features

- Minimum version of node increased to v6.0.0 on account of v4 no longer being maintained

- Add support for phase 2 billing (#1210)

- The concept of Paginator is introduced in common/pagination.ts and can be
  used in the SDK to list elements. (#1296)

- Settings can now be configured from `.env` files through use of
  https://www.npmjs.com/package/dotenv (#927)


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
