module.exports = {
  /*
   * Production env is used in the paperelectron/littoral-docker image.
   * And is the default when starting the app with NODE_ENV unset
   */
  production: {
    theme: 'littoral-demo-theme',
    /*
     * Global variables available to every page in your application.
     */
    globals: {
      name: 'Littoral',
      title: 'Littoral Demo Server',
      description: 'A self contained, modular, exhibition server.'
    },
    server: {
      //Warning this MUST be 8080 if you are running the
      // paperelectron/littoral-docker image.
      port: 8080
    }
  },
  /*
   * development env is used when running via "npm start"
   */
  development: {
    theme: 'littoral-demo-theme',
    globals: {
      name: 'Littoral',
      title: 'Littoral Demo Server',
      description: 'A self contained, modular, exhibition server.'
    },
    server: {
      port: 8080
    }
  },
  /*
   * test env is used when running via npm test
   */
  test: {
    theme: 'littoral-demo-theme',
    globals: {
      name: 'Littoral',
      title: 'Littoral Demo Server',
      description: 'A self contained, modular, exhibition server.'
    },
    server: {
      port: 8080
    }
  }
};