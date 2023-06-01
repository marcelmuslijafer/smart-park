using IOT_virtual.Models.Create.SensorBody;
using IOT_virtual.Models.Create.SensorStatus;

namespace IOT_virtual.Models.Create;

public class SensorBody3 : ISensorBody
{
    public ISensorReading Grupa9UltrazvucniSenzor3 { get; set; } = default!;

    private SensorBody3()
    {
        Grupa9UltrazvucniSenzor3 = new InitSensorReading();
    }

    private SensorBody3(int status)
    {
        Grupa9UltrazvucniSenzor3 = new StatusSensorReading(status);
    }

    public static SensorBody3 CreateInitSensorBody3()
    {
        return new SensorBody3();
    }

    public static SensorBody3 CreateStatusSensorBody3(int status)
    {
        return new SensorBody3(status);
    }
}
