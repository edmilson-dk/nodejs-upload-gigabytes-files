const Busboy = require("busboy");
const { logger } = require("./util");

class UploadHanlder {
  #io;
  #socketId;

  constructor(id, socketId) {
    this.#io = io;
    this.#socketId = socketId;
  }

  registerEvents(headers, onFinish) {
    const busboy = new  Busboy({headers});

    busboy.on("file", (fieldname, file, filename) => {
      logger.info("file: " + filename);
    });

    busboy.on("finish", onFinish);


    return busboy;
  }
}

module.exports = UploadHanlder;