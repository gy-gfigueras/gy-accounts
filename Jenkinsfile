pipeline {
  agent any

  environment {
      GITHUB_TOKEN = credentials('GITHUB_TOKEN')
  }
  
  stages {
    stage('Check SCM branch') {
        steps {
            git branch: 'main', url: 'https://github.com/GY-CODING/gy-accounts.git'
        }
    }
    
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Linter') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build Project') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
