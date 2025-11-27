import { Protocol } from '@uniswap/router-sdk'
import {
    V2SubgraphProvider,
    V3SubgraphProvider,
    V4SubgraphProvider,
} from '@uniswap/smart-order-router'
import { ChainId } from '@uniswap/sdk-core'
import { EulerSwapHooksSubgraphProvider } from '@uniswap/smart-order-router/'
import {
    ZORA_CREATOR_HOOK_ON_BASE_v1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_0_0_1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_1_1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_1_1_1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_1_2,
    ZORA_CREATOR_HOOK_ON_BASE_v2_2,
    ZORA_CREATOR_HOOK_ON_BASE_v2_2_1,
    ZORA_POST_HOOK_ON_BASE_v1,
    ZORA_POST_HOOK_ON_BASE_v1_0_0_1,
    ZORA_POST_HOOK_ON_BASE_v1_0_0_2,
    ZORA_POST_HOOK_ON_BASE_v1_1_1,
    ZORA_POST_HOOK_ON_BASE_v1_1_1_1,
    ZORA_POST_HOOK_ON_BASE_v1_1_2,
    ZORA_POST_HOOK_ON_BASE_v2_2,
    ZORA_POST_HOOK_ON_BASE_v2_2_1,
    ZORA_POST_HOOK_ON_BASE_v2_3_0,
} from '../util/hooksAddressesAllowlist'

// during local cdk stack update, the env vars are not populated
// make sure to fill in the env vars below
// we have two alchemy accounts to split the load, v3 and v4 subgraphs are on
// the second account while v2 is on the first
// process.env.ALCHEMY_QUERY_KEY = ''
// process.env.ALCHEMY_QUERY_KEY_2 = ''
// process.env.GRAPH_BASE_V4_SUBGRAPH_ID = ''
// process.env.GRAPH_BEARER_TOKEN = ''
// process.env.GOLDSKY_BEARER_TOKEN = ''
// process.env.GOLDSKY_API_KEY = ''

// Zora hooks addresses for V4 filtering - MUST be lowercase
export const ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING = new Set([
    ZORA_CREATOR_HOOK_ON_BASE_v1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_0_0_1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_1_1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_1_1_1,
    ZORA_CREATOR_HOOK_ON_BASE_v1_1_2,
    ZORA_CREATOR_HOOK_ON_BASE_v2_2,
    ZORA_CREATOR_HOOK_ON_BASE_v2_2_1,
    ZORA_POST_HOOK_ON_BASE_v1,
    ZORA_POST_HOOK_ON_BASE_v1_0_0_1,
    ZORA_POST_HOOK_ON_BASE_v1_0_0_2,
    ZORA_POST_HOOK_ON_BASE_v1_1_1,
    ZORA_POST_HOOK_ON_BASE_v1_1_1_1,
    ZORA_POST_HOOK_ON_BASE_v1_1_2,
    ZORA_POST_HOOK_ON_BASE_v2_2,
    ZORA_POST_HOOK_ON_BASE_v2_2_1,
    ZORA_POST_HOOK_ON_BASE_v2_3_0,
])

// during local cdk stack update, the env vars are not populated
// make sure to fill in the env vars below
// process.env.ALCHEMY_QUERY_KEY = ''
// process.env.ALCHEMY_QUERY_KEY_2 = ''

