pipeline {
  agent any

  tools {
    nodejs 'Node 18.19.0' // Usa exactamente el nombre que aparece en Global Tool Configuration
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
