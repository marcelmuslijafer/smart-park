namespace IOT_virtual.Models.Get;

public class SensorContent
{
    public IEnumerable<SensorReading> ContentNodes { get; set; } = default!;
}
