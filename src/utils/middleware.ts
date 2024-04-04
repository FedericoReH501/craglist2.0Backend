const requestLogger = (
  request: { method: any; path: any; body: any },
  _response: any,
  next: () => void
) => {
  console.log("Request recieved:")
  console.log("Method", request.method)
  console.log("Path", request.path)
  console.log("Body", request.body)
  console.log("--------")
  next()
}

const unknownEndpoint = (_req: any, response: any) => {
  response.status(404).send({ error: "unknown endpoint" })
}

export default { requestLogger, unknownEndpoint }
