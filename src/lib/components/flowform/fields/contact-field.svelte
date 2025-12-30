<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { flowForm } from '../flowform.svelte.js';
	import { getEmblaContext } from '$lib/components/ui/carousel/context.js';
	import type { Field } from '$lib/types/field.js';

	let { field }: { field: Field } = $props();
	const { scrollNext } = getEmblaContext('<Carousel.Next/>');

	function handleInputChange(event: Event, fieldId: string) {
		const value = (event.target as HTMLInputElement).value;
		flowForm.setAnswer(fieldId, value);
	}
</script>

<div class="flex w-full max-w-2xl flex-col gap-4">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="flex flex-col gap-1.5">
			<Label for="first-name">First Name</Label>
			<Input
				type="text"
				id="first-name"
				placeholder="First Name"
				oninput={(e) => handleInputChange(e, `${field.id}_firstName`)}
			/>
		</div>
		<div class="flex flex-col gap-1.5">
			<Label for="last-name">Last Name</Label>
			<Input
				type="text"
				id="last-name"
				placeholder="Last Name"
				oninput={(e) => handleInputChange(e, `${field.id}_lastName`)}
			/>
		</div>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="phone">Phone Number</Label>
		<Input
			type="tel"
			id="phone"
			placeholder="Phone Number"
			oninput={(e) => handleInputChange(e, `${field.id}_phone`)}
		/>
	</div>

	<div class="flex flex-col gap-1.5">
		<Label for="email">Email</Label>
		<Input
			type="email"
			id="email"
			placeholder="Email"
			oninput={(e) => handleInputChange(e, `${field.id}_email`)}
		/>
	</div>
</div>

