<script lang="ts">
	let dataPromise: any = null;
	let to: string;
	async function sendEmail(): Promise<string> {
		const response = await fetch('./api/sendMail', {
			method: 'POST',
			body: JSON.stringify({
				to
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return await response.json();
	}
</script>

<section>
	<label for="email">Email</label>
	<input bind:value={to} type="email" name="email" autocomplete="email" />
</section>
<button
	on:click={() => {
		dataPromise = sendEmail();
	}}>Send Email</button
>

{#if dataPromise}
	{#await dataPromise}
		<!-- promise is pending -->
	{:then data}
		{#if data}
			Email was sent
		{:else}
			Email was NOT sent
		{/if}
	{/await}
{/if}

<style>
	input {
		margin: 1rem;
	}
</style>
