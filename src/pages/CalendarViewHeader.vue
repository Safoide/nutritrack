<template>
	<div class="cv-header">
		<div class="cv-header-nav">

			<button :disabled="!headerProps.previousYear" class="previousYear" aria-label="Previous Year"
				@click.prevent="onInput(headerProps.previousYear!)">
				<i class="fas fa-circle-arrow-left"></i>
			</button>

			<button :disabled="!headerProps.previousPeriod" class="previousPeriod" aria-label="Previous Period"
				@click.prevent="onInput(headerProps.previousPeriod!)">
				<i class="fas fa-chevron-circle-left"></i>
			</button>

			<button class="currentPeriod" aria-label="Current Period"
				@click.prevent="onInput(headerProps.currentPeriod)">
				{{ headerProps.currentPeriodLabel }}
			</button>

			<button :disabled="!headerProps.nextPeriod" class="nextPeriod" aria-label="Next Period"
				@click.prevent="onInput(headerProps.nextPeriod!)">
				<i class="fas fa-chevron-circle-right"></i>
			</button>

			<button :disabled="!headerProps.nextYear" class="nextYear" aria-label="Next Year"
				@click.prevent="onInput(headerProps.nextYear!)">
				<i class="fas fa-circle-arrow-right"></i>
			</button>

		</div>
		<div class="periodLabel">
			<slot name="label">{{ headerProps.periodLabel }}</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { IHeaderProps } from "./IHeaderProps"

defineProps({
	headerProps: {
		type: Object as () => IHeaderProps,
		required: true,
	},
	previousYearLabel: { type: String, default: "<<" },
	previousPeriodLabel: { type: String, default: "<" },
	nextPeriodLabel: { type: String, default: ">" },
	nextYearLabel: { type: String, default: ">>" },
})

const emit = defineEmits<{
	(e: "input", day: Date): void
}>()

const onInput = (d: Date): void => emit("input", d)
</script>

<style>
.cv-header {
	display: flex;
	flex: 0 1 auto;
	flex-flow: row nowrap;
	align-items: center;
	min-height: 5em;
	border-width: 1px 1px 0 1px;
	background-color: #102a8772;
	border-radius: 4px;
	padding: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cv-header-nav button {
	border-radius: 8px;
	color: #3c4699;
	border: 1px solid #ddd;
	/* border-radius: 3px; */
	padding: 5px 10px;
	margin: 0 3px;
	font-size: 1.5em;
	cursor: pointer;
	transition: background-color 0.3s;
}


.cv-header-nav button:hover {
	background-color: #f0f0f0;
}

.cv-header-nav button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.arrow {
	font-size: 1.2em;
}

.periodLabel {
	color: rgb(255, 255, 255);
	flex: 1;
	text-align: center;
	font-size: 2.5em;
	font-weight: bold;
}
</style>