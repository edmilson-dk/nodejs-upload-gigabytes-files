const url= require("url");
const UploadHanlder = require("./uploadHanlder");

class Routes {
  #io;

  constructor(io) {
    this.#io = io;
  }

  async post(request, response) {
    const { headers } = request;
    const { query: { socketId }} = url.parse(request.url, true);

    const uploadHandler = new UploadHanlder(this.#io, socketId);

    const onFinish = (response, redirectTo) => () => {
      response.writeHead(303, {
        Connection: 'close',
        Location: `${redirectTo}?msg=File uploaded with success!`,
      });

      response.end();
    }

    uploadHandler.registerEvents(
      headers, 
      onFinish(request, headers.origin)
    )
  }
}

module.exports = Routes;