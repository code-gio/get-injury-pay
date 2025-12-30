<script lang="ts">
	import { flowForm } from './flowform.svelte.js';
	import Header from './header.svelte';
	import type { Field } from '$lib/types/field';
	import { onMount } from 'svelte';
	import FormContainer from './form-container.svelte';
	let { fields }: { fields: Field[] } = $props();

	onMount(() => {
		flowForm.setFields(fields);
	});
</script>

{#if flowForm.fields.length > 0}
	<div class="flex h-dvh flex-col">
		<Header />
		<FormContainer />
	</div>
{:else}
	<div>No fields to show</div>
{/if}

