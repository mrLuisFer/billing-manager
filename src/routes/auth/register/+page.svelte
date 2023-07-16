<script lang="ts">
	import floatLogo from '../../../lib/images/register/float_logo.svg'
	import atIcon from '../../../lib/images/register/at_icon.svg'
	import passIcon from '../../../lib/images/register/pass_icon.svg'
	import InputHightlight from '../../../components/forms/InputHightlight.svelte'
</script>

<section class="bg-black min-h-screen flex flex-col items-center pt-5">
	<a href="/" class="text-white mx-auto px-4 py-2 w-fit border-2 rounded-xl hover:scale-95 active:scale-95"
		>Regresar
	</a>
	<div class="pt-16 flex justify-center items-center flex-col gap-4">
		<img src={floatLogo} alt="float_logo" class="w-[100px] h-[100px]" />
		<h2 class="text-white font-semibold text-xl text-center">
			Boom shakalaka!
			<br />
			Vamos a empezar.
			<p class="text-white text-center w-[200px] text-xs opacity-40 pt-2">
				Para empezar, necesitamos un nombre y correo electrónico.
			</p>
		</h2>
	</div>
	<form class="pt-8 flex flex-col items-center gap-8">
		<InputHightlight icon={atIcon} name="email" type="email" placeholder="email@test.com" />
		<InputHightlight icon={passIcon} name="password" type="password" placeholder="******" />
	</form>
</section>
