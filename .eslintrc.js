// .eslintrc.js
module.exports = {
  extends: ['react-app', 'react-app/jest'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  }
};