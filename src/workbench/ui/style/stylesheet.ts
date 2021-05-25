const styleContent = `
  body {
    margin: 0;
    background: var(--grid-background-color);
  }
`;


export function initStyle(root: HTMLElement) {
  const ele = document.createElement('style');
  ele.innerHTML = styleContent;
  root.appendChild(ele);
}
