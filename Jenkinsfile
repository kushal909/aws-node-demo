pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t aws-node-demo:latest .'
            }
        }

        stage('Docker Run') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'mongo-uri',
                        variable: 'MONGO_URI'
                    )
                ]) {
                    sh '''
                        docker stop aws-node-demo || true
                        docker rm aws-node-demo || true

                        docker run -d \
                            --name aws-node-demo \
                            -p 5000:5000 \
                            -e MONGO_URI="$MONGO_URI" \
                            aws-node-demo:latest
                    '''
                }
            }
        }
    }
}
