<script lang="ts">
	export let icon = ''
	export let name: string = ''
	export let type: string = 'text'
	export let placeholder = ''
	export let value = null
</script>

<div class="flex items-center justify-center">
	<label for={name}>
		<img src={icon} />
	</label>
	<input
		id={name}
		{name}
		{type}
		class="border-none outline-none bg-transparent text-lg text-white pl-2 tracking-wider w-full"
		autocomplete="off"
		{placeholder}
		{value}
	/>
</div>
