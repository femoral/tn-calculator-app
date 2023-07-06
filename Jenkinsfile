def org = 'femoral'
def repo = 'tn-calculator-app'

pipeline {
    agent any

    options { skipDefaultCheckout() }

    stages {
        stage('Build Image & Deploy') {
            steps {
                build   job: '/common-pipelines/deploy-application/pnpm-spa',
                        parameters: [
                            string(name: 'ORGANIZATION', value: "${org}"),
                            string(name: 'REPOSITORY', value: "${repo}"),
                            string(name: 'BRANCH_NAME', value: "${BRANCH_NAME}")
                        ]
            }
        }
    }
}