export const v4SubgraphUrlOverride = (chainId: ChainId) => {
    const apiKey = process.env.THEGRAPH_API_KEY || ''
    switch (chainId) {
        case ChainId.MAINNET:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/AdA6Ax3jtct69NnXfxNjWtPTe9gMtSEZx2tTQcT4VHu`
        case ChainId.ARBITRUM_ONE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/G5TsTKNi8yhPSV7kycaE23oWbqv9zzNqR49FoEQjzq1r`
        case ChainId.BASE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5f2npKL2a8oC6thaahyGW5NhJPAtDyMRnQHVmaNSJZ6o`
        case ChainId.POLYGON:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/2CB2uQxcDKWDenagn2z17KQVCtfwSx5eXYuvqTciRTJu`
        case ChainId.BNB:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/2qQpC8inZPZL4tYfRQPFGZhsE8mYzE67n5z3Yf5uuKMu`
        case ChainId.AVALANCHE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/49JxRo9FGxWpSf5Y5GKQPj5NUpX2HhpoZHpGzNEWQZjq`
        case ChainId.OPTIMISM:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/6RBtsmGUYfeLeZsYyxyKSUiaA6WpuC69shMEQ1Cfuj9u`
        case ChainId.UNICHAIN:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/Bd8UnJU8jCRJKVjcW16GHM3FNdfwTojmWb3QwSAmv8Uc`
        case ChainId.MONAD:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/3kaAG19ytkGfu8xD7YAAZ3qAQ3UDJRkmKH2kHUuyGHah`
        default:
            return undefined
    }
}

export const v3SubgraphUrlOverride = (chainId: ChainId) => {
    const apiKey = process.env.THEGRAPH_API_KEY || ''
    switch (chainId) {
        case ChainId.MAINNET:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
        case ChainId.ARBITRUM_ONE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/3V7ZY6muhxaQL5qvntX1CFXJ32W7BxXZTGTwmpH5J4t3`
        case ChainId.POLYGON:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/HMcqgvDY6f4MpnRSJqUUsBPHePj8Hq3AxiDBfDUrWs15`
        case ChainId.OPTIMISM:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj`
        case ChainId.AVALANCHE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/GVH9h9KZ9CqheUEL93qMbq7QwgoBu32QXQDPR6bev4Eo`
        case ChainId.BNB:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/G5MUbSBM7Nsrm9tH2tGQUiAF4SZDGf2qeo1xPLYjKr7K`
        case ChainId.BASE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/GqzP4Xaehti8KSfQmv3ZctFSjnSUYZ4En5NRsiTbvZpz`
        case ChainId.UNICHAIN:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/Eeg7Gq1ofowbpdTHcNYs4FotnHSddkz5iTNiQQVq7Q6K`
        case ChainId.MONAD:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5Gc5AtnN4G7V8uUvQHduZej34tkPqy67P6xFTAfND9pd`
        default:
            return undefined
    }
}

export const v2SubgraphUrlOverride = (chainId: ChainId) => {
    const apiKey = process.env.THEGRAPH_API_KEY || ''
    switch (chainId) {
        case ChainId.MAINNET:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/EYCKATKGBKLWvSfwvBjzfCBmGwYNdVkduYXVivCsLRFu`
        case ChainId.ARBITRUM_ONE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/CStW6CSQbHoXsgKuVCrk3uShGA4JX3CAzzv2x9zaGf8w`
        case ChainId.POLYGON:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/EXBcAqmvQi6VAnE9X4MNK83LPeA6c1PsGskffbmThoeK`
        // case ChainId.OPTIMISM:
        //     return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/SUBGRAPH_ID_PLACEHOLDER` //doesn't exist
        // case ChainId.AVALANCHE:
        //     return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/SUBGRAPH_ID_PLACEHOLDER` //doesn't exist
        case ChainId.BNB:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/8EjCaWZumyAfN3wyB4QnibeeXaYS8i4sp1PiWT91AGrt`
        case ChainId.BASE:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/4jGhpKjW4prWoyt5Bwk1ZHUwdEmNWveJcjEyjoTZWCY9`
        case ChainId.UNICHAIN:
            return `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/24MxHbKk2pzAbpGVwfe2mYZmdsUUBiLnw9g9JAYZsgD3`
        default:
            return undefined
    }
}

const getV3TrackedEthThreshold = (chainId: ChainId) =>
    chainId === ChainId.BASE ? 0.1 : 0.01

const getV2TrackedEthThreshold = (chainId: ChainId) =>
    chainId === ChainId.BASE ? 0.1 : 0.025

const getV4TrackedEthThreshold = (chainId: ChainId) =>
    chainId === ChainId.BASE ? 0.1 : 0.01

const v4UntrackedUsdThreshold = 0
const v3UntrackedUsdThreshold = 25_000
const v4BaseZoraTrackedEthThreshold = 0.001
const v2UntrackedUsdThreshold = Number.MAX_VALUE

export const v3TrackedEthThreshold = 0.01 // still export a default if other code imports it
export const v2TrackedEthThreshold = 0.025 // same here

