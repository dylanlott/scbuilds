// flightplan.js
var plan = require('flightplan');

plan.target('staging', {
  host: '138.68.27.220',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK
});

plan.local(function(local) {
  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  local.transfer(filesToCopy, '~/scbuilds');
});

plan.remote(function(remote) {
  remote.with('cd scbuilds', function() {
    remote.sudo('npm install')
    remote.sudo('npm run build')
    remote.sudo('npm start')
  })
});

plan.remote('check', function(remote) {
  remote.sudo('pm2 ls')
})

plan.local('secrets', function(local) {
  local.log('copying secrets')
  local.transfer('.prod.env', '~/scbuilds')
})
