#!/usr/bin/env bash
set -euo pipefail

if [ -z "${AWS_BUCKET:-}" ] || [ -z "${AWS_REGION:-}" ]; then
  echo "Please set AWS_BUCKET and AWS_REGION environment variables."
  exit 1
fi

aws s3 sync dist s3://"${AWS_BUCKET}" --delete --acl public-read --region "${AWS_REGION}"
echo "Deployed to s3://${AWS_BUCKET}"
