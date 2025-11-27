import * as cdk from 'aws-cdk-lib'
import { CfnOutput } from 'aws-cdk-lib'
import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway'
import { MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway'
import * as aws_logs from 'aws-cdk-lib/aws-logs'
import * as aws_waf from 'aws-cdk-lib/aws-wafv2'
import { Construct } from 'constructs'
import { RoutingCachingStack } from './routing-caching-stack'
import { RoutingDashboardStack } from './routing-dashboard-stack'
import { RoutingLambdaStack } from './routing-lambda-stack'
import { RoutingDatabaseStack } from './routing-database-stack'
import { TESTNETS } from '../../lib/util/testNets'
import { RpcGatewayFallbackStack } from './rpc-gateway-fallback-stack'
import { ChainId } from '@uniswap/sdk-core'

export const CHAINS_NOT_MONITORED: ChainId[] = TESTNETS
export const REQUEST_SOURCES_NOT_MONITORED = ['unknown']

// For low volume chains, we'll increase the evaluation periods to reduce triggering sensitivity.
export const LOW_VOLUME_CHAINS: Set<ChainId> = new Set([
  ChainId.CELO,
  ChainId.ZORA,
  ChainId.BLAST,
  ChainId.ZKSYNC,
  ChainId.SONEIUM,
  ChainId.AVALANCHE,
  ChainId.WORLDCHAIN,
])

// For low volume request sources, we'll increase the evaluation periods to reduce triggering sensitivity.
export const LOW_VOLUME_REQUEST_SOURCES: Set<string> = new Set(['uniswap-extension', 'uniswap-android', 'uniswap-ios'])

// For low volume chains, we'll increase the evaluation periods to reduce triggering sensitivity (5 mins periods).
export const LOW_VOLUME_EVALUATION_PERIODS = 10
export const HIGH_VOLUME_EVALUATION_PERIODS = 2

// Pool count anomaly detection configuration
export const POOL_COUNT_DEVIATION_ALERT_THRESHOLD = 0.05 // 5% deviation threshold
export const POOL_COUNT_EVALUATION_WINDOW_HOURS = 3 // 3-hour evaluation window for baseline compared to last 1 hour
export const POOL_COUNT_MINIMUM_VALUE_FOR_ANOMALY_DETECTION = 500 // Minimum value for pool count to trigger anomaly detection

export class RoutingAPIStack extends cdk.Stack {
  public readonly url: CfnOutput

  constructor(
    parent: Construct,
    name: string,
    props: cdk.StackProps & {
      jsonRpcProviders: { [chainName: string]: string }
      provisionedConcurrency: number
      throttlingOverride?: string
      ethGasStationInfoUrl: string
      chatbotSNSArn?: string
      stage: string
      internalApiKey?: string
      route53Arn?: string
      pinata_key?: string
      pinata_secret?: string
      hosted_zone?: string
      tenderlyUser: string
      tenderlyProject: string
      tenderlyAccessKey: string
      tenderlyNodeApiKey: string
      unicornSecret: string
      alchemyQueryKey?: string
      alchemyQueryKey2?: string
      theGraphApiKey?: string
      graphBaseV4SubgraphId?: string
      graphBearerToken?: string
      uniGraphQLEndpoint: string
      uniGraphQLHeaderOrigin: string
      resourceNamePrefix?: string // Optional prefix for resource names (e.g., 'DEV-'). If empty/undefined, names are auto-generated
      goldskyBearerToken?: string
      goldskyApiKey?: string
    }
  ) {
    super(parent, name, props)

    const {
      jsonRpcProviders,
      provisionedConcurrency,
      throttlingOverride,
      ethGasStationInfoUrl,
      chatbotSNSArn,
      stage,
      internalApiKey,
      route53Arn,
      pinata_key,
      pinata_secret,
      hosted_zone,
      tenderlyUser,
      tenderlyProject,
      tenderlyAccessKey,
      tenderlyNodeApiKey,
      unicornSecret,
      alchemyQueryKey,
      alchemyQueryKey2,
      graphBaseV4SubgraphId,
      graphBearerToken,
      theGraphApiKey,
      uniGraphQLEndpoint,
      uniGraphQLHeaderOrigin,
      goldskyBearerToken,
      goldskyApiKey,
      resourceNamePrefix,
    } = props

    const {
      poolCacheBucket,
      poolCacheBucket2,
      poolCacheBucket3,
      poolCacheKey,
      poolCacheGzipKey,
      poolCacheLambdaNameArray,
      tokenListCacheBucket,
    } = new RoutingCachingStack(this, 'RoutingCachingStack', {
      chatbotSNSArn,
      stage,
      route53Arn,
      pinata_key,
      pinata_secret,
      hosted_zone,
      alchemyQueryKey,
      alchemyQueryKey2,
      theGraphApiKey,
      resourceNamePrefix,
      graphBaseV4SubgraphId,
      graphBearerToken,
      goldskyBearerToken,
      goldskyApiKey,
    })

    const {
      routesDynamoDb,
      routesDbCachingRequestFlagDynamoDb,
      cachedRoutesDynamoDb,
      cachingRequestFlagDynamoDb,
      cachedV3PoolsDynamoDb,
      cachedV2PairsDynamoDb,
      tokenPropertiesCachingDynamoDb,
      rpcProviderHealthStateDynamoDb,
    } = new RoutingDatabaseStack(this, 'RoutingDatabaseStack', { stage, resourceNamePrefix })

    const { routingLambda, routingLambdaAlias } = new RoutingLambdaStack(this, 'RoutingLambdaStack', {
      poolCacheBucket,
      poolCacheBucket2,
      poolCacheBucket3,
      poolCacheKey,
      poolCacheGzipKey,
      jsonRpcProviders,
      tokenListCacheBucket,
      provisionedConcurrency,
      ethGasStationInfoUrl,
      chatbotSNSArn,
      tenderlyUser,
      tenderlyProject,
      tenderlyAccessKey,
      tenderlyNodeApiKey,
      routesDynamoDb,
      routesDbCachingRequestFlagDynamoDb,
      cachedRoutesDynamoDb,
      cachingRequestFlagDynamoDb,
      cachedV3PoolsDynamoDb,
      cachedV2PairsDynamoDb,
      tokenPropertiesCachingDynamoDb,
      rpcProviderHealthStateDynamoDb,
      unicornSecret,
      uniGraphQLEndpoint,
      uniGraphQLHeaderOrigin,
    })

    const accessLogGroup = new aws_logs.LogGroup(this, 'RoutingAPIGAccessLogs')

    const api = new aws_apigateway.RestApi(this, 'routing-api', {
      restApiName: 'Routing API',
      deployOptions: {
        tracingEnabled: true,
        loggingLevel: MethodLoggingLevel.ERROR,
        accessLogDestination: new aws_apigateway.LogGroupLogDestination(accessLogGroup),
        accessLogFormat: aws_apigateway.AccessLogFormat.jsonWithStandardFields({
          ip: false,
          caller: false,
          user: false,
          requestTime: true,
          httpMethod: true,
          resourcePath: true,
          status: true,
          protocol: true,
          responseLength: true,
        }),
      },
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
      },
    })

    const ipThrottlingACL = new aws_waf.CfnWebACL(this, 'RoutingAPIIPThrottlingACL', {
      defaultAction: { allow: {} },
      scope: 'REGIONAL',
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'RoutingAPIIPBasedThrottling',
      },
      customResponseBodies: {
        RoutingAPIThrottledResponseBody: {
          contentType: 'APPLICATION_JSON',
          content: '{"errorCode": "TOO_MANY_REQUESTS"}',
        },
      },
      // Only set explicit name if resourceNamePrefix is provided, otherwise auto-generate
      name: resourceNamePrefix ? `${resourceNamePrefix}RoutingAPIIPThrottling` : undefined,
      rules: [
        {
          name: 'ip',
          priority: 0,
          statement: {
            rateBasedStatement: {
              // Limit is per 5 mins, i.e. 600 requests every 5 mins
              limit: throttlingOverride ? parseInt(throttlingOverride) : 600,
              // API is of type EDGE so is fronted by Cloudfront as a proxy.
              // Use the ip set in X-Forwarded-For by Cloudfront, not the regular IP
              // which would just resolve to Cloudfronts IP.
              aggregateKeyType: 'FORWARDED_IP',
              forwardedIpConfig: {
                headerName: 'X-Forwarded-For',
                fallbackBehavior: 'MATCH',
              },
              scopeDownStatement: {
                notStatement: {
                  statement: {
                    byteMatchStatement: {
                      fieldToMatch: {
                        singleHeader: {
                          Name: 'x-api-key',
                        },
                      },
                      positionalConstraint: 'EXACTLY',
                      searchString: internalApiKey,
                      textTransformations: [
                        {
                          type: 'NONE',
                          priority: 0,
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          action: {
            block: {
              customResponse: {
                responseCode: 429,
                customResponseBodyKey: 'RoutingAPIThrottledResponseBody',
              },
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'RoutingAPIIPBasedThrottlingRule',
          },
        },
      ],
    })

    const region = cdk.Stack.of(this).region
    const apiArn = `arn:aws:apigateway:${region}::/restapis/${api.restApiId}/stages/${api.deploymentStage.stageName}`

    new aws_waf.CfnWebACLAssociation(this, 'RoutingAPIIPThrottlingAssociation', {
      resourceArn: apiArn,
      webAclArn: ipThrottlingACL.getAtt('Arn').toString(),
    })

    new RoutingDashboardStack(this, 'RoutingDashboardStack', {
      apiName: api.restApiName,
      routingLambdaName: routingLambda.functionName,
      poolCacheLambdaNameArray,
      resourceNamePrefix,
    })

    new RpcGatewayFallbackStack(this, 'RpcGatewayFallbackStack', { rpcProviderHealthStateDynamoDb })

    const lambdaIntegration = new aws_apigateway.LambdaIntegration(routingLambdaAlias)

    const quote = api.root.addResource('quote', {
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
      },
    })
    quote.addMethod('GET', lambdaIntegration)

    this.url = new CfnOutput(this, 'Url', {
      value: api.url,
    })
  }
}
