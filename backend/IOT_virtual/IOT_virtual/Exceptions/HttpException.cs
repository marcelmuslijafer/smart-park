namespace IOT_virtual.Exceptions;

public class HttpException : Exception
{
    public HttpException() { }

    public HttpException(string name)
        : base(name)
    {

    }
}
