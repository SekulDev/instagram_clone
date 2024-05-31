<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import * as z from "zod";

import { login } from "@/services/auth";

import InstagramTextLogo from "@/components/InstagramTextLogo.vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const router = useRouter();

const disabled = ref(true);

const formSchema = toTypedSchema(
    z.object({
        username: z.string().min(2).max(50),
        password: z.string().min(1),
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
    const data = await login(values.username, values.password);
    if (!data) {
        errorMessage.value = true;
        return;
    }
    router.push({ name: "Home" });
});

const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");

watch<[typeof username, typeof password]>([username, password], (newValue) => {
    if (!newValue[0] || !newValue[1]) return (disabled.value = true);
    if (newValue[0].length == 0 || newValue[1].length == 0) return (disabled.value = true);
    disabled.value = false;
});
</script>

<template>
    <div class="flex flex-col items-center gap-2 sm:max-w-[11/12] md:w-[350px]">
        <Card class="w-[100%] p-6">
            <CardHeader class="p-10">
                <InstagramTextLogo class="h-auto w-[100%]" />
            </CardHeader>
            <CardContent class="pb-0">
                <form class="flex flex-col gap-2" @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Nazwa użytkownika lub adres email"
                                    v-bind="componentField"
                                />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Hasło" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>

                    <Button :disabled="disabled" class="mt-2" size="sm" type="submit">Zaloguj się</Button>

                    <div class="mt-4 flex w-[100%] items-center justify-around gap-2">
                        <div class="bg-border relative flex h-[1px] flex-1"></div>
                    </div>

                    <div class="my-3 flex flex-col items-center">
                        <span v-if="errorMessage" class="text-destructive text-center text-sm font-thin">
                            Niestety wprowadzone hasło lub nazwa użytkownika są niepoprawne
                        </span>
                        <RouterLink
                            :to="{ name: 'ForgotPassword' }"
                            class="text-primary mt-6 text-center text-sm font-thin"
                        >
                            Nie pamiętasz hasła?
                        </RouterLink>
                    </div>
                </form>
            </CardContent>
        </Card>
        <Card class="w-[100%]">
            <CardContent class="flex items-center justify-center gap-2 p-5">
                Nie masz konta? <RouterLink :to="{ name: 'Register' }" class="text-primary">Zarejestruj się</RouterLink>
            </CardContent>
        </Card>
    </div>
</template>
