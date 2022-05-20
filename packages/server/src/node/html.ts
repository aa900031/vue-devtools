export default /* html */`
<html>
  <head>
    <meta charset="UTF-8">
    <title>Vue Developer Tools</title>
    <style>
      #app,
      #intro {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
        padding: 0;
      }

      #intro {
        z-index: 100000;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        text-align: center;
        font-family: Roboto, sans-serif;
        color: #484848;
      }

      #intro.hidden {
        display: none;
      }

      #intro .logo {
        width: 120px;
      }

      #intro .title {
        margin: 30px 0;
        font-size: 26px;
      }

      #intro .content {
        width: 395px;
        font-size: 18px;
        line-height: 45px;
        text-align: center;
      }

      #intro .content-row {
        display: flex;
        align-items: center;
      }

      #intro .content-row label {
        flex-basis: 35px;
        text-align: right;
      }

      #intro .content-row input {
        flex: 1;
        height: 32px;
        padding: 0 10px;
        margin-left: 10px;
        border: 1px solid #cacaca;
        border-radius: 2px;
        text-align: center;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div id="intro">
      <img src="/vue-logo-128.png" alt="" class="logo">
      <h2 class="title">
        Waiting for connection...
      </h2>
    </div>
    <div id="app">
    </div>
  </body>
  <script>
    window.__VUE_DEVTOOLS_HOST__ = "<%= it.devtoolsHost %>"
    window.__VUE_DEVTOOLS_PORT__ = "<%= it.devtoolsPort %>"
  </script>
  <script src="/client.js"></script>
</html>
`