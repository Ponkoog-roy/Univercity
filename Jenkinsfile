pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ponkoog-roy/Univercity.git'
            }
        }

        stage('Node Version') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Verify Build') {
            steps {
                sh 'ls -la dist'
            }
        }
    }

    post {
        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }
    }
}
