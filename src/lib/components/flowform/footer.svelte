<script>
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { getEmblaContext } from '../ui/carousel/context';

	const { canScrollPrev, canScrollNext, scrollNext, scrollPrev, handleKeyDown } =
		getEmblaContext('<Carousel.Previous/>');
</script>

<footer class="flex items-center justify-end gap-3 p-4">
	<div class="flex gap-1">
		<Button class="px-3 py-2 " onclick={scrollPrev} onkeydown={handleKeyDown}>
			<ChevronUp class="size-6 flex-shrink-0" />
		</Button>
		<Button class="px-3 py-2 " onclick={scrollNext} onkeydown={handleKeyDown}>
			<ChevronDown class="size-6 flex-shrink-0" />
		</Button>
	</div>
	<Button>Powered by ROI Society</Button>
</footer>

