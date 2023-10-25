
<pre class="mt-3"><code><span class="text-blue-400">import</span> <span class="text-green-100">CustomUtilityButtons</span> <span class="text-blue-400">from</span> <span class="text-green-400">"path-to/UtilityButtons.svelte"</span>;
<span class="text-blue-400">import</span> {'{utilityButtonsComponent}'} <span class="text-blue-400">from</span> <span class="text-green-400">"@friendofsvelte/tipex"</span>;

<span class="text-gray-300">// Insert this to utilityButtonsComponent using: </span>
    {`if ($utilityButtonsComponent) {
    new CustomUtilityButtons({
        target: $utilityButtonsComponent,
        props: {
        } // ...props here
    })
}`}
</code></pre>
