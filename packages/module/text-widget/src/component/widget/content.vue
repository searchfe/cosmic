<script lang="ts" setup>
import { Select, SelectOption, Row, Col, Input, RadioGroup, RadioButton } from 'cosmic-vue';
import { MColor, MTitle } from '@cosmic/core/browser';
</script>

<template>
    <div :class="$style.container">
        <MTitle
            title="字形"
        >
            <i-cosmic-grid-outline />
        </MTitle>
        <div
            :class="[$style.glyph]"
        >
            <Row :class="$style.row">
                <Col>
                    <Select
                        size="sm"
                        value="123"
                        :class="$style['margin-left']"
                    >
                        <SelectOption
                            value="123"
                            label="苹方字体"
                        />
                        <SelectOption
                            value="2"
                            label="宋体"
                        />
                        <SelectOption
                            value="3"
                            label="苹方字体"
                        />
                    </Select>
                </Col>
            </Row>
            <Row :class="$style.row">
                <Col :span="8">
                    <div :class="[$style['glyph-item']]">
                        <Select
                            size="sm"
                            value="123"
                            allow-input
                            :class="$style['margin-left']"
                        >
                            <template #prefix>
                                <i-cosmic-font :class="$style.icon" />
                            </template>
                            <SelectOption
                                value="123"
                                label="10"
                            />
                            <SelectOption
                                value="2"
                                label="12"
                            />
                            <SelectOption
                                value="3"
                                label="13"
                            />
                        </Select>
                    </div>
                </Col>
                <Col :span="8">
                    <div :class="[$style['glyph-item']]">
                        <Select
                            size="sm"
                            value="123"
                        >
                            <SelectOption
                                value="123"
                                label="标准"
                            />
                            <SelectOption
                                value="2"
                                label="标准1"
                            />
                            <SelectOption
                                value="3"
                                label="标准2"
                            />
                        </Select>
                    </div>
                </Col>
                <Col :span="8">
                    <div :class="[$style['glyph-item']]">
                        <Select
                            size="sm"
                            value="123"
                        >
                            <SelectOption
                                value="123"
                                label="无修饰"
                            />
                            <SelectOption
                                value="2"
                                label="下划线"
                            />
                            <SelectOption
                                value="3"
                                label="删除线"
                            />
                        </Select>
                    </div>
                </Col>
            </Row>

            <Row :class="$style.row">
                <Col :span="8">
                    <div :class="[$style['glyph-item']]">
                        <Input
                            size="sm"
                            value="121"
                        >
                            <template #prefix>
                                <i-cosmic-line-height :class="[$style.icon]" />
                            </template>
                        </Input>
                    </div>
                </Col>
                <Col :span="8">
                    <div :class="[$style['glyph-item']]">
                        <Select
                            size="sm"
                            value="123"
                            allow-input
                            :class="$style['margin-left']"
                        >
                            <template #prefix>
                                <i-cosmic-font :class="[$style.icon]" />
                            </template>
                            <SelectOption
                                value="123"
                                label="1"
                            />
                            <SelectOption
                                value="2"
                                label="10"
                            />
                            <SelectOption
                                value="3"
                                label="20"
                            />
                        </Select>
                    </div>
                </Col>
                <Col :span="8">
                    <div :class="[$style['glyph-item']]">
                        <Select
                            size="sm"
                            value="123"
                            allow-input
                            :class="$style['margin-left']"
                        >
                            <template #prefix>
                                <i-cosmic-vertical-height :class="[$style.icon]" />
                            </template>
                            <SelectOption
                                value="123"
                                label="1"
                            />
                            <SelectOption
                                value="2"
                                label="10"
                            />
                            <SelectOption
                                value="3"
                                label="20"
                            />
                        </Select>
                    </div>
                </Col>
            </Row>
            <Row :class="$style['radio-row']">
                <Col :span="16">
                    <div :class="$style['radio-left']">
                        <RadioGroup>
                            <RadioButton value="1">
                                <i-cosmic-text-left :class="$style['radio-icon']" />
                            </RadioButton>

                            <RadioButton value="2">
                                <i-cosmic-text-center :class="$style['radio-icon']" />
                            </RadioButton>

                            <RadioButton value="3">
                                <i-cosmic-text-right :class="$style['radio-icon']" />
                            </RadioButton>
                            <RadioButton value="4">
                                <i-cosmic-text-even :class="$style['radio-icon']" />
                            </RadioButton>
                        </RadioGroup>
                    </div>
                </Col>
                <Col :span="8">
                    <div>
                        <RadioGroup>
                            <RadioButton value="1">
                                <i-cosmic-width-auto :class="$style['radio-icon']" />
                            </RadioButton>

                            <RadioButton value="2">
                                <i-cosmic-linked-square :class="$style['radio-icon']" />
                            </RadioButton>
                            <RadioButton value="3">
                                <i-cosmic-linked-square :class="$style['radio-icon']" />
                            </RadioButton>
                        </RadioGroup>
                    </div>
                </Col>
            </Row>
        </div>
        <MTitle
            title="颜色"
        >
            <i-cosmic-sun />
            <i-cosmic-grid-outline />
        </MTitle>
        <MColor />
    </div>
</template>

<style module >

.container {
    padding-bottom: var(--padding-md);
}

.row {
    margin: var(--margin-md) 0;
}

.radio-row {
    margin: var(--margin-md) 0;
    padding: 0 var(--padding-md);
}

.glyph {
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
}

.icon {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
}
.radio-icon {
    font-size: 16px;
}

.glyph-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    height: 32px;
    padding-right: 10px;
}


</style>