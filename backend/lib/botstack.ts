import * as cdk from '@aws-cdk/core';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import {PythonFunction} from '@aws-cdk/aws-lambda-python';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export class BotStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApi = new apiGateway.RestApi(this, 'RestApi', {
      deployOptions: {stageName: 'api'},
      defaultCorsPreflightOptions: { 
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
      }
    });
    
    const botId = new cdk.CfnParameter(this, 'BotId', {
      type: 'String',
      description: 'LexV2 Bot ID'
    }).valueAsString;
    const botAliasId = new cdk.CfnParameter(this, 'BotAliasId', {
      type: 'String',
      description: 'LexV2 Bot Alias ID'
    }).valueAsString;
    const botLocale = new cdk.CfnParameter(this, 'BotLocale', {
      type: 'String',
      description: 'LexV2 Bot Locale',
      default: 'ja_JP'
    }).valueAsString;

    const requestHandler = new PythonFunction(this, 'RequestHandlerFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      entry: 'lambda/request_handler',
      handler: 'lambda_handler',
      timeout: cdk.Duration.seconds(15), 
      environment: {
        BOT_ID: botId,
        BOT_ALIAS_ID: botAliasId,
        BOT_LOCALE: botLocale,
      }
    });

    requestHandler.role!.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonLexRunBotsOnly'));

    restApi.root.addResource('chat').addMethod('POST', new apiGateway.LambdaIntegration(requestHandler));
  }
}
