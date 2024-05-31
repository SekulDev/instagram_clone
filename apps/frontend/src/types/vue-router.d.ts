import "vue-router";

declare module "vue-router" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface RouteMeta {
        isPublic?: boolean;
    }
}

export {};
