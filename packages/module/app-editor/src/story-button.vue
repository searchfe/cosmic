<script lang="ts" setup>
import { Button } from 'cosmic-vue';
import { buttonLight, buttonSolid, buttonDashed, buttonText, buttonLink} from 'cosmic-ui';
</script>
<template>
    <div>
        <div class="font-bold text-lg">Button List</div>
        <div>Size - xs / sm / md / lg</div>
        <div class="button-group">
            <Button size="xs">Button</Button>
            <Button size="sm">Button</Button>
            <Button size="md">Button</Button>
            <Button size="lg">Button</Button>
        </div>
        <div>State - normal / hover / active / disabled</div>
        <div class="button-group">
            <Button size="xs">Button</Button>
            <Button size="sm" class="hover">Button</Button>
            <Button size="md" class="active">Button</Button>
            <Button size="lg" :disabled="true">Button</Button>
        </div>
        <div>Use Class .square</div>
        <div class="button-group">
            <Button size="xs" class="square">
                <i-cosmic-play />
            </Button>
            <Button size="sm" class="hover square">
                <i-cosmic-play />
            </Button>
            <Button size="md" class="active square">
                <i-cosmic-play />
            </Button>
            <Button size="lg" :disabled="true" class="square">
                <i-cosmic-play />
            </Button>
        </div>
        <div>Use Class .rounded-none / ./ .rounded-1\/2 / .rounded-full</div>
        <div class="button-group pt-10">
            <Button size="lg" class="square rounded-none">
                <i-cosmic-play />
            </Button>
            <Button size="lg" class="square">
                <i-cosmic-play />
            </Button>
            <Button size="lg" class="square rounded-1/2">
                <i-cosmic-play />
            </Button>
            <Button size="lg" class="square rounded-full">
                <i-cosmic-play />
            </Button>
        </div>
        <div class="button-group py-10">
            <Button size="sm" class="rounded-none">
                Button
            </Button>
            <Button size="sm">
                Button
            </Button>
            <Button size="sm" class="rounded-1/2">
                Button
            </Button>
            <Button size="sm" class="rounded-full">
                Button
            </Button>
        </div>
        <div>Use Class .min-w-40 .min-w-100 .min-h-32</div>
        <div class="button-group pt-10">
            <Button class="min-w-40">w-40</Button>
            <Button class="min-w-100">h-100</Button>
            <Button size="xs" class="min-h-32">h-32</Button>
        </div>
        <div class="pt-10">Button With Icon</div>
        <div class="button-group">
            <Button size="xs" class="selected">
                <template #prefix>
                    <i-cosmic-play />
                </template>
                Button
            </Button>
            <Button size="sm" class="selected">
                <template #prefix>
                    <i-cosmic-play />
                </template>
                Button
            </Button>
            <Button size="md" class="selected">
                <template #prefix>
                    <i-cosmic-play />
                </template>
                Button
            </Button>
        </div>
        <div class="py-10">Button Module CSS</div>
        <div class="button-group">
            <Button>Default</Button>
            <Button class="w-80" :styles="buttonLight">Light</Button>
            <Button class="w-80" :styles="buttonSolid">Solid</Button>
            <Button class="w-80" :styles="buttonDashed">Dashed</Button>
            <Button class="w-80" :styles="buttonText">Text</Button>
            <Button class="w-80" :styles="buttonLink">Link</Button>
        </div>
    </div>
</template>
<style>
.button-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.button-group > div {
    margin-right: 1.0rem;
}
</style>
