<script lang="ts">
    import SVG from 'svelte-inline-svg';
    import { onMount, onDestroy } from 'svelte';
    import { throttle, angleBetween, RectWithThrottle } from './util';

    export let top: string | number  = '50%';
    export let left: string | number  = '50%';

    $: id = `popup-core-${Math.random()}`;

    let startDom: HTMLElement;
    let startRect: RectWithThrottle;
    const t = throttle((event: MouseEvent) => {
        startDom = startDom || document.getElementById(id);
        if (startDom && !startRect)
            startRect = new RectWithThrottle(startDom);
        const rect = startRect.get();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        if (Math.abs(centerX - event.clientX)< 8 && Math.abs(centerY - event.clientY) < 8) return;
        let r = angleBetween(centerX, centerY, event.clientX, event.clientY);
        startDom.style.transform = `rotate(${r}deg)`;
    }, 30);

    onMount(() => {
        window.addEventListener('mousemove', t);
    });
    onDestroy(() => {
        window.removeEventListener('mousemove', t);
    });
</script>
<div class="popup-core absolute" style="top:{top};left:{left};" id="{id}">
    <!-- <div style="width:30px;height:30px;border:6px solid;border-radius: 50%;border-right-color: turquoise;"></div> -->
    <div class='when-dark'><SVG src={require('./popup-core-dark.svg')} width=30 height=30 /></div>
    <div class='when-light'><SVG src={require('./popup-core-light.svg')} width=30 height=30 /></div>
</div>

<style>
    .popup-core {
        margin: -15px 0 0 -15px;
        transform:translate3d(0,0,0);
    }
    .when-dark, .when-light {
        display: none;
    }
    :global(.mode-dark) .when-dark {
        display: block;
    }
    :global(.mode-light) .when-light {
        display: block;
    }
</style>

