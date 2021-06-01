const styleContent = `
  html {
  }
  body {
    margin: 0;
    background: var(--bg-color);
  }
`;


export const initStyle = (root: HTMLElement) => {
  const ele = document.createElement('style');
  ele.innerHTML = styleContent;
  root.appendChild(ele);
};
