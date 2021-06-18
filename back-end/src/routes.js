const url= require("url");

const UploadHanlder = require("./uploadHanlder");
const { pipelineAsync, logger } = require("./util");

class Routes {
  #io;
  constructor(io) {
    this.#io = io;
  }

  async options(request, response) {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST',
    });

    response.end();
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

    const busboyInstance = uploadHandler.registerEvents(
      headers, 
      onFinish(response, headers.origin)
    );

    await pipelineAsync(
      request,
      busboyInstance
    );

    logger.info("Request finished with success!");
  }
}

module.exports = Routes;