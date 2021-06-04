const styleContent = `
  html {
  }
  body {
    margin: 0;
    background: var(--bg-color);
  }
  button {
    text-shadow: 1px 1px 1px var(--color-primary-100);
  }
  .mode-dark button{
    text-shadow: 1.5px 1.5px 1px var(--color-primary-900);
  }
`;


export const initStyle = (root: HTMLElement) => {
  const ele = document.createElement('style');
  ele.innerHTML = styleContent;
  root.appendChild(ele);
};
