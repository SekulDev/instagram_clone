<script setup lang="ts">
import { CreatePost } from "@/types";
import { ArrowLeft } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const currentIndex = ref<number>(0);

const props = defineProps<{
    croppedImages: CreatePost["croppedImages"];
}>();

const emit = defineEmits<{
    (e: "setPage", page: number): void;
    (e: "updateCroppedImages", images: CreatePost["croppedImages"]): void;
}>();

const imageUrl = ref<string>(props.croppedImages[0].url);

watch(
    () => currentIndex.value,
    (newIndex) => {
        imageUrl.value = props.croppedImages[newIndex].url;
    },
);

const FILTERS = [
    { name: "Normal", filter: "" },
    { name: "Clarendon", filter: "brightness(1.2) contrast(1.35) saturate(1.35)" },
    { name: "Gingham", filter: "brightness(1.05) hue-rotate(-10deg) sepia(0.25)" },
    { name: "Moon", filter: "brightness(1.1) contrast(1.1) grayscale(1)" },
    { name: "Lark", filter: "brightness(1.15) saturate(1.1)" },
    { name: "Reyes", filter: "brightness(1.1) sepia(0.22)" },
    { name: "Juno", filter: "contrast(1.15) saturate(1.8)" },
    { name: "Slumber", filter: "brightness(1.05) saturate(0.66)" },
    { name: "Crema", filter: "sepia(0.5) saturate(0.5) brightness(1.1) contrast(1.1)" },
    { name: "Ludwig", filter: "brightness(1.05) contrast(1.1) saturate(1.15)" },
    { name: "Aden", filter: "brightness(1.2) saturate(0.85)" },
    { name: "Perpetua", filter: "brightness(1.1) saturate(1.25)" },
    { name: "Amaro", filter: "brightness(1.1) contrast(0.9) sepia(0.1)" },
    { name: "Mayfair", filter: "saturate(1.1) contrast(1.1)" },
    { name: "Rise", filter: "brightness(1.05) sepia(0.25)" },
    { name: "Hudson", filter: "brightness(1.2) contrast(0.9) saturate(1.1) sepia(0.25)" },
    { name: "Valencia", filter: "sepia(0.15) saturate(1.5)" },
    { name: "X-Pro II", filter: "contrast(1.2) brightness(1.2) sepia(0.3)" },
    { name: "Sierra", filter: "contrast(1.5) brightness(0.8)" },
    { name: "Willow", filter: "brightness(1.2) contrast(0.85) grayscale(1)" },
    { name: "Lo-fi", filter: "contrast(1.5) saturate(1.5)" },
    { name: "Inkwell", filter: "grayscale(1) brightness(1.2) contrast(1.05)" },
    { name: "Hefe", filter: "contrast(1.5) saturate(1.2) sepia(0.35)" },
    { name: "Nashville", filter: "sepia(0.25) contrast(1.5) brightness(0.9) saturate(1.2)" },
    { name: "Stinson", filter: "brightness(1.1) contrast(0.75)" },
    { name: "Vesper", filter: "contrast(1.2) brightness(1.2) sepia(0.35)" },
    { name: "Earlybird", filter: "contrast(1.1) sepia(0.4)" },
    { name: "Brannan", filter: "contrast(1.4) sepia(0.5)" },
    { name: "Sutro", filter: "brightness(0.8) contrast(1.5) sepia(0.5)" },
    { name: "Toaster", filter: "contrast(1.5) brightness(0.9) sepia(0.4)" },
    { name: "Walden", filter: "brightness(1.1) hue-rotate(-10deg) sepia(0.3)" },
    { name: "1977", filter: "contrast(1.1) brightness(1.1) sepia(0.3)" },
    { name: "Kelvin", filter: "brightness(1.2) contrast(1.35) hue-rotate(20deg)" },
    { name: "Maven", filter: "sepia(0.35) contrast(1.15) brightness(0.95) saturate(1.5)" },
    { name: "Ginza", filter: "contrast(1.1) brightness(1.1)" },
    { name: "Skyline", filter: "contrast(1.25) brightness(1.25) saturate(1.2)" },
    { name: "Dogpatch", filter: "contrast(1.15) brightness(1.15) sepia(0.35)" },
    { name: "Brooklyn", filter: "contrast(1.25) brightness(0.9) sepia(0.5)" },
    { name: "Helena", filter: "contrast(1.25) brightness(0.9) saturate(1.1) sepia(0.35)" },
    { name: "Ashby", filter: "contrast(1.5) sepia(0.5)" },
    { name: "Charmes", filter: "contrast(1.25) brightness(1.25) saturate(1.35) sepia(0.35)" },
];

const currentFilter = computed(() => {
    const image = props.croppedImages[currentIndex.value];
    if (!image.filter) return FILTERS[0];
    return image.filter;
});

function setFilter(filter: { name: string; filter: string }) {
    const images = [...props.croppedImages];
    images[currentIndex.value].filter = filter;
    emit("updateCroppedImages", images);
}
</script>
<template>
    <DialogTitle
        class="text-foreground text-md flex items-center justify-between border-b border-white/10 px-2 py-1 text-center"
    >
        <ArrowLeft class="hover:text-secondary-foreground cursor-pointer" @click="emit('setPage', 1)" />
        <span>Edytuj</span>
        <Button variant="ghost" class="text-primary" @click="emit('setPage', 3)"> Dalej </Button>
    </DialogTitle>
    <div class="flex aspect-[8/5] h-full flex-1 items-center">
        <div class="relative h-full w-1/2">
            <img :src="imageUrl" class="h-full w-full object-contain" :style="{ filter: currentFilter.filter }" />
            <div class="absolute bottom-14 right-2 flex h-20 gap-2 rounded-lg bg-black/80 p-2">
                <div
                    v-for="(image, index) in props.croppedImages"
                    class="relative h-full"
                    v-if="props.croppedImages.length > 1"
                >
                    <img
                        @click="
                            (e) => {
                                e.preventDefault();
                                currentIndex = index;
                            }
                        "
                        :style="{ opacity: index === currentIndex ? 1.0 : 0.5 }"
                        :src="image.url"
                        class="h-full"
                    />
                </div>
            </div>
        </div>
        <div class="aspect-[4/5] h-full">
            <Tabs default-value="filters" class="h-full">
                <TabsList class="grid w-full grid-cols-1">
                    <TabsTrigger value="filters"> Filtry </TabsTrigger>
                    <!-- <TabsTrigger value="regulations"> Regulacje </TabsTrigger> -->
                </TabsList>
                <TabsContent value="filters" class="no-scrollbar h-full overflow-y-scroll pb-40">
                    <div class="grid auto-rows-max grid-cols-3 gap-3">
                        <div
                            class="flex w-full flex-col items-center gap-1 hover:opacity-50"
                            v-for="filter in FILTERS"
                            @click="setFilter(filter)"
                        >
                            <img
                                src="@/assets/img/preview_image.jpg"
                                alt="preview"
                                :style="{ filter: filter.filter }"
                                :class="{ 'border-primary border': filter.name == currentFilter.name }"
                            />
                            <span class="text-xs" :class="{ 'text-primary': filter.name == currentFilter.name }">{{
                                filter.name
                            }}</span>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="regulations"> </TabsContent>
            </Tabs>
        </div>
    </div>
</template>
