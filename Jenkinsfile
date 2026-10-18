pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ponkoog-roy/Univercity.git'

                sh '''
                    echo "Branch: $(git branch --show-current)"
                    echo "Commit: $(git rev-parse --short HEAD)"
                '''
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                    set -eu
                    node --version
                    npm --version
                    pnpm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    set -eu

                    if [ -f pnpm-lock.yaml ]; then
                        pnpm install --frozen-lockfile
                    else
                        pnpm install --no-frozen-lockfile
                    fi
                '''
            }
        }

        stage('Test and Quality Checks') {
            steps {
                sh '''
                    set -eu

                    if node -e "process.exit(require('./package.json').scripts?.test ? 0 : 1)"; then
                        pnpm run test
                    elif node -e "process.exit(require('./package.json').scripts?.check ? 0 : 1)"; then
                        pnpm run check
                    else
                        echo "No test/check script found. Skipping."
                    fi
                '''
            }
        }

        stage('Production Build') {
            steps {
                sh '''
                    set -eu
                    pnpm run build

                    test -d dist

                    echo "Build completed"
                    du -sh dist
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts(
                    artifacts: 'dist/**',
                    fingerprint: true
                )
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed.'
        }

        always {
            echo "Build result: ${currentBuild.currentResult}"
        }
    }
}
