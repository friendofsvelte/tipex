<pre class="mt-3"><code><span class="text-yellow-500">&lt;script&gt;</span>
<span class="text-blue-400">import</span> {'{Tipex}'} <span class="text-blue-400">from</span> <span
               class="text-green-400">&quot;<span
        class="text-amber-400">@friendofsvelte/tipex</span>&quot;</span>;
<span class="text-blue-400">import</span> <span class="text-green-400">"@friendofsvelte/tipex/styles/app.css"</span>;
<span class="text-blue-400">import</span> <span class="text-green-400">"@friendofsvelte/tipex/styles/Tipex.css"</span>;
<span class="text-blue-400">import</span> <span class="text-green-400">"@friendofsvelte/tipex/styles/ProseMirror.css"</span>;
<span class="text-blue-400">import</span> <span class="text-green-400">"@friendofsvelte/tipex/styles/Controls.css"</span>;
<span class="text-blue-400">import</span> <span class="text-green-400">"@friendofsvelte/tipex/styles/EditLink.css"</span>;
<span class="text-blue-400">import</span> <span class="text-green-400">"@friendofsvelte/tipex/styles/CodeBlock.css"</span>; <span
        class="text-gray-400">// for code block syntax highlighting</span>

<span class="text-blue-400">let</span> htmlContent = <span class="text-green-400">`
&lt;p&gt;This &lt;a target="_blank" rel="noopener noreferrer" href=""&gt;content&lt;/a&gt; is written by
&lt;a target="_blank" rel="noopener noreferrer" href="http://bishwas.net/"&gt;Bishwas&lt;/a&gt; in 2023.
&lt;/p&gt;`</span>;
<span class="text-yellow-500">&lt;/script&gt;</span>

<span class="text-yellow-500">&lt;Tipex</span> <span class="text-blue-400">htmlContent</span>=<span
        class="text-green-400">&quot;<span
            class="text-purple-400">&#123;htmlContent&#125;</span>&quot;</span>
       <span class="text-blue-400">style</span>=<span class="text-green-400">"margin-top: 1rem; margin-bottom: 0rem;"</span>
       <span class="text-blue-400">class</span>=<span class="text-green-400">"h-[70vh] border border-neutral-200 dark:border-neutral-700 w-full"</span><span
        class="text-yellow-500">/&gt;</span>
</code></pre>