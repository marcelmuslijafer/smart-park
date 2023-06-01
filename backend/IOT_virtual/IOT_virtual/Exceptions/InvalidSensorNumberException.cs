namespace IOT_virtual.Exceptions;

public class InvalidSensorNumberException : Exception
{
    public InvalidSensorNumberException() { }

    public InvalidSensorNumberException(string name)
        : base(name)
    {

    }
}
