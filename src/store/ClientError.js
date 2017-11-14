const ClientError=function (response) {
    this.message = response.message
    this.status = response.status
}
ClientError.prototype = new Error()
ClientError.prototype.constructor =  ClientError

export default ClientError