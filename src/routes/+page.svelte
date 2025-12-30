<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import GetInjuryPayForm from '$lib/components/get-injury-pay-form.svelte';
</script>

<div
	class="relative min-h-screen bg-[url('/home-bg.png')] bg-cover bg-no-repeat bg-center bg-scroll"
>
	<div
		class="absolute inset-0 bg-[#152350] opacity-50 transition-colors duration-300 ease-in-out z-1"
	></div>
	<div
		class="max-w-[1200px] mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10"
	>
		<div class="bde-image mb-8">
			<figure class="flex justify-center">
				<div class="flex justify-center items-center">
					<div class="overflow-hidden">
						<img
							class="block max-w-full h-auto"
							src={logo}
							width="288"
							height="145"
							alt="Get Injury Paid Logo"
						/>
					</div>
				</div>
			</figure>
		</div>

		<h1 class="bde-heading text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
			Are you a Las Vegas resident<br />who has recently been injured?
		</h1>

		<div class="bde-text text-center text-lg md:text-xl text-white max-w-2xl mb-8">
			This quick and easy questionnaire is designed to help us understand your situation better and
			determine how we can assist you in achieving the compensation you deserve
		</div>

	
        <GetInjuryPayForm />
	</div>
</div>

