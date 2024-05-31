<script setup lang="ts">
import { defineProps, onMounted, watch } from "vue";

const DEFAULT_TITLE = "Instagram";

const props = defineProps<{
    title: string;
}>();

onMounted(() => {
    document.title = DEFAULT_TITLE + " - " + props.title;
});

watch(
    () => props.title,
    (newTitle) => {
        document.title = DEFAULT_TITLE + " - " + newTitle;
    },
);
</script>
