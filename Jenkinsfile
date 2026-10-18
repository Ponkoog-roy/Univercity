pipeline {
    agent any

    environment {
        IMAGE_NAME = "ponkoog/univercity"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm install -g pnpm@11.5.1
                    pnpm install
                '''
            }
        }

        stage('Build Application') {
            steps {
                sh 'pnpm build:prod'
            }
        }

        stage('Version') {
            steps {
                script {

                    def version = readFile('VERSION').trim()

                    def parts = version.tokenize('.')

                    def major = parts[0]
                    def minor = parts[1]
                    def patch = parts[2].toInteger() + 1

                    env.NEW_VERSION = "${major}.${minor}.${patch}"
                    env.IMAGE_TAG = "v${env.NEW_VERSION}"

                    echo "Version: ${env.NEW_VERSION}"
                }
            }
        }

        stage('Docker Build & Push') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''

                    sh """
                        docker build \
                        -t ${IMAGE_NAME}:latest \
                        -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    """

                    sh """
                        docker push ${IMAGE_NAME}:latest
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }
}