# AWS ECS CICD Example Project

# Content

- code
- workflow configurations
- AWS configurations
- test example

## code
I have provided code example from Frontend using Nextjs and also Dockerfile, there are also Backend using Nestjs too, but I do not implemented it yet in the pipeline.
```plaintext
root
├── frontend
│   ├── Dockerfile
│   ├── ...
├── backend
    ├── Dokerfile
    ├── ...
```


## workflow
There are 2 things 
- 1.workflow file for CICD
- 2.ECS taskdefinition for run a service within ECS cluster

Note: currently you need to update task definition manually if there are ingrastructure or image update 

## AWS configurations
There are configurations you need to do
- 1.create VPC with 2 public and 2 private subnets
- 2.create an ALB
- 3.create ECR (name must be aligned on workflow too)
- 4.create taskdefinition with Fargate
- 5.create ECS service and expose it usign ALB on port 80 (if you do not create service with ALB at first, you need to recreate it all over again)
- 6.creat github OIDC provider
- 7.create github action assumable role with these following permission
```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:RegisterTaskDefinition",
                "ecs:DeregisterTaskDefinition",
                "ecs:DescribeTaskDefinition",
                "ecs:CreateService",
                "ecs:UpdateService",
                "ecs:DeleteService",
                "ecs:DescribeServices",
                "ecs:ListTasks",
                "ecs:DescribeTasks",
                "ecs:RunTask",
                "ecs:StopTask",
                "ecs:StartTask",
                "ecs:UpdateContainerInstancesState",
                "ecs:ListClusters",
                "ecs:DescribeClusters",
                "ecs:TagResource"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "iam:GetRole"
            ],
            "Resource": "arn:aws:iam::1234567890:role/ecsTaskExecutionRole"
        }
    ]
}
```

and also using this managed permission  
```bash
AmazonEC2ContainerRegistryPowerUser
```
and with this trust relationship 

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::1234567890:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:RathomBoii/aws-ecs-cicd:*"
                }
            }
        }
    ]
}
```
Note: `ecsTaskExecutionRole` will be created automatically when you create ECS service.



## test example

![image](https://github.com/user-attachments/assets/685ec234-bde1-46e2-abfa-2f2a86f886c1)

