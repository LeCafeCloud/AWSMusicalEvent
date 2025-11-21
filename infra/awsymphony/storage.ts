export const testBucket = new sst.aws.Bucket("TestBucket");

// Enable EventBridge notifications for S3 events
new aws.s3.BucketNotification("TestBucketNotification", {
	bucket: testBucket.name,
	eventbridge: true,
});
