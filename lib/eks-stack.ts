import * as cdk from 'aws-cdk-lib';
import { aws_eks, aws_ec2, StackProps } from 'aws-cdk-lib';
import { Vpc, IVpc, InstanceType, Port, BlockDeviceVolume, EbsDeviceVolumeType, Instance, MachineImage, AmazonLinuxGeneration, SecurityGroup, Peer, VpcProps } from 'aws-cdk-lib/aws-ec2';
import * as param from '../util/params.json'
import { Construct } from 'constructs';


interface EksStackProps extends StackProps {
  vpc: Vpc
}

export class EksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EksStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const vpc = getVpc(this);
    const instanceType = new aws_ec2.InstanceType(param.instance_type);

    const cluster = new aws_eks.Cluster(this, 'MyCluster', {
      clusterName: param.prefix.concat('-cluster'),
      version: aws_eks.KubernetesVersion.V1_28,
      vpc: props.vpc,
      defaultCapacity: 1,
      defaultCapacityInstance: instanceType,
      clusterLogging: [
        aws_eks.ClusterLoggingTypes.AUDIT,
        aws_eks.ClusterLoggingTypes.AUTHENTICATOR
      ],
      placeClusterHandlerInVpc: true,
    });



  }
}
