import axios from "axios";

export default axios.create({
	baseURL: "https://api.rawg.io/api/",
	params: {
		key: "b67dc0395d944563875b3e0d0df81755",
	},
});
