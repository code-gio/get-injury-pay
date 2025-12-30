<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import type { Field } from '$lib/types/field.js';
	import { flowForm } from '../flowform.svelte.js';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';
	import * as FormField from '$lib/components/ui/field/index.js';

	let { field }: { field: Field } = $props();
	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	function handleClick(option: { value: string; label: string }) {
		flowForm.setAnswer(field.id, option.value);
		// Auto-continue after a short delay
		setTimeout(() => {
			scrollNext();
		}, 300);
	}
</script>

<FormField.Field>
	<RadioGroup.Root value={flowForm.answers[field.id]} class="flex gap-4">
		{#each field.options?.selectOptions ?? [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] as option}
			<FormField.Label for={option.value}>
				<FormField.Field
					orientation="horizontal"
					class="min-w-24 cursor-pointer rounded border px-4 py-2 text-sm transition-colors
					{flowForm.answers[field.id] === option.value
						? 'bg-primary text-primary-foreground'
						: 'hover:bg-muted'}"
				>
					<FormField.Content>
						<FormField.Title>{option.label}</FormField.Title>
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

