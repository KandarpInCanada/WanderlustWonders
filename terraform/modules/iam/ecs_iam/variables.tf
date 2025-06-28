variable "name_prefix" {
  description = "Prefix for IAM roles and policies"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

variable "s3_bucket_arn" {
  description = "ARN of the S3 bucket the ECS task can access"
  type        = string
}

variable "dynamodb_table_arns" {
  description = "List of DynamoDB table ARNs the ECS task can access"
  type        = list(string)
}
