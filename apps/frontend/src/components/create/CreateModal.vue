<script setup lang="ts">
import { CreatePost } from "@/types";
import { reactive, ref, watch } from "vue";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import CropImage from "./pages/CropImage.vue";
import DescriptionImage from "./pages/DescriptionImage.vue";
import Filters from "./pages/Filters.vue";
import Upload from "./pages/Upload.vue";

const page = ref(0);

function setPage(_page: number) {
    page.value = _page;
}

const props = defineProps<{
    open: boolean;
}>();

const open = ref<boolean>(props.open);

const imageBlob = ref<CreatePost["image"]>(null);
const croppedImages = reactive<{ images: CreatePost["croppedImages"] }>({ images: [] });

function updateImage(file: CreatePost["image"]) {
    imageBlob.value = file;
    if (file) {
        page.value = 1;
    }
}

function updateCroppedImages(images: CreatePost["croppedImages"]) {
    croppedImages.images = images;
}

const emit = defineEmits<{
    (e: "updateOpen", open: boolean): void;
}>();

watch(
    () => props.open,
    (newValue) => {
        open.value = newValue;
    },
);

watch(
    () => open.value,
    (newValue) => {
        emit("updateOpen", newValue);
        open.value = newValue;
        imageBlob.value = null;
        croppedImages.images = [];
        page.value = 0;
    },
);

function onClose() {
    imageBlob.value = null;
    croppedImages.images = [];
    open.value = false;
}
</script>
<template>
    <Dialog v-model:open="open">
        <DialogContent
            class="bg-secondary block w-auto overflow-hidden rounded-xl !p-0 focus:outline-none focus:ring-0 focus:ring-offset-0 md:h-[80vh]"
        >
            <div class="relative flex h-full w-auto flex-col">
                <Upload v-if="page == 0" :image="imageBlob" @update-image="updateImage" />
                <CropImage
                    v-if="page == 1"
                    :croppedImages="croppedImages.images"
                    @update-cropped-images="updateCroppedImages"
                    :image="imageBlob"
                    @set-page="setPage"
                />
                <Filters
                    v-if="page == 2"
                    :cropped-images="croppedImages.images"
                    @update-cropped-images="updateCroppedImages"
                    @set-page="setPage"
                />
                <DescriptionImage
                    v-if="page == 3"
                    :cropped-images="croppedImages.images"
                    @set-page="setPage"
                    @on-close="onClose"
                />
            </div>
        </DialogContent>
    </Dialog>
</template>
