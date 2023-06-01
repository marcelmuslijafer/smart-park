using IOT_virtual.Util;

namespace IOT_virtual.Models.Create.SensorStatus;

public class InitSensorReading : ISensorReading
{
    public double Grupa9Latitude { get; set; }
    public double Grupa9Longitude { get; set; }
    public double Grupa9ForDisabled { get; set; }

    public InitSensorReading()
    {
        Grupa9Latitude = RandomGenerator.GetPseudoDoubleWithinRange(14, 16);
        Grupa9Longitude = RandomGenerator.GetPseudoDoubleWithinRange(44, 46);
        Grupa9ForDisabled = RandomGenerator.GetRandomIsForDisabled();
    }
}
