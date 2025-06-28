resource "aws_dynamodb_table" "this" {
  name         = var.post_metadata_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = var.post_metadata_hash_key
  attribute {
    name = var.post_metadata_hash_key
    type = var.post_metadata_hash_key_type
  }
  tags = var.tags
}
