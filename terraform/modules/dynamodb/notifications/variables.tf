variable "notifications_table_name" {
  description = "Name of the DynamoDB table for storing notifications"
  type        = string
}

variable "notifications_hash_key" {
  description = "Hash key (partition key) for the notifications DynamoDB table"
  type        = string
}

variable "notifications_hash_key_type" {
  description = "Type of the hash key for the notifications DynamoDB table"
  type        = string
  default     = "S"
}

variable "notifications_range_key" {
  description = "Range key (sort key) for the notifications DynamoDB table"
  type        = string
}

variable "notifications_range_key_type" {
  description = "Type of the range key for the notifications DynamoDB table"
  type        = string
  default     = "S"
}

variable "tags" {
  description = "Tags to apply to the table"
  type        = map(string)
  default     = {}
}
