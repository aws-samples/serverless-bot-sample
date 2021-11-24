#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BotStack } from '../lib/botstack';

const app = new cdk.App();
new BotStack(app, 'BotStack', {});
