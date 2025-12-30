<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import type { Field } from '$lib/types/field.js';
	import { flowForm } from '../flowform.svelte.js';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';
	import * as FormField from '$lib/components/ui/field/index.js';
	let { field }: { field: Field } = $props();
	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	// Show as grid if there are 4 or more options
	const showAsGrid = $derived(field.options.selectOptions.length >= 4);

	function handleClick(option: { value: string; label: string }) {
		flowForm.setAnswer(field.id, option.value);
		console.log(flowForm.answers);
		// Auto-continue after a short delay
		setTimeout(() => {
			scrollNext();
		}, 300);
	}
</script>

<FormField.Field>
	<RadioGroup.Root
		value={flowForm.answers[field.id] || field.options.selectOptions[0]?.value || ''}
		class={showAsGrid ? 'grid grid-cols-2 gap-3' : ''}
	>
		{#each field.options.selectOptions as option}
			<FormField.Label for={option.value}>
				<FormField.Field
					orientation="horizontal"
					class="min-w-0 cursor-pointer rounded border px-4 py-3 text-sm transition-colors {flowForm
						.answers[field.id] === option.value
						? 'bg-primary text-primary-foreground'
						: 'hover:bg-muted'}"
				>
					<FormField.Content>
						<FormField.Title class={showAsGrid ? 'text-center' : ''}>{option.label}</FormField.Title>
					</FormField.Content>
					<RadioGroup.Item
						value={option.value}
						id={option.value}
						class="sr-only"
						onclick={() => handleClick(option)}
					/>
				</FormField.Field>
			</FormField.Label>
		{/each}
	</RadioGroup.Root>
</FormField.Field>

