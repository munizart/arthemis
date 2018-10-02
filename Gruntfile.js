module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    jsdoc2md: {
      doc: {
        src: ['*.js'],
        dest: 'docs/README.md'
      }
    },
    eslint: {
      target: ['*.js']
    }
  })

  grunt.registerTask('default', [
    'eslint',
    'jsdoc2md'
  ])
}
