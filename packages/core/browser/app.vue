<script lang="ts" setup>
import { onMounted } from 'vue';
import Layout from './component/layout';
import { Observer } from './lib/observable';

const { Content, Footer, Header } = Layout;

onMounted(() => {
    window.eventHub = Observer.getObserver();
});

</script>

<template>
  <Layout style="height: 100vh">
    <Header>
      <m-component
        src="@cosmic-module/frame-menu-bar"
      />
    </Header>
    <Content>
      <Layout>
        <!-- put siders here -->
        <Layout>
          <Content>
            <m-component
              src="@cosmic-module/frame-workbench"
            />
          </Content>
        </Layout>
      </Layout>
    </Content>
    <Footer>
      this is the footer
    </Footer>
  </Layout>
</template>

<style>
@import 'cosmic-design/global.css';
@import 'cosmic-vue/style.css';

* {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #1f1f1f;
}
:root {
    font-size: 10px;
}
body {
    margin: 0;
}
.d {
    color: green;
}
</style>
