# JSON Blob

This is a simple wrapper for the [JSON Blob](https://jsonblob.com) API.

The Docs are a WIP.

## Docs

All methods with a `blobID` param will use the ID provided to the constructor or to `setID()`, unless `blobID` is specified.

All methods are asynchronous, with the exeption of `setID`.

`updateBlob()` overwrites the current data in the blob.

- `JSONBlobClient([initialID])`
  - `JSONBlobClient#setID(<blobID>)`
  - `JSONBlobClient#createBlob([data][, setID] = true)`
  - `JSONBlobClient#getBlob([blobID])`
  - `JSONBlobClient#updateBlob(<data>[, blobID])`
  - `JSONBlobClient#deleteBlob([blobID])`
