namespace IOT_virtual.Models.Create;

public class SensorHeader
{
    public long Timestamp { get; set; }

    public SensorHeader()
    {
        DateTime unixEpoch = new DateTime(1970, 1, 1);
        DateTime currentTime = DateTime.UtcNow;
        TimeSpan elapsedTime = currentTime.Subtract(unixEpoch);
        long unixTimstamp = (long)elapsedTime.TotalMilliseconds;

        Timestamp = unixTimstamp;
    }
}
