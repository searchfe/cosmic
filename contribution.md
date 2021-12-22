## 目录结构

```sh
- src
  - app/ # Electron App, 将 @cosmic/site 作为视图

  - core/ # 核心模块, 禁止饮用其他模块, 内部可以互相引用

  - modules/

  - site/ # 视图的终点, 通过此处的 importmap 导入所有内部/外部共用的模块, 防止重复编译

  - workbench/ # 处理完所有视图初始化相关的工作, 等待被 @cosmic/site 挂载

- storybook/ # 通过 webpack, svelte-loader, 对 src/ 下的文件做联合编译, 不使用他们的编译产物, 期望最终替换为 vite
```

## 开发调试

> `nr` 类似于 `npm run`, 可以通过以下链接安装
>
> https://github.com/antfu/ni

1. 运行 `nr dev`, `src/` 下的模块都会通过 `tsup(或 rollup)` 编译, 并观察更改
2. 等到步骤 1 执行完毕, 浏览器中可以看到效果后, 运行 `nr electron`

## 发布

运行 `nr build`
