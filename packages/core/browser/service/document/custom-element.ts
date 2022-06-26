class ArtboardFrame extends HTMLElement {
    constructor(css: string, body: HTMLElement) {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.innerHTML = css;
        shadow.appendChild(style);
        shadow.appendChild(body);
    }

}
