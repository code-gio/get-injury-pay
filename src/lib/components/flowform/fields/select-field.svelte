<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import type { Field } from '$lib/types/field.js';
	import { flowForm } from '../flowform.svelte.js';
	let { field }: { field: Field } = $props();

	let value = $state('');

	const triggerContent = $derived(
		field.options.selectOptions.find((option) => option.value === value)?.label ??
			`Select a ${field.id}`
	);
</script>

<Select.Root
	type="single"
	name={field.id}
	required={field.isRequired}
	bind:value
	onValueChange={(v) => {
		console.log(v);
		flowForm.setAnswer(field.id, v);
		console.log(flowForm.answers);
	}}
>
	<Select.Trigger class="w-full">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>{field.id}</Select.Label>
			{#each field.options.selectOptions as option}
				<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>

