<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { flowForm } from '../flowform.svelte.js';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';
	import type { Field } from '$lib/types/field.js';
	import * as FormField from '$lib/components/ui/field/index.js';

	let { field }: { field: Field } = $props();
	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	function handleInputChange(event: Event, fieldId: string) {
		const value = (event.target as HTMLInputElement).value;
		flowForm.setAnswer(fieldId, value);
	}
</script>

<FormField.Group class="w-full max-w-2xl">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<FormField.Field>
			<FormField.Label for="first-name">First Name</FormField.Label>
			<Input
				type="text"
				id="first-name"
				placeholder="First Name"
				oninput={(e) => handleInputChange(e, `${field.id}_firstName`)}
			/>
		</FormField.Field>
		<FormField.Field>
			<FormField.Label for="last-name">Last Name</FormField.Label>
			<Input
				type="text"
				id="last-name"
				placeholder="Last Name"
				oninput={(e) => handleInputChange(e, `${field.id}_lastName`)}
			/>
		</FormField.Field>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

	<FormField.Field>
		<FormField.Label for="phone">Phone Number</FormField.Label>
		<Input
			type="tel"
			id="phone"
			placeholder="Phone Number"
			oninput={(e) => handleInputChange(e, `${field.id}_phone`)}
		/>
	</FormField.Field>

	<FormField.Field>
		<FormField.Label for="email">Email</FormField.Label>
		<Input
			type="email"
			id="email"
			placeholder="Email"
			oninput={(e) => handleInputChange(e, `${field.id}_email`)}
		/>
	</FormField.Field>
</div>

</FormField.Group>

