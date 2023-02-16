export interface MenuItem {
    icon?: string;
    title: string;
    target?: string;
    children?: MenuItem[];
}
export declare type VersionType = `${number}.${number}.${number}` | `${number}.${number}.${number}-${string}`;
export declare type URIType = `${string}.${string}.${string}`;
export interface PluginDefinition {
    name: string;
    author: string;
    website?: string;
    email?: string;
    version: VersionType;
    target: VersionType;
    uri: URIType;
    icon: {
        "512x512"?: string;
        "256x256"?: string;
    };
    description: string;
    dependency?: URIType[];
    entry: string;
}
export declare type Plugin = RequireAtLeastOne<PluginDefinition, "website" | "email">;
export declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
