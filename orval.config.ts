export default {
    api: {
        input: 'http://127.0.0.1:8000/api/docs.jsonopenapi',
        output: {
            target: './api-client/index.ts',
            schemas: './types/api',
            client: 'axios',
            override: {
                mutator: {
                    path: './utils/axios-instance.ts',
                    name: 'customAxios',
                },
            },
        },
    },
}
