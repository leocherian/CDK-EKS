import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cdk from 'aws-cdk-lib';
import * as param from '../util/params.json'
import { Construct } from 'constructs';

export class VPCStack extends cdk.Stack {
    readonly vpc: ec2.Vpc;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, 'my-cdk-vpc', {
            ipAddresses: ec2.IpAddresses.cidr(param.vpc_cidr),
            vpcName: param.prefix.concat('-vpc'),
            natGateways: 1,
            maxAzs: 3,
            subnetConfiguration: [
                {
                    name: param.prefix.concat('-private-subnet-1'),
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24,
                },
                {
                    name: param.prefix.concat('-public-subnet-1'),
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 28,
                },
                {
                    name: param.prefix.concat('-private-subnet-2'),
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24,
                },
            ],
        });

        new cdk.CfnOutput(this, 'vpcId', {
            value: this.vpc.vpcId,
            description: 'The VPC ID',
            exportName: param.prefix.concat('-vpcId'),
        });

    }
}
