# S3 Bucket for media storage
resource "aws_s3_bucket" "media_bucket" {
  bucket        = "${var.bucket_name}-${var.environment}"
  force_destroy = var.environment != "prod" # Only allow force destroy in non-prod
  
  tags = merge(var.tags, {
    Name        = "${var.bucket_name}-${var.environment}"
    Environment = var.environment
    Purpose     = "Media Storage"
  })
}

# S3 Bucket Versioning (Reliability)
resource "aws_s3_bucket_versioning" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 Bucket Server Side Encryption (Security)
resource "aws_s3_bucket_server_side_encryption_configuration" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# S3 Bucket Public Access Block (Security)
resource "aws_s3_bucket_public_access_block" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 Bucket CORS Configuration - More restrictive
resource "aws_s3_bucket_cors_configuration" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = [
      "http://localhost:3000",
      "https://*.vercel.app",
      var.environment == "prod" ? "https://yourdomain.com" : "https://*.yourdomain.com"
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# S3 Bucket Lifecycle Configuration (Cost Optimization)
resource "aws_s3_bucket_lifecycle_configuration" "media_bucket" {
  bucket = aws_s3_bucket.media_bucket.id

  rule {
    id     = "media_lifecycle"
    status = "Enabled"

    # Move to IA after 30 days
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    # Move to Glacier after 90 days
    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    # Move to Deep Archive after 365 days
    transition {
      days          = 365
      storage_class = "DEEP_ARCHIVE"
    }

    # Delete incomplete multipart uploads after 7 days
    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }

    # Delete old versions after 90 days
    noncurrent_version_expiration {
      noncurrent_days = 90
    }
  }
}

# S3 Bucket Notification for Lambda triggers
resource "aws_s3_bucket_notification" "media_bucket_notification" {
  bucket = aws_s3_bucket.media_bucket.id

  # This will be configured when Lambda is added
  depends_on = [aws_s3_bucket.media_bucket]
}

# CloudWatch Metrics for S3 (Operational Excellence)
resource "aws_s3_bucket_metric" "media_bucket_metrics" {
  bucket = aws_s3_bucket.media_bucket.id
  name   = "EntireBucket"
}

# S3 Bucket Logging (Security & Operational Excellence)
resource "aws_s3_bucket" "access_logs" {
  bucket        = "${var.bucket_name}-access-logs-${var.environment}"
  force_destroy = var.environment != "prod"
  
  tags = merge(var.tags, {
    Name        = "${var.bucket_name}-access-logs-${var.environment}"
    Environment = var.environment
    Purpose     = "Access Logs"
  })
}

resource "aws_s3_bucket_public_access_block" "access_logs" {
  bucket = aws_s3_bucket.access_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "access_logs" {
  bucket = aws_s3_bucket.access_logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_logging" "media_bucket_logging" {
  bucket = aws_s3_bucket.media_bucket.id

  target_bucket = aws_s3_bucket.access_logs.id
  target_prefix = "access-logs/"
}
