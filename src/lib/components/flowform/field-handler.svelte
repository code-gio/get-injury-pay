<script lang="ts">
	import { FieldType, type Field } from '$lib/types/field.js';
	import SelectField from './fields/select-field.svelte';
	import RadioField from './fields/radio-field.svelte';
	import LongTextField from './fields/long-text-field.svelte';
	import ContactField from './fields/contact-field.svelte';
	import YesNoField from './fields/yes-no-field.svelte';

	let { field }: { field: Field } = $props();
</script>

{#if field.type === FieldType.Select}
	<SelectField {field} />
{:else if field.type === FieldType.RadioGroup}
	<RadioField {field} />
{:else if field.type === FieldType.Textarea}
	<LongTextField {field} />
{:else if field.type === FieldType.Contact}
	<ContactField {field} />
{:else if field.type === FieldType.yesNo}
	<YesNoField {field} />
{/if}

