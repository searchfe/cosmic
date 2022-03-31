import type { Client } from '@urql/core';

type DraftFields = (keyof gql.Draft)[];

export default function draftDAO(client: Client) {
    return {
        query(query: gql.QueryDraftDTO, fields: DraftFields = ['id']) {
            return client.query<{ drafts: Partial<gql.Draft>[] }>(
                `query ($fields: [String!], $query: QueryDraftDTO!) {
                    drafts(fields: $fields, query: $query) {
                        id,
                        ${fields.join(',')}
                    }
                }`,
                { query },
            ).toPromise();
        },
        create(data: gql.CreateDraftDTO, fields: DraftFields = ['id']) {
            return client.mutation<{ createDraft: Partial<gql.Draft> }>(
                `mutation ($data: CreateDraftDTO!) {
                    createDraft(data: $data) {
                        id,
                        ${fields.join(',')}
                    }
                }`,
                { data },
            ).toPromise();
        },
        update(data: gql.QueryDraftDTO) {
            return client.mutation<{ updateDraft: boolean }>(
                `mutation ($data: QueryDraftDTO!) {
                    updateDraft(data: $data)
                }`,
                { data },
            )
            .toPromise();
        },
        delete(id: string) {
            return client.mutation<{ deleteDraft: boolean }>(
                `mutation ($id: String!) {
                    deleteDraft(id: $id)
                }`,
                { id },
            )
            .toPromise();
        },
    };
}
