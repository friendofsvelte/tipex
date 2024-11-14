const customizeControlImplementation = `<Tipex body={body}
   controlComponent={CustomControl}
   />`;

const addHeadFootComponent = `<script lang="ts">
 import {Tipex} from "@friendofsvelte/tipex";
 import YourCustomHead from "./YourCustomHead.svelte";
 import YourCustomFooter from "./YouCustomFooter.svelte";
 import CustomControl from "./CustomControl.svelte";
</script>

<Tipex body={body}>
  {#snippet head(tipex)}
    <YourCustomHead/>
  {/snippet}
  {#snippet controlComponent(tipex)}
    <CustomControl/>
  {/snippet}
  {#snippet foot(tipex)}
    <YourCustomFooter/>
  {/snippet}
</Tipex>`;

const tweakingExtensions = `<script lang="ts">
    import {defaultExtensions, Tipex} from "@friendofsvelte/tipex";
     let newExtensions = [
        ...defaultExtensions,
         Heading.configure({
            levels: [2, 3, 4, 5, 6]
        })
    ] // sample of tweaking extensions, so that only heading 2 to 6 are available
</script>
<Tipex extensions={newExtensions} .../>
`;

export default {
	customizeControlImplementation,
	addHeadFootComponent,
	tweakingExtensions
};
