<script lang="ts">
	import { FieldType, type Field } from '$lib/types/field.js';
	import { ArrowRight, Check, Loader2, ArrowLeft } from '@lucide/svelte';
	import FieldHandler from './field-handler.svelte';
	import Button from '../ui/button/button.svelte';
	import { flowForm } from './flowform.svelte.js';
	import * as FormField from '$lib/components/ui/field/index.js';
	let { field, i }: { field: Field; i: number } = $props();
	import { getEmblaContext } from '../ui/carousel/context';

	const { scrollNext, scrollPrev } = getEmblaContext('<Carousel.Next/>');

	const isLastQuestion = $derived(i === flowForm.fields.length - 1);
	const isFirstQuestion = $derived(i === 0);
	let isSubmitting = $state(false);
	let submitError = $state<string | null>(null);
	let fieldError = $state<string | null>(null);
	let showCheck = $state(false);
	let isContinuing = $state(false);

	// Check if current field has an answer
	const hasAnswer = $derived(() => {
		const answer = flowForm.answers[field.id];
		// For contact fields, check all sub-fields
		if (field.type === FieldType.Contact) {
			return (
				flowForm.answers[`${field.id}_firstName`] &&
				flowForm.answers[`${field.id}_lastName`] &&
				flowForm.answers[`${field.id}_phone`] &&
				flowForm.answers[`${field.id}_email`]
			);
		}
		return answer !== undefined && answer !== null && answer !== '';
	});

	const canContinue = $derived(() => {
		if (!field.isRequired) return true;
		return hasAnswer();
	});

	// Clear error when answer is provided
	$effect(() => {
		if (hasAnswer() && fieldError) {
			fieldError = null;
		}
	});

	function handleContinue() {
		fieldError = null;
		
		if (!canContinue()) {
			fieldError = field.isRequired
				? 'Please answer this question before continuing.'
				: 'Please provide an answer.';
			return;
		}

		// Show check animation
		showCheck = true;
		isContinuing = true;

		if (isLastQuestion) {
			const { valid, errors } = flowForm.validateRequiredForSubmission();
			if (valid) {
				handleSubmit();
			} else {
				fieldError = Object.values(errors)[0] || 'Please complete all required fields.';
				showCheck = false;
				isContinuing = false;
			}
		} else {
			// Small delay to show check animation before scrolling
			setTimeout(() => {
				scrollNext();
				// Reset animation state after transition
				setTimeout(() => {
					showCheck = false;
					isContinuing = false;
				}, 300);
			}, 300);
		}
	}

	function handleBack() {
		showCheck = false;
		isContinuing = false;
		fieldError = null;
		scrollPrev();
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

<div class="mx-auto w-full max-w-3xl space-y-4 p-6">
	<FormField.Set>
		<div class="flex items-start gap-2 text-lg md:text-2xl lg:text-3xl ">
			<div class="mt-1 flex items-center text-lg font-semibold md:text-xl">
				{i + 1}
				<ArrowRight class="size-4" />
			</div>
			<FormField.Legend>
				{field.label}
				{#if field.isRequired}
					<span class="text-red-500">*</span>
				{/if}
			</FormField.Legend>
		</div>

		{#if field.helperText}
			<FormField.Description>{field.helperText}</FormField.Description>
		{/if}

		<FormField.Field data-invalid={fieldError !== null}>
			<FieldHandler {field} />
			{#if fieldError}
				<FormField.Error>{fieldError}</FormField.Error>
			{/if}
			{#if submitError}
				<FormField.Error>{submitError}</FormField.Error>
			{/if}
		</FormField.Field>

		<FormField.Field orientation="horizontal" class="flex items-center gap-2">
			{#if !isFirstQuestion}
				<Button
					size="lg"
					variant="outline"
					class="gap-2 text-lg font-normal"
					onclick={handleBack}
					disabled={isContinuing || isSubmitting}
				>
					<ArrowLeft class="size-4" />
					Back
				</Button>
			{/if}
			<div class="" />
			{#if !isLastQuestion}
				<Button
					size="lg"
					class="gap-2 text-lg font-normal relative overflow-hidden"
					onclick={handleContinue}
					disabled={!canContinue() || isContinuing}
				>
					<span class="flex items-center gap-2">
						Continue
						{#if showCheck}
							<Check
								class="size-4 animate-in fade-in zoom-in duration-300"
								style="animation-delay: 0.1s;"
							/>
						{/if}
					</span>
				</Button>
			{/if}
			{#if isLastQuestion}
				<Button
					size="lg"
					class="gap-2 text-lg font-normal"
					onclick={handleContinue}
					disabled={isSubmitting || !canContinue() || isContinuing}
				>
					{#if isSubmitting}
						<Loader2 class="size-4 animate-spin" />
						Submitting...
					{:else}
						<span class="flex items-center gap-2">
							Submit
							{#if showCheck}
								<Check
									class="size-4 animate-in fade-in zoom-in duration-300"
									style="animation-delay: 0.1s;"
								/>
							{/if}
						</span>
					{/if}
				</Button>
			{/if}
		</FormField.Field>
	</FormField.Set>
</div>

