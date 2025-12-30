<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { flowForm } from './flowform.svelte.js';
	import Footer from './footer.svelte';
	import FormField from './form-field.svelte';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';

	let api = $state<CarouselAPI>();

	$effect(() => {
		if (api) {
			api.on('select', () => {
				flowForm.setCurrentIndex(api!.selectedScrollSnap());
			});
		}
	});
</script>

<Carousel.Root
	opts={{
		align: 'center',
		duration: 50,
		loop: false
	}}
	orientation="vertical"
	class="flex h-full flex-col justify-center"
	setApi={(emblaApi) => (api = emblaApi)}
>
	<div class="flex flex-1 flex-col justify-center">
		<Carousel.Content class=" h-[400px] min-h-72 ">
			{#each flowForm.fields as field, i}
				<Carousel.Item class="flex flex-col items-center justify-center">
					<FormField {field} {i} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</div>
	<Footer />
</Carousel.Root>

