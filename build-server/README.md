# build-server

## Overview

Build-server is a Node.js-based service designed to automate the process of building projects from Git repositories. It leverages AWS ECS (Elastic Container Service) for scalable container orchestration and AWS S3 for secure and efficient storage of build artifacts.

## Features

- **Git Integration:** Accepts Git repository URLs via a user-friendly API server.
- **Dockerized Builds:** Employs Docker containers to ensure build consistency and environment isolation across different systems.
- **In-Memory Builds:** Optimizes build performance by cloning and building projects within the container's memory, minimizing disk I/O.
- **AWS S3 Integration:** Uploads build artifacts securely and reliably to Amazon S3 storage for easy access and sharing.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your development machine.
- An AWS account with appropriate permissions for ECS and S3.

### Cloning the Repository

To clone the repository, use the following command:

```bash
git clone <project-git-url>
```

### Installation

cd build-server
npm install (or yarn install)

### Configuration

1. Create a `.env` file in the project root directory.
2. Add the following environment variables with your specific values:
    - `AWS_ACCESS_KEY_ID`: Your AWS access key ID
    - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
    - `ECS_CLUSTER_ARN`: The ARN of your AWS ECS cluster
    - `S3_BUCKET_NAME`: The name of your S3 bucket for storing build artifacts

### Running the Service

## API Reference

(Replace `<port>` with the actual port your server is running on)

### `POST /build` (JSON request)

- **Request Body:** `{ "gitUrl": "<your-git-repository-url>" }`
- **Response:** JSON object containing information about the build process (success/failure, logs, etc.)

## Build Configuration

(Optional) You can customize the build process by creating a `build.sh` script within your project's root directory. This script will be executed inside the Docker container during the build stage.

## Additional Notes

- For detailed information on setting up AWS ECS and S3, refer to the official AWS documentation: [AWS S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html) & [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
