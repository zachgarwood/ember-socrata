/*jshint node:true*/
module.exports = {
  scenarios: [
    {
      name: 'default',
      bower: {
        dependencies: { }
      }
    },
    {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          'ember': 'components/ember#1.13',
          'ember-cli-shims': '0.0.6',
          'ember-data': 'components/ember-data#1.13'
        }
      }
    },
    {
      name: 'ember-lts',
      bower: {
        dependencies: {
          'ember': 'components/ember#2.4'
        }
      },
      npm: {
        devDependencies: {
          'ember-data': '~2.4.0'
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      },
      npm: {
        devDependencies: {
          'ember-data': 'components/ember-data#release'
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      },
      npm: {
        devDependencies: {
          'ember-data': 'components/ember-data#beta'
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      },
      npm: {
        devDependencies: {
          'ember-data': 'components/ember-data#canary'
        }
      }
    }
  ]
};
