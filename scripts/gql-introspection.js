import { getIntrospectionQuery } from 'graphql';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getIntrospectedSchema, minifyIntrospectionQuery } from '@urql/introspection';


axios
    .post(
        'http://localhost:3001/api/graphql',
        {
            variables: {},
            query: getIntrospectionQuery({ descriptions: false }),
        },
        {
            headers: {
                'content-type': 'application/json',
            },
        },
    )
    .then(result => result.data)
    .then(({ data }) => {
        const minified = minifyIntrospectionQuery(getIntrospectedSchema(data));
        fs.writeFileSync(path.join('./', 'exchange', 'cache', 'schema.json'), JSON.stringify(minified));
    });
