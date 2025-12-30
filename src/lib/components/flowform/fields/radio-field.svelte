<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';

	import type { Field } from '$lib/types/field.js';
	import { flowForm } from '../flowform.svelte.js';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';
	let { field }: { field: Field } = $props();
	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	function handleClick(option: any) {
		flowForm.setAnswer(field.id, option.value);
		console.log(flowForm.answers);
		scrollNext();
	}
</script>

<RadioGroup.Root value={field.options.selectOptions[0]}>
	{#each field.options.selectOptions as option}
		<div class="flex items-center space-x-2">
			<Label
				for={option.value}
				class="min-w-42 cursor-pointer rounded border px-4 py-2 text-sm transition-colors {flowForm
					.answers[field.id] === option.value
					? 'bg-primary text-primary-foreground'
					: 'hover:bg-muted'}"
			>
				<RadioGroup.Item
					value={option.value}
					id={option.value}
					class="sr-only "
					onclick={() => handleClick(option)}
				/>{option.label}</Label
			>
		</div>
	{/each}
</RadioGroup.Root>

