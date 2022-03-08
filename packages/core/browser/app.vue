<script lang="ts" setup>
import Layout from './component/layout';
const { Content, Footer, Header } = Layout;

</script>

<template>
  <Layout style="height: 100vh">
    <Header>
      <m-component
        src="@cosmic-module/app-bar"
        class="w-full"
      />
    </Header>
    <Content>
      <Layout>
        <!-- put siders here -->
        <Layout>
          <Content>
            <m-component
              src="@cosmic-module/frame-workbench"
              class="w-full"
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
@import 'cosmic-design/utilities.css';
@import 'cosmic-vue/style.css';
/* * {
    margin: 0;
    padding: 0;
    font-size: 12px;
} */
:root {
    font-size: 10px;
}
body {
    margin: 0;
}
.w-full {
  width: 100%;
}
</style>
