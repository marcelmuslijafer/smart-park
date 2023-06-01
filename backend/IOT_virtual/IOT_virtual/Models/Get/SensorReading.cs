namespace IOT_virtual.Models.Get;

public class SensorReading
{
    public SensorSource Source { get; set; } = default!;
    public double Value { get; set; } = default!;
    public string Type { get; set; } = default!;
    public DateTime Time { get; set; } = default!;
}
