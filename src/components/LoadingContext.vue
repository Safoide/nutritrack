<script setup>
import BaseLoader from './BaseLoader.vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    }
});
</script>

<template>
    <template v-if="!loading">
        <slot />
    </template>
    <template v-else>
        <BaseLoader />
    </template>
</template>