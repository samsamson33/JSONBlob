//TODO: improve these tests

const assert = require("assert");

const Client = require("./index");

const client = new Client("not an id");

const defaultData = {
	[Math.random()]: Math.random(),
	[Math.random()]: Math.random()
};

const otherData = {
	[Math.random()]: Math.random(),
	[Math.random()]: Math.random()
};


(async function tests() {
	console.log("Running tests...");

	//Constuctor accepts ID
	assert(client.blobID === "not an id");

	//Can create blob, and sets the blobID to the id of created blob
	const defaultBlobID = await client.createBlob(defaultData);
	assert(defaultBlobID && (client.blobID === defaultBlobID));

	//blobID is not set
	const otherBlobID = await client.createBlob(otherData, false);
	assert(client.blobID === defaultBlobID);

	//Can get data
	const otherFetchedData = await client.getBlob(otherBlobID);
	assert.deepStrictEqual(otherFetchedData, otherData);

	//Uses default ID
	const defaultFetchedData = await client.getBlob();
	assert.deepStrictEqual(defaultFetchedData, defaultData);

	//Updates data

	defaultData.updatedVal = true;
	otherData.updatedVal = true;

	const otherUpdatedData = await client.updateBlob(otherData, otherBlobID);
	assert.deepStrictEqual(otherUpdatedData, otherData);
	assert.deepStrictEqual(
		await client.getBlob(otherBlobID),
		otherData
	);

	const defaultUpdatedData = await client.updateBlob(defaultData);
	assert.deepStrictEqual(defaultUpdatedData, defaultData);
	assert.deepStrictEqual(
		await client.getBlob(),
		defaultData
	);

	//Deletes data
	await client.deleteBlob()
	await client.deleteBlob(otherBlobID);

	assert.rejects(client.getBlob());
	assert.rejects(client.getBlob(otherBlobID));

	//Can change ID
	client.setID("Test ID");
	assert(client.blobID === "Test ID");

	console.log("Tests complete!");
})()
