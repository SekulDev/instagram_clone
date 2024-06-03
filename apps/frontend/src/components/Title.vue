<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

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

watch(
    () => route.fullPath,
    () => {
        document.title = DEFAULT_TITLE;
    },
);
</script>
