<template>
    <div v-if="isVisible"
        class="w-2xl absolute m-auto left-0 right-0 top-64 p-2 z-20 border border-2 border-blue-400 bg-gray-100 rounded-sm">
        <h2 class="">Base Modal</h2>
        <button v-on:click="closeModal">Close button</button>
        <slot></slot>
    </div>
</template>
<script setup>
const isVisible = defineModel('isVisible')

const closeModal = () => {
    isVisible.value = false
}
</script>
