# Get the current AWS account ID and region
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

# VPC Module
module "vpc" {
  source               = "./modules/vpc"
  name                 = var.vpc_name
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.vpc_public_subnet_cidrs
  private_subnet_cidrs = var.vpc_private_subnet_cidrs
  azs                  = var.vpc_azs
  
  tags = merge(var.tags, {
    Component = "networking"
  })
}

# ECR Module
module "ecr" {
  source          = "./modules/ecr"
  repository_name = var.ecr_repository_name
  environment     = var.aws_environment
  
  tags = merge(var.tags, {
    Component = "container-registry"
  })
}

# Media Storage S3 Module (for image uploads and processing)
module "media_storage" {
  source      = "./modules/s3"
  bucket_name = var.s3_bucket_name
  environment = var.aws_environment
  
  tags = merge(var.tags, {
    Component = "storage"
    Purpose   = "media-files"
  })
}

# DynamoDB Tables (for application data)
module "post_metadata_dynamodb" {
  source                       = "./modules/dynamodb/post_metadata"
  post_metadata_table_name     = var.post_metadata_dynamodb_table_name
  post_metadata_hash_key       = var.post_metadata_dynamodb_hash_key
  post_metadata_hash_key_type  = var.post_metadata_dynamodb_hash_key_type
  
  tags = merge(var.tags, {
    Component = "database"
    DataType  = "post-metadata"
  })
}

module "user_details_dynamodb" {
  source                     = "./modules/dynamodb/user_details"
  user_table_name            = var.user_details_dynamodb_table_name
  user_details_hash_key      = var.user_details_dynamodb_hash_key
  user_details_hash_key_type = var.user_details_dynamodb_hash_key_type
  
  tags = merge(var.tags, {
    Component = "database"
    DataType  = "user-details"
  })
}

module "notifications_dynamodb" {
  source                              = "./modules/dynamodb/notifications"
  notifications_table_name            = var.notifications_dynamodb_table_name
  notifications_hash_key              = var.notifications_dynamodb_hash_key
  notifications_hash_key_type         = var.notifications_dynamodb_hash_key_type
  notifications_range_key             = var.notifications_dynamodb_range_key
  notifications_range_key_type        = var.notifications_dynamodb_range_key_type
  
  tags = merge(var.tags, {
    Component = "database"
    DataType  = "notifications"
  })
}

# IAM Roles for ECS
module "ecs_iam" {
  source        = "./modules/iam/ecs_iam"
  name_prefix   = "${var.app_name}-${var.aws_environment}"
  s3_bucket_arn = module.media_storage.bucket_arn
  
  # DynamoDB table ARNs for IAM permissions
  dynamodb_table_arns = [
    module.post_metadata_dynamodb.table_arn,
    module.user_details_dynamodb.table_arn,
    module.notifications_dynamodb.table_arn
  ]
  
  tags = merge(var.tags, {
    Component = "security"
  })
}

# ECS Cluster and Service
module "ecs" {
  source                 = "./modules/ecs"
  aws_region             = var.aws_region
  app_name               = var.app_name
  environment            = var.aws_environment
  vpc_id                 = module.vpc.vpc_id
  private_subnet_ids     = module.vpc.private_subnet_ids
  public_subnet_ids      = module.vpc.public_subnet_ids
  ecr_repository_url     = module.ecr.repository_url
  s3_bucket_arn          = module.media_storage.bucket_arn
  task_cpu               = var.ecs_task_cpu
  task_memory            = var.ecs_task_memory
  container_name         = var.ecs_container_name
  container_port         = var.ecs_container_port
  container_image_tag    = var.ecs_container_image_tag
  container_environment  = var.ecs_container_environment
  desired_count          = var.ecs_desired_count
  health_check_path      = var.ecs_health_check_path
  ecs_execution_role_arn = module.ecs_iam.execution_role_arn
  ecs_task_role_arn      = module.ecs_iam.task_role_arn
  
  # Enable detailed monitoring and logging
  enable_container_insights = true
  log_retention_days       = 30
  
  tags = merge(var.tags, {
    Component = "compute"
  })
}

# CloudWatch Alarms and Monitoring
module "monitoring" {
  source = "./modules/monitoring"
  
  app_name    = var.app_name
  environment = var.aws_environment
  
  # ECS monitoring
  ecs_cluster_name = module.ecs.cluster_name
  ecs_service_name = module.ecs.service_name
  
  # DynamoDB monitoring
  dynamodb_table_names = [
    module.post_metadata_dynamodb.table_name,
    module.user_details_dynamodb.table_name,
    module.notifications_dynamodb.table_name
  ]
  
  # S3 monitoring
  s3_bucket_name = module.media_storage.bucket_id
  
  # ALB monitoring
  load_balancer_arn_suffix = module.ecs.load_balancer_arn_suffix
  target_group_arn_suffix  = module.ecs.target_group_arn_suffix
  
  # SNS topic for alerts
  alert_email = var.alert_email
  
  tags = merge(var.tags, {
    Component = "monitoring"
  })
}

# # WAF for Application Security
# module "waf" {
#   source = "./modules/security/waf"
  
#   app_name         = var.app_name
#   environment      = var.aws_environment
#   load_balancer_arn = module.ecs.load_balancer_arn
  
#   # Rate limiting
#   rate_limit = var.waf_rate_limit
  
#   tags = merge(var.tags, {
#     Component = "security"
#   })
# }

# module "supabase_auth_settings" {
#   source                = "./modules/supabase_auth_settings"
#   supabase_access_token = var.supabase_access_token
#   project_id            = var.supabase_project_id
#   site_url              = "https://${module.ecs.load_balancer_dns_name}/auth/callback"
#   additional_redirect_urls = [
#     "https://${module.ecs.load_balancer_dns_name}",
#     "https://${module.ecs.load_balancer_dns_name}/auth/callback"
#   ]
# }
