<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';

	import type { Field } from '$lib/types/field.js';
	import { flowForm } from '../flowform.svelte.js';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';

	let { field }: { field: Field } = $props();
	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	function handleClick(option: { value: string; label: string }) {
		flowForm.setAnswer(field.id, option.value);
		scrollNext();
	}
</script>

<RadioGroup.Root value={flowForm.answers[field.id]} class="flex gap-4">
	{#each field.options?.selectOptions ?? [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] as option}
		<div class=" flex items-center space-x-2">
			<RadioGroup.Item
				value={option.value}
				id={option.value}
				class="sr-only"
				onclick={() => handleClick(option)}
			/>
			<Label
				for={option.value}
				class="min-w-24 cursor-pointer rounded border px-4 py-2 text-sm transition-colors
				{flowForm.answers[field.id] === option.value
					? 'bg-primary text-primary-foreground'
					: 'hover:bg-muted'}"
			>
				{option.label}
			</Label>
		</div>
	{/each}
</RadioGroup.Root>

