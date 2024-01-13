const customizeControlImplementation = `<Tipex htmlContent={htmlContent}
   controlComponent={CustomControl}
   />`;

const customizeControl = `<script lang="ts">
   import {tipexEditor} from "@friendofsvelte/tipex";
</script>


{#if $tipexEditor}
  <div class="...">
    <div class="...">
        <div class="...">
           {#each {length: 5} as _, index}
              {@const level = index + 2}
              <button
                   on:click={() => $tipexEditor?.chain()
                      .focus().toggleHeading({ level }).run()}
                   class="tipex-edit-button"
                   class:active={$tipexEditor?.isActive('heading', { level })}
              >
                H{level}
              </button>
           {/each}


           <button
                on:click={() => $tipexEditor?.chain()
                   .focus().setParagraph().run()}
                class="tipex-edit-button"
                class:active={$tipexEditor?.isActive('paragraph')}
           >
              <iconify-icon icon="fa6-solid:paragraph"/>
           </button>

           <button
                on:click={() => $tipexEditor?.chain()
                   .focus().toggleBold().run()}
                class="tipex-edit-button"
                class:active={$tipexEditor?.isActive('bold')}
           >
              <iconify-icon icon="fa6-solid:bold"/>
           </button>

           <button
                on:click={() => $tipexEditor?.chain()
                   .focus().toggleItalic().run()}
                class="tipex-edit-button"
                class:active={$tipexEditor?.isActive('italic')}
           >
              <iconify-icon icon="fa6-solid:italic"/>
           </button>

           <button
                on:click={() => $tipexEditor?.chain()
                   .focus().toggleCode().run()}
                class="tipex-edit-button"
                class:active={$tipexEditor?.isActive('code')}
           >
              <iconify-icon icon="fa6-solid:code"/>
           </button>

        </div>

        <div class="flex gap-2 text-xs">
           <button type="button"
                class="..."
                on:click={performAction1}>
              Action#1
           </button>

           <button type="submit"
                class="...">
                <span class="hidden md:flex">
                   Post discussion
                </span>
              <iconify-icon
                   class="..."
                   icon="fa6-solid:paper-plane"/>
           </button>
        </div>
      </div>
   </div>
{/if}`;

const addHeadFootComponent = `<script lang="ts">
 import {Tipex} from "@friendofsvelte/tipex";
 import YouCustomHead from "./YouCustomHead.svelte";
 import YouCustomFooter from "./YouCustomFooter.svelte";
</script>

<Tipex htmlContent={htmlContent}
   headComponent={YouCustomHead} // prioritized over slot
   footerComponent={YouCustomFooter} // prioritized over slot
/>`;

const addHeadFootComponentWithSlot = `<script lang="ts">
 import {Tipex} from "@friendofsvelte/tipex";
</script>

<Tipex htmlContent={htmlContent}>
   <div slot="headComponent">...</div> // less prioritized than prop headComponent
   <div slot="footerComponent">...</div> // less prioritized than prop footerComponent
</Tipex>
`;



const tweakingExtensions = `<script lang="ts">
    import {defaultExtensions, Tipex} from "@friendofsvelte/tipex";
     let extension = {
        ...defaultExtensions,
        heading: Heading.configure({
            levels: [2, 3, 4, 5, 6]
        })
    } // sample of tweaking extensions, so that only heading 2 to 6 are available
</script>
<Tipex extensions={extension} .../>
`;

export default {
    customizeControlImplementation,
    customizeControl,
    addHeadFootComponent,
    addHeadFootComponentWithSlot,
    tweakingExtensions
}