<script lang="ts">
	import first_img from '../lib/images/welcome/first_img.svg'
	import second_img from '../lib/images/welcome/second_img.svg'
	import third_img from '../lib/images/welcome/third_img.svg'
	import { goto } from '$app/navigation'
	import { quintOut, backOut } from 'svelte/easing'
	import { crossfade, fade, fly, scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'

	let sliderIndex = 0

	interface Slider {
		src: string
		alt: string
		title: string
		description?: string
	}
	const welcomeSlider: Array<Slider> = [
		{
			src: first_img,
			alt: 'first_img',
			title: 'first_img',
			description: 'first_img'
		},
		{
			src: second_img,
			alt: 'second_img',
			title: 'second_img'
		},
		{
			src: third_img,
			alt: 'third_img',
			title: 'third_img'
		}
	]

	$: activeSlider = welcomeSlider[sliderIndex]
</script>

<svelte:head>
	<title>Welcome Page</title>
	<meta name="description" content="" />
</svelte:head>

<section class="bg-black h-screen overflow-x-hidden">
	<div
		class={`h-fit relative rounded-b-[150px] pt-[70px] pb-5
	${sliderIndex === 0 ? 'bg-orange-300' : ''}
	${sliderIndex === 1 ? 'bg-orange-400' : ''}
	${sliderIndex === 2 ? 'bg-yellow-300' : ''}
	`}
	>
		<a
			href="/auth/login"
			transition:fade
			class="w-fit no-underline select-none flex text-black items-center justify-center border-2 border-black absolute top-5 mx-auto left-0 right-0 rounded-xl p-0.5 px-4 hover:bg-neutral-950 hover:text-yellow-200 transition"
			>Tap para iniciar sesion
		</a>
		{#key sliderIndex}
			<img
				class="relative mx-auto w-[200px] h-[200px]"
				src={activeSlider.src}
				alt={activeSlider.alt}
				in:fly={{
					y: 0,
					x: 200,
					easing: backOut
				}}
			/>
		{/key}
		<div class="flex items-center justify-center mt-6 gap-4">
			{#each welcomeSlider as { src, alt }, i}
				<div
					in:fade
					class={`w-3  h-3 rounded-full cursor-pointer transition ${
						sliderIndex === i ? 'bg-black' : 'bg-neutral-200 opacity-70'
					}`}
					on:click={() => {
						sliderIndex = i
					}}
				/>
			{/each}
		</div>
	</div>
	<div class="text-white pt-6 px-6 flex flex-col items-center gap-6 h-fit">
		{#key sliderIndex}
			<h1 in:scale>
				{activeSlider.title}
			</h1>
			{#if activeSlider.description}
				<p in:fade>{activeSlider.description}</p>
			{/if}
			<button
				class={`border-2 transition border-t-yellow-300
			 ${sliderIndex === 1 ? 'border-r-yellow-300 border-b-yellow-300' : ''} 
			 ${sliderIndex === 2 ? 'border-yellow-300' : ''} 
			 transition w-fit h-fit rounded-full p-5 mx-auto active:scale-95`}
				on:click={() => {
					if (sliderIndex < welcomeSlider.length - 1) {
						sliderIndex++
					} else {
						goto('/auth/register')
					}
				}}
			>
				<div class="bg-yellow-300 p-2 rounded-full flex items-center justify-center gap-2" in:fade>
					{#if sliderIndex === 2}
						<p
							in:fly={{
								y: 0,
								x: 50,
								easing: backOut
							}}
							class="text-black font-bold"
						>
							Registrate
						</p>
					{/if}
					<svg width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M31.7469 33.5C31.5166 33.7146 31.3319 33.9733 31.2038 34.2608C31.0757 34.5483 31.0068 34.8587 31.0013 35.1734C30.9957 35.4881 31.0536 35.8007 31.1715 36.0925C31.2894 36.3843 31.4648 36.6494 31.6874 36.872C31.9099 37.0946 32.175 37.27 32.4669 37.3879C32.7587 37.5058 33.0713 37.5637 33.386 37.5581C33.7007 37.5526 34.0111 37.4837 34.2986 37.3556C34.5861 37.2275 34.8448 37.0428 35.0594 36.8125L45.2156 26.6563L46.875 25L45.2188 23.3438L35.0625 13.1875C34.6207 12.7604 34.0287 12.5238 33.4142 12.5289C32.7997 12.5339 32.2117 12.7801 31.777 13.2145C31.3422 13.6488 31.0954 14.2366 31.0898 14.8511C31.0842 15.4656 31.3201 16.0578 31.7469 16.5L37.9031 22.6563H5.46875C4.84715 22.6563 4.25101 22.9032 3.81147 23.3427C3.37193 23.7823 3.125 24.3784 3.125 25C3.125 25.6216 3.37193 26.2177 3.81147 26.6573C4.25101 27.0968 4.84715 27.3438 5.46875 27.3438H37.9031L31.7469 33.5Z"
							fill="black"
						/>
					</svg>
				</div>
			</button>
		{/key}
		<div>
			<p class="text-center text-sm mt-auto">
				Ya tienes una cuenta? <a href="/auth/login" class="text-yellow-200">Inicia sesion</a>
			</p>
		</div>
	</div>
</section>

<style>
</style>
