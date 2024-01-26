#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EksStack } from '../lib/eks-stack';
import { VPCStack } from '../lib/vpc-stack';
import * as param from '../util/params.json'

const app = new cdk.App();


const vpcStack = new VPCStack(app, 'VPCStack', { 
  env: { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION },
  stackName: param.prefix.concat('VpcStack')
});

const eksStack = new EksStack (app, 'EksStack', { 
  env: { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION },
  vpc: vpcStack.vpc,
  stackName: param.prefix.concat('EksStack'),
});