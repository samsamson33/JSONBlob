const axios = require("axios");

class JSONBlobClient {
	constructor(blobID) {
		this.blobID = blobID;

		this.api = axios.create({
			baseURL: "https://jsonblob.com"
		});
	}

	setID(blobID) {
		this.blobID = blobID;
	}

	async createBlob(data, setID = true) {
		const request = await this.api.post(`/api/jsonBlob/`, data);

		const re = /https:\/\/jsonblob.com\/api\/jsonBlob\/(.+)/

		const [,blobID] = request.headers.location.match(re);

		if(setID) {
			this.blobID = blobID;
		}

		return blobID;
	}

	async getBlob(blobID) {
		const request = await this.api.get(`/api/jsonBlob/${blobID || this.blobID}`);
		return request.data;
	}

	async updateBlob(data, blobID) {
		const request = await this.api.put(`/api/jsonBlob/${blobID || this.blobID}`, data);
		return request.data;
	}

	async deleteBlob(blobID) {
		await this.api.delete(`/api/jsonBlob/${blobID || this.blobID}`);
	}
}

module.exports = JSONBlobClient;
