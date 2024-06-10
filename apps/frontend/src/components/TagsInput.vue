<script setup lang="ts">
import { ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot } from "radix-vue";
import { computed, reactive, ref, watch } from "vue";

import { searchTags } from "@/services/tag";

import { CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import {
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
} from "@/components/ui/tags-input";

const props = defineProps<{
    placeholder: string;
    model: string[];
}>();

const modelValue = props.model;
const open = ref<boolean>(true);
const searchTerm = ref("");

function close() {
    open.value = false;
}

const filteredItems = reactive<{ value: string[] }>({ value: [] });

watch(
    () => searchTerm.value,
    async (newValue) => {
        if (newValue.length < 2) {
            filteredItems.value = [];
            return;
        }
        const tags = await searchTags(newValue);
        if (!tags) {
            filteredItems.value = [];
            return;
        }
        tags.length = 5;
        filteredItems.value = tags.map((e) => e.name);
    },
);

function addCustom() {
    const showed = filteredItems.value.filter((i) => searchTerm.value.toLowerCase().includes(i.toLowerCase()));
    if (showed.length > 0 || searchTerm.value.length < 1) return;
    if (props.model.includes(searchTerm.value.toLowerCase())) return;
    modelValue.push(searchTerm.value);
    searchTerm.value = "";
}

const target = computed<HTMLElement>(() => {
    const el = document.querySelector("div[role=dialog]") as HTMLDivElement;
    if (el) return el;
    return document.body;
});
</script>

<template>
    <TagsInput class="w-full gap-0 bg-transparent px-0" :model-value="modelValue">
        <div class="flex flex-wrap items-center gap-2 px-3">
            <TagsInputItem
                v-for="item in modelValue"
                :key="item"
                :value="item"
                class="bg-secondary-foreground text-foreground"
            >
                <TagsInputItemText />
                <TagsInputItemDelete />
            </TagsInputItem>
        </div>

        <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full">
            <ComboboxAnchor as-child>
                <ComboboxInput placeholder="Dodaj tagi" as-child>
                    <TagsInputInput
                        maxlength="40"
                        class="w-full px-3"
                        :class="modelValue.length > 0 ? 'mt-2' : ''"
                        @keydown.enter.prevent="addCustom"
                        @blur="close"
                    />
                </ComboboxInput>
            </ComboboxAnchor>

            <ComboboxPortal :to="target">
                <CommandList
                    position="popper"
                    class="bg-secondary-foreground text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 mt-2 w-[--radix-popper-anchor-width] rounded-md border shadow-md outline-none"
                >
                    <!-- <CommandEmpty /> -->
                    <CommandGroup>
                        <CommandItem
                            v-for="item in filteredItems.value"
                            :key="item"
                            :value="item"
                            @select.prevent="
                                (ev) => {
                                    if (typeof ev.detail.value === 'string') {
                                        searchTerm = '';
                                        modelValue.push(ev.detail.value);
                                    }

                                    if (filteredItems.value.length === 0) {
                                        open = false;
                                    }
                                }
                            "
                        >
                            {{ item }}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </ComboboxPortal>
        </ComboboxRoot>
    </TagsInput>
</template>
