# MbedCloudConnectRestApi.Endpoint

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **String** | Possible values ACTIVE, STALE. | [optional] 
**q** | **Boolean** | Determines whether the device is in queue mode.  &lt;br/&gt;&lt;br/&gt;&lt;b&gt;Queue mode&lt;/b&gt;&lt;br/&gt; When an endpoint is in queue mode, messages sent to the endpoint do not wake up the physical device.  The messages are queued and delivered when the device wakes up and connects to mbed Cloud Connect  itself. You can also use the Queue mode when the device is behind a NAT and cannot be reached directly by  mbed Cloud Connect.  | [optional] 
**type** | **String** | Type of endpoint. (Free text) | [optional] 
**name** | **String** | Unique identifier representing the endpoint. | [optional] 


