
export function useAllTeams() {
    return `
        query teams($query: QueryTeamDTO!) {
            teams(query: $query) {
                id,
                members{
                    user
                }
            }
        }
    `;
}
