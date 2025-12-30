<script lang="ts">
	import { FieldType, type Field } from '$lib/types/field.js';
	import { ArrowRight, Check, Loader2 } from 'lucide-svelte';
	import FieldHandler from './field-handler.svelte';
	import Button from '../ui/button/button.svelte';
	import { flowForm } from './flowform.svelte.js';
	let { field, i }: { field: Field; i: number } = $props();
	import { getEmblaContext } from '../ui/carousel/context';

	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	const isLastQuestion = $derived(i === flowForm.fields.length - 1);
	let isSubmitting = $state(false);
	let submitError = $state<string | null>(null);

	function handleContinue() {
		if (isLastQuestion) {
			const { valid, errors } = flowForm.validateRequiredForSubmission();
			if (valid) {
				// TODO: Handle form submission
			} else {
				console.error('Validation errors:', errors);
			}
		} else {
			scrollNext();
		}
	}

	async function handleSubmit() {
		if (isSubmitting) return;

		isSubmitting = true;
		submitError = null; // Clear any previous errors

		try {
			const response = await fetch(
				'https://services.leadconnectorhq.com/hooks/qgXZt3N1T50zVjaYuONz/webhook-trigger/72a9c4ec-9ee2-4649-8a4a-e8db53064c35',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(flowForm.getAnswers())
				}
			);

			if (response.ok) {
				console.log('Form data sent successfully');
				setTimeout(() => {
					window.location.href = 'https://getinjurypay.com/thank-you';
				}, 1000);
			} else {
				console.error('Failed to send form data:', response.status, response.statusText);
				submitError = `Failed to submit form. Please try again. (Error: ${response.status})`;
			}
		} catch (error) {
			console.error('Error sending form data:', error);
			submitError = 'Network error. Please check your connection and try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="f mx-auto w-full max-w-3xl space-y-4 p-6">
	<div class="space-y-2">
		<div class="flex items-start gap-2 text-lg md:text-2xl lg:text-3xl">
			<div class="mt-1 flex items-center text-lg font-semibold md:text-xl">
				{i + 1}
				<ArrowRight class="size-4" />
			</div>

			{#if field.type === FieldType.Checkbox || field.type === FieldType.Rating}
				{field.label}
			{:else}
				<label for={field.id}>{field.label}</label>
			{/if}
			{#if field.isRequired}
				<div class="text-red-500">*</div>
			{/if}
		</div>
	</div>
	<div class="space-y-5 px-9">
		<div>
			<FieldHandler {field} />
			{#if field.helperText}
				<div class="mt-2 text-sm text-gray-500">{field.helperText}</div>
			{/if}
		</div>

		<div class="flex gap-4">
			{#if !isLastQuestion}
				<Button size="lg" class="gap-2 text-lg font-normal" onclick={handleContinue}>
					Continue
					<Check />
				</Button>
			{/if}
			{#if isLastQuestion}
				{#if submitError}
					<div class="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-4">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div class="ml-3">
								<p class="text-sm text-red-800">{submitError}</p>
							</div>
						</div>
					</div>
				{/if}
				<Button
					size="lg"
					class="pointer gap-2 text-lg font-normal"
					onclick={handleSubmit}
					disabled={isSubmitting}
				>
					{#if isSubmitting}
						<Loader2 class="size-4 animate-spin" />
						Submitting...
					{:else}
						Submit
						<Check />
					{/if}
				</Button>
			{/if}
		</div>
	</div>
</div>

