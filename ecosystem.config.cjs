module.exports = {
  apps: [
    {
      name: 'personal-blog',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: '3000'
      }
    }
  ]
}
