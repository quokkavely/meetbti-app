package com.springboot.helper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final String bucketName;

    public S3Service(@Value("${aws.s3.bucket-name}") String bucketName,
                     @Value("${aws.access-key-id}") String accessKeyId,
                     @Value("${aws.secret-access-key}") String secretAccessKey,
                     @Value("${aws.region}") String region) {
        this.bucketName = bucketName;
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    // MultipartFile을 처리하는 메서드
    public String uploadFile(MultipartFile multipartFile) {
        String fileName = multipartFile.getOriginalFilename();
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            s3Client.putObject(putObjectRequest,
                    software.amazon.awssdk.core.sync.RequestBody.fromInputStream(
                            multipartFile.getInputStream(), multipartFile.getSize()));

            return getFileUrl(fileName);
        } catch (S3Exception | IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getFileUrl(String fileName) {
        return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
    }
}

