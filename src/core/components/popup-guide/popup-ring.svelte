<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import SVG from 'svelte-inline-svg';
    import { onMount, onDestroy } from 'svelte';
    import { throttle, angleBetween, RectWithThrottle } from './util';
    import RingGroup from './ring-group';

    export let top: string | number  = '50%';
    export let left: string | number  = '50%';
    export let length = 4;

    const ringGroup = new RingGroup();
    ringGroup.setPieceLength(length);

    let startDom: HTMLElement;
    let startRect: RectWithThrottle;
    const dispatch = createEventDispatcher();
    const t = throttle((event: MouseEvent) => {
        startRect = startRect || new RectWithThrottle(startDom);
        const rect = startRect.get();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        if (Math.abs(centerX - event.clientX)< 8 && Math.abs(centerY - event.clientY) < 8) return;
        let r = angleBetween(centerX, centerY, event.clientX, event.clientY);
        startDom.style.transform = `rotate(${r}deg)`;
        if (ringGroup.update(r)) {
            dispatch('change', {
                selected: ringGroup.selected,
            });
        }
    }, 30);

    onMount(() => {
        window.addEventListener('mousemove', t);
    });
    onDestroy(() => {
        window.removeEventListener('mousemove', t);
    });
</script>
<div class="popup-core absolute" style="top:{top};left:{left};" bind:this={startDom}>
    <!-- <div style="width:30px;height:30px;border:6px solid;border-radius: 50%;border-right-color: turquoise;"></div> -->
    <div class='when-dark'><SVG src={require('./popup-ring-dark.svg')} width=30 height=30 /></div>
    <div class='when-light'><SVG src={require('./popup-ring-light.svg')} width=30 height=30 /></div>
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

