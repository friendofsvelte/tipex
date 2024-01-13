const customizeControlImplementation = `<Tipex htmlContent={htmlContent}
   controlComponent={CustomControl}
   />`;

const addHeadFootComponent = `<script lang="ts">
 import {Tipex} from "@friendofsvelte/tipex";
 import YourCustomHead from "./YourCustomHead.svelte";
 import YourCustomFooter from "./YouCustomFooter.svelte";
 import CustomControl from "./CustomControl.svelte";
</script>

<Tipex htmlContent={htmlContent}>
    <YourCustomHead slot="headComponent"/>
    <CustomControl slot="controlComponent"/>
    <YourCustomFooter slot="footerComponent"/>
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
    addHeadFootComponent,
    tweakingExtensions
}