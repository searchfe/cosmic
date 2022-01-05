<script lang="ts">
    import { initClient } from '@urql/svelte';
    import { exchanges } from './exchange/index';

    initClient({
        exchanges,
        url: 'http://localhost:3000/api/graphql',
    });
</script>

<slot />
