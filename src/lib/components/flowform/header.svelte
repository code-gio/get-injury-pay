<script lang="ts">
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { flowForm } from './flowform.svelte.js';
</script>

<header>
	<Progress value={flowForm.currentIndex + 1} max={flowForm.fields.length} class="rounded-none" />
</header>

