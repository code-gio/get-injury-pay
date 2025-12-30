<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { flowForm } from '../flowform.svelte.js';
	import type { Field } from '$lib/types/field.js';
	import { getEmblaContext } from '../../ui/carousel/context';
	import * as FormField from '$lib/components/ui/field/index.js';

	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	let { field }: { field: Field } = $props();
</script>

<FormField.Field>
	<FormField.Label for={field.id}>{field.label}</FormField.Label>
	<Textarea
		id={field.id}
		required={field.isRequired}
		placeholder={field.placeholder}
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				scrollNext();
			}
		}}
	oninput={(e) => {
		flowForm.setAnswer(field.id, (e.target as HTMLTextAreaElement).value);
	}}
	/>
</FormField.Field>

