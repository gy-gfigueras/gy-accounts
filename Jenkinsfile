pipeline {
  agent any

  tools {
    nodejs 'Node 18' // asegúrate de tener esta versión instalada en Jenkins
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
