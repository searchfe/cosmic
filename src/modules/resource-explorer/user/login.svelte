<script lang="ts">
    import { Layout, Button } from '@cosmic/core/components';
    import { login } from '../common/gql/exchange/auth/user';
    import { push } from 'svelte-spa-router';
    import { urlFor, ROUTES } from '../routes';

    let username = '';
    let password = '';

    function onLogin() {
        login({ username, password }).then(() => {
            push(urlFor(ROUTES.INDEX));
        });
    }
</script>

<Layout>
    <div class="w-full h-full bg-gray-100">
        <div
            class="absolute flex left-1/2 top-1/2 w-890 h-418 rounded-4xl overflow-hidden transform -translate-x-1/2 -translate-y-1/2"
        >
            <div class="h-full w-520">
                <img class="h-full w-full" src="https://fe-dev.bj.bcebos.com/login.png" alt="" />
            </div>
            <div class="h-full w-370 box-border px-40 flex flex-col justify-center bg-white">
                <div class="text-h3 font-semibold">账号登陆</div>
                <div class="text-h4 mt-40 mb-20">
                    <label for="username">账号*</label>
                    <input
                        bind:value={username}
                        class="ml-10 box-border p-10 w-240 h-36 rounded border-gray-400 border-solid border opacity-60"
                        name="username"
                        id="username"
                        type="text"
                        placeholder="请输入账号/邮箱"
                    />
                </div>
                <div class="text-h4 mb-30">
                    <label for="password">密码*</label>
                    <input
                        bind:value={password}
                        class="ml-10 box-border p-10 w-240 h-36 rounded border-gray-400 border-solid border opacity-60"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="请输入密码"
                    />
                </div>
                <div class="text-right">
                    <Button type="primary" classes="rounded-xl" on:click={onLogin}>登陆</Button>
                </div>
            </div>
        </div>
    </div>
</Layout>
