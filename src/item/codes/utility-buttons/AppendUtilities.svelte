<!-- Use Utility.svelte slot -->
<pre><code><span class="text-blue-400">import</span> <span class="text-green-100">{`{utilityButtonsComponent, Utility}`}</span> <span class="text-blue-400">from</span> <span class="text-green-400">"@friendofsvelte/tipex"</span>;

<span class="text-gray-300">// Insert this to utilityButtonsComponent using: </span>
{`if ($utilityButtonsComponent) {
    new Utility({
        target: $utilityButtonsComponent,
        props: {
        }
    })
}`}
</code></pre>
