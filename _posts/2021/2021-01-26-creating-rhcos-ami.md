---
layout: post
title: Creating a Red Hat CoreOS (RHCOS) AMI
date: 2021-01-26 09:26:00 -0500
description: Creating a Red Hat CoreOS AMI from a VMDK file, which you can then publish wherever you want on AWS (because it's not available in all regions currently)
img: 2021/rh-core-os.jpeg
tags: [containers]
---

# Creating a Red Hat CoreOS (RHCOS) AMI

Being that Red Hat is cutting into the field of allowing Air Gapped installations of OpenShift on a high side network using projects like 
[Code Sparta](https://codectl.io/), it's possible you'll need an image of the Red Hat CoreOS for use in AWS.

## What is CoreOS?
[CoreOS](https://coreos.com/) is a project started by the company [Tectonic](https://developers.redhat.com/blog/2018/08/29/intro-to-podman/).  
Like [Alpine]() (a fork of the Linux Embedded Alpine Linux aka "LEAF", which was in turn a form of the Linux Router Project or "LRP"), 
it's an extremely lightweight Linux OS which allows for a tiny footprint for installing on top of.  This distribution was not afraid of diverging radically
from traditional Linux, for example by creating an immutable filesystem, no-downtime upgrades, and a program called [Ignition](), which shoves ssh keys into
place before starting.  The biggest difference, though, is the comprehensive documentation.  For all these reasons, 
it is the base for [Red Hat OpenShift Container Platform (RHOCP)](https://www.openshift.com/products/container-platform).

Being that Tectonic was recently bought by [Red Hat](https://www.redhat.com/en) to improve their portfolio of secure base images, CoreOS has become
the natural successor to Red Hat Atomic.  For a full history of this transition, feel free to 
[click here](https://www.zdnet.com/article/heres-what-happens-to-coreos-now-that-red-hat-owns-it/#:~:text=Container%20Linux%20and%20Project%20Atomic,united%20into%20Red%20Hat%20CoreOS.&text=There%20will%20be%20an%20upstream,still%20a%20work%20in%20progress).  Then, last year, Red Hat changed direction a bit 
and [shifted CoreOS](https://www.datacenterknowledge.com/open-source/fork-available-red-hat-ends-life-coreos-container-linux) to having two streams, Fedora CoreOS and Red Hat CoreOS (matching their open source and support driven OS streams).  Now, I'm not going to pretend that there aren't [issues with Red Hat's recent interactions with CoreOS or CentOS](https://www.theregister.com/2021/01/26/killing_centos/), but in general, I think it matches Red Hat's mission is to support already 
open source projects, and I'm pretty happy at this point that IBM, with their purchase of 
[Red Hat](https://www.redhat.com/en/about/press-releases/ibm-closes-landmark-acquisition-red-hat-34-billion-defines-open-hybrid-cloud-future), hasn't 
adjusted this mission.  


In general, though, just think of CoreOS as a really tiny Linux image, that you can shove your SSH key in before starting, so it allows you to spin it up in AWS or Kubernetes.  The Red Hat one is going to be the one we use here, as it's going to be used for OpenShift, but generally, the methods work for the other versions as
well.

# What do I need for this?

## Homebrew (if you're on a Mac)

At this point, you should be using a package manager, as it's nuts to be figuring out install packages for everything yourself.  Just too much software.  On Fedora/RHEL, this is `dnf`, but we're on MacOS, and the package manager of choice in this article, is **Homebrew**.  Go to the [homepage](https://brew.sh/) and install it, if you haven't already.  If you have, I suggest doing a `brew update` just to make sure you have updated your sources.

## AWS CLI v2

For a Mac, assuming you have Homebrew installed, just run the following:

```bash
brew install awscli
```

If not, install [AWS CLI via the instructions in AWS](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).  

Either way, you should [configure your environment](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) so that your 
credentials and default region are cached.

## Some sort of bash shell

Because I'm not going to translate this to every other shell (I only have so much time), get yourself a bash shell of some kind.  On windows, this could be [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) or [MINGW](https://sourceforge.net/projects/mingw/) - whatever floats your boat.  I'm not writing PowerShell here though.

# Get the latest VM

1. Download the latest RHCOS drive image from the following openshiftlocation (note, this may require a red hat login): 

http://mirror.openshift.com/pub/openshift-v4/dependencies/rhcos/latest/latest/

2. Install gunzip ([Debian/Linux](https://www.2daygeek.com/linux-gzip-gunzip-compress-decompress-extract-files/), [Windows](http://gnuwin32.sourceforge.net/packages/gzip.htm), It's already on MacOS)

3. Unzip the gzipped file (replace "filename" with the actual filename)

```bash
gunzip [filename]
```
# Set up the VM Import Daemon user

If you have never set up the VM import user in AWS, you're going to have to do this.
Most of the following is modified from the associated VM Import guide from Amazon, which can be found 
[here](https://docs.aws.amazon.com/vm-import/latest/userguide/vmie_prereqs.html).

1. Create a json file that describes the trust policy we need to create for the VM import daemon user in AWS

```bash
cat <<- EOT > vmimport-trust-policy.json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Principal": { "Service": "vmie.amazonaws.com" },
         "Action": "sts:AssumeRole",
         "Condition": {
            "StringEquals":{
               "sts:Externalid": "vmimport"
            }
         }
      }
   ]
}
EOT
```

2. Manually Add the trust policy for the vmimport service using the json file we just created

```bash
aws iam create-role --role-name vmimport --assume-role-policy-document "file://vmimport-trust-policy.json"
```

3. Create a json file that describes the role policy we need to create for the VM import daemon user in AWS

```bash
cat <<- EOT > vmimport-role-policy.json
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Effect": "Allow",
         "Action": [
            "s3:GetBucketLocation",
            "s3:GetObject",
            "s3:ListBucket" 
         ],
         "Resource": [
            "arn:aws-us-gov:s3:::com.deloitte.irsm.tooling",
            "arn:aws-us-gov:s3:::com.deloitte.irsm.tooling/*"
         ]
      },
      {
         "Effect": "Allow",
         "Action": [
            "s3:GetBucketLocation",
            "s3:GetObject",
            "s3:ListBucket",
            "s3:PutObject",
            "s3:GetBucketAcl"
         ],
         "Resource": [
            "arn:aws-us-gov:s3:::com.deloitte.irsm.tooling",
            "arn:aws-us-gov:s3:::com.deloitte.irsm.tooling/*"
         ]
      },
      {
         "Effect": "Allow",
         "Action": [
            "ec2:ModifySnapshotAttribute",
            "ec2:CopySnapshot",
            "ec2:RegisterImage",
            "ec2:Describe*"
         ],
         "Resource": "*"
      }
   ]
}
EOT
```

4. Manually Add the role policy for the vmimport service using the json file we just created

```bash
aws iam put-role-policy --role-name vmimport --policy-name vmimport --policy-document "vmimport-role-policy.json"
```

5. Although I'm not going into it too much, if you need to fix encryption keys, follow the [following guide](https://docs.aws.amazon.com/vm-import/latest/userguide/vmimport-troubleshooting.html)

# Importing the VM Image

1. Upload to vmdk to an S3 bucket.  Make sure to update all of these values prior to executing.
* Change `rhcos-46.82.202012051820-0-aws.x86_64.vmdk` to the filename of the vmdk you downloaded
* Change `my.place.to.upload` to your actual S3 bucket

```bash
aws s3 cp ~/rhcos-46.82.202012051820-0-aws.x86_64.vmdk s3://my.place.to.upload
```

2. Create the import job description.  Make sure to update all of these values prior to executing.
* Change `RHCOS 4.6 AWS VMDK` description to be whatever description helps you the best
* Change `rhcos-46.82.202012051820-0-aws.x86_64.vmdk` to the filename of the vmdk you downloaded
* Change `my.place.to.upload` to the S3 bucket you uploaded to

```bash
cat <<- EOT > container-aws-vmdk.json
{
   "Description": "RHCOS 4.6 AWS VMDK",
   "Format": "vmdk",
   "UserBucket": {
      "S3Bucket": "my.place.to.upload",
      "S3Key": "rhcos-46.82.202012051820-0-aws.x86_64.vmdk"
   }
}
EOT
```

3. Execute the import an EBS Volume snapshot.  Make sure to update all of these values prior to executing.
* Change `RHCOS 4.6 AWS VMDK` description to be whatever description helps you the best
* Change `us-gov-east-1` to the [region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions) that best suits your use case.

```bash
aws ec2 import-snapshot \
   --region us-gov-east-1 \
   --description "RHCOS 4.6.8 AWS VMDK" \
   --disk-container file://container-aws-vmdk.json
```

4. Check the status of the snapshot task.  Just running this periodically until it is completed. Make sure to update all of these values prior to executing.
* Change "us-gov-east-1" to the [region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions) that best suits your use case.

```bash
aws ec2 describe-import-snapshot-tasks --region us-gov-east-1
```

Once completed, make sure to copy off the snapshot ID!  In this case, I got the snapshot "snap-0b8d323c205b0df0c"


5. Once your EBS snapshot import is complete, you can create an AMI out of it.  Make sure to update all of these values prior to executing.
* Change "RHCOS 4.6 AWS VMDK" description to be whatever description helps you the best
* Change "us-gov-east-1" to the [region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions) that best suits your use case.
* Update `snap-0b8d323c205b0df0c` to be the snapshot ID you got in step 4
* Change the name `rhcos-4.6.8-x86_64-aws.x86_64` to be the name that you want your AMI to have
* Change the description `rhcos-4.6.8-x86_64-aws.x86_64` to be the description you want your AMI to have

```bash
aws ec2 register-image \
--region us-gov-east-1 \
--architecture x86_64 \
--virtualization-type "hvm" \
--root-device-name '/dev/xvda' \
--ena-support \
--name "rhcos-4.6.8-x86_64-aws.x86_64" \
--block-device-mappings 'DeviceName=/dev/xvda,Ebs={DeleteOnTermination=true,SnapshotId=snap-0b8d323c205b0df0c}' \
--description "rhcos-4.6.8-x86_64-aws.x86_64"
```

This should return an AMI like the following: `ami-7e8e4e0f`


6. To try it out, you can try to start up an EC2 instance up with your new AMI with a command like the following. Make sure to update all of these values prior to executing.
* Replace `ami-7e8e4e0f` with the output from step 5
* Update `sg-903004f8` with the id of a security group that you want ot use.  Here is a link to [us-east-1](https://console.aws.amazon.com/ec2/home?region=us-east-1#s=SecurityGroups), for example.  Or you can use the command `aws ec2 describe-security-groups --region us-gov-east-1` (replacing the appropriate variables)
* Update `subnet-6e7f829e` with the id of a subnet you want to use.
* Update `MyKeyPair` with the name of the key-pair certificate defined in AWS

```bash
aws ec2 run-instances \
--image-id ami-7e8e4e0f \
--count 1 \
--instance-type t2.micro \
--key-name MyKeyPair \
--security-group-ids sg-903004f8 \
--subnet-id subnet-6e7f829e \
--user-data "{\"ignition\": {\"version\":\"3.1.0\"},\"passwd\":{\"users\":[{\"name\": \"core\",\"passwordHash\": \"\",\"sshAuthorizedKeys\":[\"${var.ssh_public_key}\"]}]}}"
```

7. You should be able to ssh to it with the command.
```bash
ssh -i .pem ip.address
```

# That's All!

Now you should have yourself a working AMI that can be spun up whenever you need it.  Remember, this uses Ignition, so you need to 
[pass in users/groups](https://coreos.com/os/docs/latest/clc-examples.html).

Happy hacking!

