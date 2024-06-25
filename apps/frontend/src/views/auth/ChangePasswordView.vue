<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import * as z from "zod";

import { changePassword } from "@/services/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const { t } = useI18n();

const disabled = ref(true);
const route = useRoute();
const router = useRouter();

const formSchema = toTypedSchema(
    z.object({
        password: z.string().min(1),
        password2: z.string().min(1),
    }),
);

const errorMessage = ref<boolean>(false);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    if (disabled.value == true) {
        errorMessage.value = true;
        return;
    }
    const uid = route.params.uid as string;
    const data = await changePassword(uid, values.password);
    if (data == false) {
        errorMessage.value = true;
        return;
    }
    errorMessage.value = false;
    router.push({ name: "Login" });
});

const { value: password } = useField<string>("password");
const { value: password2 } = useField<string>("password2");

watch([password, password2], async (newValue) => {
    if (!newValue[0] || !newValue[1]) return (disabled.value = true);
    if (newValue[0].length == 0 || newValue[1].length == 0) return (disabled.value = true);
    if (newValue[0] != newValue[1]) return (disabled.value = true);
    disabled.value = false;
});
</script>

<template>
    <div class="flex flex-col items-center gap-2 sm:max-w-[11/12] md:w-[350px]">
        <Card class="w-[100%] p-6">
            <CardHeader class="p-5">
                <CardTitle class="text-center text-lg font-semibold">{{
                    t("pages.auth.changePassword.title")
                }}</CardTitle>
                <CardDescription class="text-center text-sm">
                    {{ t("pages.auth.changePassword.description") }}
                </CardDescription>
            </CardHeader>
            <CardContent class="pb-0">
                <form class="flex flex-col gap-2" @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    :placeholder="t('pages.auth.changePassword.passwordPlaceholder')"
                                    v-bind="componentField"
                                />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="password2">
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    :placeholder="t('pages.auth.changePassword.confirmPasswordPlaceholder')"
                                    v-bind="componentField"
                                />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <Button :disabled="disabled" class="mt-2" size="sm" type="submit">{{
                        t("pages.auth.changePassword.submitButton")
                    }}</Button>

                    <div class="my-3 flex flex-col items-center">
                        <span v-if="errorMessage" class="text-destructive text-center text-sm font-thin">
                            {{ t("pages.auth.changePassword.errorMessage") }}
                        </span>
                        <div class="mt-4 flex w-[100%] items-center justify-around gap-2">
                            <div class="bg-border relative flex h-[1px] flex-1"></div>
                            <span class="text-xs">{{ t("pages.auth.changePassword.or") }}</span>
                            <div class="bg-border relative flex h-[1px] flex-1"></div>
                        </div>
                        <RouterLink :to="{ name: 'Register' }" class="mt-3 text-sm font-semibold">
                            {{ t("pages.auth.changePassword.createAccount") }}
                        </RouterLink>
                    </div>
                </form>
            </CardContent>
        </Card>
        <Card class="w-[100%]">
            <CardContent class="flex items-center justify-center gap-2 p-5">
                <RouterLink :to="{ name: 'Login' }">{{ t("pages.auth.changePassword.backToLogin") }}</RouterLink>
            </CardContent>
        </Card>
    </div>
</template>
