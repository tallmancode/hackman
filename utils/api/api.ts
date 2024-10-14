import { useAuth } from "~/store/auth";
import { useSettings } from "~/store/settings";
import t from "~/utils/translate";

interface InternalFetch {
	type?:
		| "config"
		| "auth"
		| "sports"
		| "betting"
		| "api"
		| "apic"
		| "casinoApi"
		| "casinoApiCdn"
		| "universal"
		| "content"
		| "player"
		| "forms"
		| "insurance"
		| "graphQl"
		| "avatar";
	url: string;
	apiVersion?: string | null;
	data?:
		| {
				[x: string]: unknown;
		  }
		| [x: unknown]
		| any[]
		| null
		| any;
	options?: RequestInit;
	showToast?: boolean;
	signal?: AbortSignal;
}

const api = <T>({ url, options, data }: InternalFetch): Promise<T> => {
	const config = useRuntimeConfig();

	const defaultHeaders = {
		"Content-Type": "application/json",
	};

	const baseURL = config.public.baseUrl;
	console.log(baseURL, url)
	return new Promise<T>((resolve, reject) => {
		fetch(baseURL+url, {
			...options,
			body: data ? JSON.stringify(data) : null,
			headers: {
				...defaultHeaders,
				...options?.headers,
			},
		})
			.then(async (res) => {
				if (res.status >= 400) return res;
				else {
					const responseBody = await res.text();
					return responseBody.length ? JSON.parse(responseBody) : {};
				}
			})
			.then(async (res) => {
				if (res && (res?.errors || res?.errorCode || res.status >= 400 || res.status === "Error")) {
					try {
						const json = await res.json();
						reject(json);
					} catch (e) {
						reject(res);
					}
				}
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

export default api;
