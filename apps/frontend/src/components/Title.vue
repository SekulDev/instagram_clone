<script setup lang="ts">
import { defineProps, onMounted, watch } from "vue";

const DEFAULT_TITLE = "Instagram";

const props = defineProps<{
    title?: string;
}>();

onMounted(() => {
    if (!props.title) {
        document.title = DEFAULT_TITLE;
        return;
    }
    document.title = DEFAULT_TITLE + " - " + props.title;
});

watch(
    () => props.title,
    (newTitle) => {
        if (!props.title) {
            document.title = DEFAULT_TITLE;
            return;
        }
        document.title = DEFAULT_TITLE + " - " + newTitle;
    },
);
</script>