export const chainProtocols = [
    // V3.
    {
        protocol: Protocol.V3,
        chainId: ChainId.MAINNET,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.MAINNET,
            3,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.MAINNET),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.MAINNET)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.ARBITRUM_ONE,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.ARBITRUM_ONE,
            5,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.ARBITRUM_ONE),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.ARBITRUM_ONE)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.POLYGON,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.POLYGON,
            3,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.POLYGON),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.POLYGON)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.OPTIMISM,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.OPTIMISM,
            3,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.OPTIMISM),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.OPTIMISM)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.BNB,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.BNB,
            3,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.BNB),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.BNB)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.AVALANCHE,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.AVALANCHE,
            3,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.AVALANCHE),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.AVALANCHE)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.BASE,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.BASE,
            3,
            900000, // kept your larger timeout for Base
            true,
            getV3TrackedEthThreshold(ChainId.BASE), // 0.1 on Base
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.BASE)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.UNICHAIN,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.UNICHAIN,
            3,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.UNICHAIN),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.UNICHAIN)
        ),
    },
    {
        protocol: Protocol.V3,
        chainId: ChainId.MONAD,
        timeout: 90000,
        provider: new V3SubgraphProvider(
            ChainId.MONAD,
            3,
            90000,
            true,
            getV3TrackedEthThreshold(ChainId.MONAD),
            v3UntrackedUsdThreshold,
            v3SubgraphUrlOverride(ChainId.MONAD),
        ),
    },

    // V2.
    {
        protocol: Protocol.V2,
        chainId: ChainId.MAINNET,
        timeout: 840000,
        provider: new V2SubgraphProvider(
            ChainId.MAINNET,
            5,
            900000,
            true,
            1000, // kept your page size
            getV2TrackedEthThreshold(ChainId.MAINNET),
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.MAINNET)
        ),
    },
    {
        protocol: Protocol.V2,
        chainId: ChainId.ARBITRUM_ONE,
        timeout: 90000,
        provider: new V2SubgraphProvider(
            ChainId.ARBITRUM_ONE,
            3,
            90000,
            true,
            1000,
            getV2TrackedEthThreshold(ChainId.ARBITRUM_ONE),
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.ARBITRUM_ONE)
        ),
    },
    {
        protocol: Protocol.V2,
        chainId: ChainId.POLYGON,
        timeout: 90000,
        provider: new V2SubgraphProvider(
            ChainId.POLYGON,
            3,
            90000,
            true,
            1000,
            getV2TrackedEthThreshold(ChainId.POLYGON),
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.POLYGON)
        ),
    },
    {
        protocol: Protocol.V2,
        chainId: ChainId.BNB,
        timeout: 90000,
        provider: new V2SubgraphProvider(
            ChainId.BNB,
            3,
            90000,
            true,
            1000,
            getV2TrackedEthThreshold(ChainId.BNB),
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.BNB)
        ),
    },
    {
        protocol: Protocol.V2,
        chainId: ChainId.BASE,
        timeout: 840000,
        provider: new V2SubgraphProvider(
            ChainId.BASE,
            5,
            900000,
            true,
            10000, // updated to match second config (was 5000)
            getV2TrackedEthThreshold(ChainId.BASE), // 0.1 on Base
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.BASE)
        ),
    },
    {
        protocol: Protocol.V2,
        chainId: ChainId.UNICHAIN,
        timeout: 90000,
        provider: new V2SubgraphProvider(
            ChainId.UNICHAIN,
            3,
            90000,
            true,
            1000,
            getV2TrackedEthThreshold(ChainId.UNICHAIN),
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.UNICHAIN)
        ),
    },

    // V4.
    {
        protocol: Protocol.V4,
        chainId: ChainId.MAINNET,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.MAINNET,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.MAINNET),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.MAINNET)
        ),
        eulerHooksProvider: new EulerSwapHooksSubgraphProvider(
            ChainId.MAINNET,
            3,
            90000,
            true,
            v4SubgraphUrlOverride(ChainId.MAINNET)
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.ARBITRUM_ONE,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.ARBITRUM_ONE,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.ARBITRUM_ONE),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.ARBITRUM_ONE)
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.BASE,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.BASE,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.BASE), // 0.1 on Base
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.BASE),
            process.env.GRAPH_BEARER_TOKEN
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.BNB,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.BNB,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.BNB),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.BNB)
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.OPTIMISM,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.OPTIMISM,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.OPTIMISM),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.OPTIMISM)
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.AVALANCHE,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.AVALANCHE,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.AVALANCHE),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.AVALANCHE)
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.POLYGON,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.POLYGON,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.POLYGON),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.POLYGON)
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.UNICHAIN,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.UNICHAIN,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.UNICHAIN),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.UNICHAIN)
        ),
        eulerHooksProvider: new EulerSwapHooksSubgraphProvider(
            ChainId.UNICHAIN,
            3,
            90000,
            true,
            v4SubgraphUrlOverride(ChainId.UNICHAIN)
        ),
    },
    {
        protocol: Protocol.V4,
        chainId: ChainId.MONAD,
        timeout: 90000,
        provider: new V4SubgraphProvider(
            ChainId.MONAD,
            3,
            90000,
            true,
            getV4TrackedEthThreshold(ChainId.MONAD),
            v4BaseZoraTrackedEthThreshold,
            ZORA_HOOKS_FOR_V4_SUBGRAPH_FILTERING,
            v4UntrackedUsdThreshold,
            v4SubgraphUrlOverride(ChainId.MONAD),
        ),
    },
]
