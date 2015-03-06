module.exports = {
  /*
   * Production enviornment is used in the paperelectron/littoral-docker image.
   *
   */
  production: {
    theme: 'littoral-demo-theme',
    /*
     * Global variables available to every page in your application.
     */
    globals: {
      name: 'Littoral',
      description: 'A self contained, modular, exhibition server.'
    },
    /*
     * You can add anything you like to "mainApp" and "subApp"
     */
    locals: {
      /*
       * These variables will be added to every page inside the "request" variable
       * available to your templates. These are useful for setting things like CSS classes
       * that may be different between the main page and a demos page.
       */
      mainApp: {
      },
      subApp: {
      }
    },
    server: {
      //Warning this MUST be 8080 if you are running the
      // paperelectron/littoral-docker image.
      port: 8080
    }
  },
  development: {
    theme: 'littoral-demo-theme',
    globals: {
      name: 'Littoral',
      description: 'A self contained, modular, exhibition server.'
    },
    locals: {
      mainApp: {
      },
      subApp: {
      }
    },
    server: {
      port: 8080
    }
  },
  test: {
    theme: 'littoral-demo-theme',
    globals: {
      name: 'Littoral',
      description: 'A self contained, modular, exhibition server.'
    },
    locals: {
      mainApp: {
      },
      subApp: {
      }
    },
    server: {
      port: 8080
    }
  }
};