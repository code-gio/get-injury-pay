<script>
	import { ChevronDown, ChevronUp } from '@lucide/svelte';
	import Button from '../ui/button/button.svelte';
	import { getEmblaContext } from '../ui/carousel/context';

	const { canScrollPrev, canScrollNext, scrollNext, scrollPrev, handleKeyDown } =
		getEmblaContext('<Carousel.Previous/>');
</script>

<footer class="flex items-center justify-end gap-3 p-4">

	<Button>Powered by ROI Society</Button>
</footer>

