# Node.js Express Application with CI/CD Pipeline

This project is a Node.js application using Express. It includes a CI/CD pipeline configured with GitHub Actions, unit tests using Mocha and Chai, ESLint configuration, automated dependency updates with Dependabot, static code analysis using SonarCloud, and Docker integration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [CI/CD Pipeline](#cicd-pipeline)
  - [Test Job](#test-job)
  - [Build Job](#build-job)
- [Automated Dependency Updates](#automated-dependency-updates)
- [Static Code Analysis](#static-code-analysis)
- [Docker Integration](#docker-integration)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js
- npm
- Docker
- GitHub account
- SonarCloud account

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    npm start
    ```

4. Run tests:
    ```bash
    npm test
    ```

## CI/CD Pipeline

This project uses GitHub Actions for the CI/CD pipeline. The pipeline consists of two jobs: `test` and `build`.

### Test Job

The `test` job runs whenever a new pull request on the `main` branch is triggered. It includes the following steps:

1. **Checkout repository**:
    ```yaml
    - name: Checkout repository
      uses: actions/checkout@v2
    ```

2. **Set up Node.js**:
    ```yaml
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20.13.1'
    ```

3. **Install dependencies**:
    ```yaml
    - name: Install dependencies
      run: npm ci
    ```

4. **Run ESLint**:
    ```yaml
    - name: Run ESLint
      run: npm run lint
    ```

5. **Run Test**:
    ```yaml
    - name: Run tests
      run: npm test
    ```

6. **Run Test With Coverage**:
    ```yaml
    - name: Run tests with coverage
      run: npm run test-with-coverage
    ```

7. **Generate lcov Reporter**:
    ```yaml
    - name: Generate lcov reporter
      run: npm run test-with-lcov-reporter
    ```

8. **Archive Test Result artifacts**:
    ```yaml
    - name: Archive test results
      uses: actions/upload-artifact@v2
      with:
        name: test-results
        path: ./test-results
    ```

9. **SonarCloud Scan**:
    ```yaml
    - name: SonarCloud Scan
      uses: sonarsource/sonarcloud-github-action@v2.2.0
      env:
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
    ```

### Build Job

The `build` job runs whenever a merge request on the `main` branch is triggered. It includes the following steps:

1. **Checkout repository**:
    ```yaml
    - name: Checkout repository
      uses: actions/checkout@v2
    ```

2. **Set up Node.js**:
    ```yaml
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20.13.1'
    ```

3. **Install dependencies**:
    ```yaml
    - name: Install dependencies
      run: npm ci
    ```

4. **Login to GitHub Container Registry**:
    ```yaml
    - name: Login to GitHub Container Registry
      uses: docker/login-action@v1
      with:
        registry: ghcr.io
        username: ${{github.actor}}
        password: ${{secrets.GITHUB_TOKEN}}
    ```

5. **Set up Docker Buildx**:
    ```yaml
    - name: Set up Docker Buildx
      id: buildx
      uses: docker/setup-buildx-action@f95db51fddba0c2d1ec667646a06c2ce06100226 # v3
    ```

6. **Build Docker Image**:
    ```yaml
    - name: Build Docker Image
      uses: docker/build-push-action@0565240e2d4ab88bba5387d719585280857ece09 # v5
      with:
        context: ./
        platforms: linux/x86_64
        file: ./Dockerfile
        tags: 
          ghcr.io/${{github.repository}}/notes-backend:1.0.0
        push: true
    ```

## Automated Dependency Updates

This project uses Dependabot for automated dependency updates. Dependabot checks for updates to your dependencies and creates pull requests to keep them up-to-date.

## Static Code Analysis

SonarCloud is used for static code analysis. The `test` job includes a step to run a SonarCloud scan to analyze the code for potential bugs, code smells, and security vulnerabilities.
![image](https://github.com/hamidreza-ygh8/fhb-assignment-backend/assets/143938782/d9c6afdc-d3ec-47fe-99d5-dc4352738456)

## Docker Integration

The `build` job includes steps to build a Docker image and push it to the GitHub Container Registry. This allows for easy deployment of the application in a containerized environment.



