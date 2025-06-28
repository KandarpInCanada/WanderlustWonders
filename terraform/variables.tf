variable "app_name" {
  description = "Application name"
  type        = string
  default     = "travel-stories"
}

variable "aws_account_id" {
  description = "AWS account id"
  type        = string
  sensitive   = true
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "aws_environment" {
  description = "AWS environment"
  type        = string
  default     = "dev"
}

variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
  default     = "travel-stories"
}

variable "s3_bucket_name" {
  description = "AWS bucket name"
  type        = string
  default     = "travel-stories-media"
}

variable "vpc_name" {
  description = "VPC name"
  type        = string
  default     = "travel-stories-vpc"
}

variable "vpc_cidr" {
  description = "VPC cidr block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_public_subnet_cidrs" {
  description = "VPC public cidr block"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "vpc_private_subnet_cidrs" {
  description = "VPC private cidr block"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "vpc_azs" {
  description = "VPC availability zones list"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
}

variable "ecs_task_cpu" {
  description = "CPU units for the task"
  type        = number
  default     = 256
}

variable "ecs_task_memory" {
  description = "Memory for the task in MiB"
  type        = number
  default     = 512
}

variable "ecs_container_name" {
  description = "Name of the container"
  type        = string
  default     = "travel-stories"
}

variable "ecs_container_port" {
  description = "Port exposed by the container"
  type        = number
  default     = 3000
}

variable "ecs_container_image_tag" {
  description = "Tag of the container image"
  type        = string
  default     = "latest"
}

variable "ecs_container_environment" {
  description = "Environment variables for the container"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

variable "ecs_desired_count" {
  description = "Desired number of tasks"
  type        = number
  default     = 2
}

variable "ecs_health_check_path" {
  description = "Path for health checks"
  type        = string
  default     = "/api/health"
}

variable "post_metadata_dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
  default     = "PostMetadata"
}

variable "post_metadata_dynamodb_hash_key" {
  description = "Partition key for the table"
  type        = string
  default     = "PostId"
}

variable "post_metadata_dynamodb_hash_key_type" {
  description = "Type of the partition key (S | N | B)"
  type        = string
  default     = "S"
}

variable "user_details_dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
  default     = "UserDetails"
}

variable "user_details_dynamodb_hash_key" {
  description = "Partition key for the table"
  type        = string
  default     = "UserId"
}

variable "user_details_dynamodb_hash_key_type" {
  description = "Type of the partition key (S | N | B)"
  type        = string
  default     = "S"
}

variable "notifications_dynamodb_table_name" {
  description = "Name of the DynamoDB table for storing notifications"
  type        = string
  default     = "Notifications"
}

variable "notifications_dynamodb_hash_key" {
  description = "Hash key (partition key) for the notifications DynamoDB table"
  type        = string
  default     = "UserId"
}

variable "notifications_dynamodb_hash_key_type" {
  description = "Type of the hash key for the notifications DynamoDB table"
  type        = string
  default     = "S"
}

variable "notifications_dynamodb_range_key" {
  description = "Range key (sort key) for the notifications DynamoDB table"
  type        = string
  default     = "NotificationId"
}

variable "notifications_dynamodb_range_key_type" {
  description = "Type of the range key for the notifications DynamoDB table"
  type        = string
  default     = "S"
}

variable "alert_email" {
  description = "Email address for alerts"
  type        = string
  default     = "admin@travel-stories.com"
}

variable "waf_rate_limit" {
  description = "Rate limit for WAF (requests per 5 minutes)"
  type        = number
  default     = 2000
}

variable "supabase_access_token" {
  description = "Supabase personal access token."
  type        = string
  sensitive   = true
}

variable "supabase_project_id" {
  description = "Supabase project ID."
  type        = string
}
