<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import type { Field } from '$lib/types/field.js';
	import { flowForm } from '../flowform.svelte.js';
	import * as FormField from '$lib/components/ui/field/index.js';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';
	let { field }: { field: Field } = $props();
	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	let value = $state('');

	const triggerContent = $derived(
		field.options.selectOptions.find((option: { value: string; label: string }) => option.value === value)?.label ??
			`Select a ${field.id}`
	);

	// Show as grid if there are 4 or more options
	const showAsGrid = $derived(field.options.selectOptions.length >= 4);
	const optionsCount = $derived(field.options.selectOptions.length);

	function handleRadioClick(option: { value: string; label: string }) {
		flowForm.setAnswer(field.id, option.value);
		// Auto-continue after a short delay
		setTimeout(() => {
			scrollNext();
		}, 300);
	}
</script>

<FormField.Field>
	<FormField.Label for={field.id}>{field.label}</FormField.Label>
	{#if showAsGrid}
		<!-- Grid layout for long lists -->
		<RadioGroup.Root value={flowForm.answers[field.id] || ''} class="grid grid-cols-2 gap-3">
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
							<FormField.Title class="text-center">{option.label}</FormField.Title>
						</FormField.Content>
						<RadioGroup.Item
							value={option.value}
							id={option.value}
							class="sr-only"
							onclick={() => handleRadioClick(option)}
						/>
					</FormField.Field>
				</FormField.Label>
			{/each}
		</RadioGroup.Root>
	{:else}
		<!-- Dropdown for shorter lists -->
		<Select.Root
			type="single"
			name={field.id}
			required={field.isRequired}
			bind:value
			onValueChange={(v) => {
				flowForm.setAnswer(field.id, v);
				// Auto-continue after a short delay
				setTimeout(() => {
					scrollNext();
				}, 300);
			}}
		>
			<Select.Trigger class="w-full" id={field.id}>
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
	{/if}
</FormField.Field>

