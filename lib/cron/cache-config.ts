import { Protocol } from '@uniswap/router-sdk'
import { V2SubgraphProvider, V3SubgraphProvider, V4SubgraphProvider } from '@uniswap/smart-order-router'
import { ChainId } from '@uniswap/sdk-core'

// during local cdk stack update, the env vars are not populated
// make sure to fill in the env vars below
// process.env.ALCHEMY_QUERY_KEY = ''
// process.env.ALCHEMY_QUERY_KEY_2 = ''

// The Graph Gateway requires bearer token authentication
// Add this header to your subgraph requests
export const theGraphHeaders = () => {
    const apiKey = process.env.THEGRAPH_API_KEY
    if (!apiKey) {
        throw new Error('THEGRAPH_API_KEY environment variable is not set')
    }
    return {
        Authorization: `Bearer ${apiKey}`,
    }
}

export const v4SubgraphUrlOverride = (chainId: ChainId) => {
    switch (chainId) {
        case ChainId.MAINNET:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/ethereum-v4/api`
        case ChainId.ARBITRUM_ONE:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/arbitrum-v4/api`
        case ChainId.BASE:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/base-v4/api`
        case ChainId.POLYGON:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/polygon-v4/api`
        case ChainId.BNB:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/bsc-v4/api`
        case ChainId.AVALANCHE:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/avalanche-v4/api`
        case ChainId.OPTIMISM:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/optimism-v4/api`
        case ChainId.UNICHAIN:
            return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/bransfer/unichain-v4/api`
        default:
            return undefined
    }
}

/* ---------- V3: keep your The Graph gateway IDs ---------- */
export const v3SubgraphUrlOverride = (chainId: ChainId) => {
    switch (chainId) {
        case ChainId.MAINNET:
            return `https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
        case ChainId.ARBITRUM_ONE:
            return `https://gateway.thegraph.com/api/subgraphs/id/3V7ZY6muhxaQL5qvntX1CFXJ32W7BxXZTGTwmpH5J4t3`
        case ChainId.POLYGON:
            return `https://gateway.thegraph.com/api/subgraphs/id/3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm`
        case ChainId.OPTIMISM:
            return `https://gateway.thegraph.com/api/subgraphs/id/Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj`
        case ChainId.AVALANCHE:
            return `https://gateway.thegraph.com/api/subgraphs/id/GVH9h9KZ9CqheUEL93qMbq7QwgoBu32QXQDPR6bev4Eo`
        case ChainId.BNB:
            return `https://gateway.thegraph.com/api/subgraphs/id/G5MUbSBM7Nsrm9tH2tGQUiAF4SZDGf2qeo1xPLYjKr7K`
        case ChainId.BASE:
            return `https://gateway.thegraph.com/api/subgraphs/id/43Hwfi3dJSoGpyas9VwNoDAv55yjgGrPpNSmbQZArzMG`
        case ChainId.UNICHAIN:
            return `https://gateway.thegraph.com/api/subgraphs/id/SUBGRAPH_ID_PLACEHOLDER`
        default:
            return undefined
    }
}

/* ---------- V2: keep your The Graph gateway IDs ---------- */
export const v2SubgraphUrlOverride = (chainId: ChainId) => {
    switch (chainId) {
        case ChainId.MAINNET:
            return `https://gateway.thegraph.com/api/subgraphs/id/EYCKATKGBKLWvSfwvBjzfCBmGwYNdVkduYXVivCsLRFu`
        case ChainId.ARBITRUM_ONE:
            return `https://gateway.thegraph.com/api/subgraphs/id/CStW6CSQbHoXsgKuVCrk3uShGA4JX3CAzzv2x9zaGf8w`
        case ChainId.POLYGON:
            return `https://gateway.thegraph.com/api/subgraphs/id/EXBcAqmvQi6VAnE9X4MNK83LPeA6c1PsGskffbmThoeK`
        case ChainId.OPTIMISM:
            return `https://gateway.thegraph.com/api/subgraphs/id/SUBGRAPH_ID_PLACEHOLDER`
        case ChainId.AVALANCHE:
            return `https://gateway.thegraph.com/api/subgraphs/id/SUBGRAPH_ID_PLACEHOLDER`
        case ChainId.BNB:
            return `https://gateway.thegraph.com/api/subgraphs/id/8EjCaWZumyAfN3wyB4QnibeeXaYS8i4sp1PiWT91AGrt`
        case ChainId.BASE:
            return `https://gateway.thegraph.com/api/subgraphs/id/4jGhpKjW4prWoyt5Bwk1ZHUwdEmNWveJcjEyjoTZWCY9`
        case ChainId.UNICHAIN:
            return `https://gateway.thegraph.com/api/subgraphs/id/24MxHbKk2pzAbpGVwfe2mYZmdsUUBiLnw9g9JAYZsgD3`
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
        chainId: ChainId.OPTIMISM,
        timeout: 90000,
        provider: new V2SubgraphProvider(
            ChainId.OPTIMISM,
            3,
            90000,
            true,
            1000,
            getV2TrackedEthThreshold(ChainId.OPTIMISM),
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.OPTIMISM)
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
        chainId: ChainId.AVALANCHE,
        timeout: 90000,
        provider: new V2SubgraphProvider(
            ChainId.AVALANCHE,
            3,
            90000,
            true,
            1000,
            getV2TrackedEthThreshold(ChainId.AVALANCHE),
            v2UntrackedUsdThreshold,
            v2SubgraphUrlOverride(ChainId.AVALANCHE)
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
            5000, // kept your page size
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
            v4SubgraphUrlOverride(ChainId.BASE)
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
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
            v4UntrackedUsdThreshold,
            undefined,
            undefined,
            v4SubgraphUrlOverride(ChainId.UNICHAIN)
        ),
    },
]
